import { defineStore } from "pinia";
// import api from "../request/rag";
import { WSS_URL } from "../common/setting";
import api from "../request/rag";

import { Cat } from "../models/catInfor";

function createUserMessage(text: String) {
  // , images: String[]
  return {
    side: false,
    text: text,
    // images: images,
  };
}

function createAiMessage(type: String = "loading", text: String = "...") {
  return {
    side: true,
    content: [
      // {
      //   type,
      //   text,
      // },
    ],
  };
}

function createAiMessageItem(text: String, type: String = "text") {
  return {
    type,
    text,
  };
}

function createAiDocItem(nodes: any[], type: String = "doc") {
  return {
    type,
    nodes,
  };
}

export const aiTalk = defineStore("aiTalkContent", {
  state: () => {
    return {
      topic: "默认对话",
      avatar: "/static/dog.jpg",
      name: "小护",

      loadding: false,
      token: "",

      history: [],

      mode: "default", // INFO 对话模式  default || detect_cat || knowledge
      // tag detect_cat
      cats_id: [],

      // TEST 封装 CONSTS // UPDATE 有无更好的方式？
      CONSTS: {
        DEFAULT: "default",
        DETECT_CAT: "detect_cat",
        KNOWLEDGE: "knowledge",
      },
    };
  },
  getters: {
    // INFO mode 状态的判断。
    default() {
      return this.mode === this.CONSTS.DEFAULT;
    },
    detect_cat() {
      return this.mode === this.CONSTS.DETECT_CAT;
    },
    knowledge() {
      return this.mode === this.CONSTS.KNOWLEDGE;
    },
    lastIndex() {
      return this.history.length - 1;
    },
  },
  actions: {
    async sendUserMsg(text: String) {
      if (this.loadding) return;
      const userMsg = createUserMessage(text);
      this.history.push(userMsg);

      // AI
      const aiMsgTemp = createAiMessage();
      this.history.push(aiMsgTemp);
      this.loadding = true;

      // INFO v1 http 版本
      // let res: String | undefined;
      // if (this.mode == "default" || this.mode == "knowledge")
      //   res = await api.query(text);
      // else if (this.mode == "detect_cat") {
      //   // res = await api.detectCat(text, this.cats_id);  // TODO
      // } else return;
      // const index = this.history.length - 1;
      // // console.info(index);
      // if (this.loaddingClear) {
      //   const aiMsg = createAiMessage("text", res);
      //   this.history[index]["content"].push(aiMsg);
      // } else {
      //   this.history[index]["content"] = [
      //     {
      //       type: "text",
      //       text: res,
      //     },
      //   ];
      //   this.loaddingClear = true;
      // }
      // // over
      // this.loadding = false;

      // INFO v2 sse 版本
      // const sse = new EventSource(  // TIP 好像只能用 GET 的方式请求参数？ // 不知道有没有 Body 的概念。
      //   BASE_URL + "admin/rag/default_talk?query=" + text
      // );
      // // sse.onmessage = (e) => {
      // //   if (!this.loadding) sse.close();
      // //   this.addAiMessage(e.data);
      // // };
      // sse.addEventListener("chat", (e) => {
      //   if (!this.loadding) sse.close();
      //   this.addAiMessage(e.data);
      // });
      // sse.onerror = (e) => { // 目前都是靠‘error’的方式来退出。
      //   console.debug(e);
      //   sse.close();
      //   this.loadding = false;
      // };

      // INFO v3 websocket 版本; 小程序只能用这个或者 https；
      // 移除之前的监听器
      
      console.debug(WSS_URL);
      const ws = uni.connectSocket({
        url: WSS_URL + "admin/rag/default_talk?query=" + text + "&token=" + this.token,
        complete: () => {},
        fail: error => { console.error(error); }
      });

      ws.onMessage((event) => {
        if (!this.loadding) {
          ws.close();
          return;
        }
        let data;
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          console.error(e)
          return
        }

        console.debug(data); // TEST
        switch (data.type) {
          case "chat":
            this.addAiMessage(data.data);
            break;
          case "doc":
            this.addAiDoc(data.data);
            break;
          case "token":
            console.log("Token received:", data.data);
            this.token = data.data;
            ws.close();
            break;
        }
        // if (data.type === "chat") {
        //   // 处理聊天消息
        //   this.addAiMessage(data.data);
        // } else if (data.type === "token") {
        //   // 处理 token 消息
        //   console.log("Token received:", data.data);
        //   this.token = data.data;
        // }
      });

      ws.onClose(
        function (res) {
          this.loadding = false;
          console.log("WebSocket 已关闭！", this.loadding);
        }.bind(this)
      ); // TIP 通过 bind，使得能够正确修改 loadding 信号。
    },
    addAiMessage(content: String) {
      const index = this.lastIndex;
      this.history[index]["content"].push(createAiMessageItem(content));
    },
    addAiDoc(node: any[]) {
      const index = this.lastIndex;
      this.history[index]["content"].push(createAiDocItem(node));
    },
    stopAiTalk() {
      // 中断当前 sse 连接
      if (this.loadding) this.loadding = false;
    },
    /**
     * @brief 对话初始化入口函数。
     */
    init(mode: String = "default") {
      this.mode = mode;
      if (this.mode === "knowledge") {
        this.history = [
          // createAiMessage("text", "你好呀，两脚兽，有什么我能效劳的吗？"),
        ];
        this.topic = "科普对话";
      } else if (this.mode == "detect_cat") {
        // TODO 之后把下面这个函数封装到这里
      } else {
      }
    },
    // tag detect help
    detectInit(cats: Cat[]) {
      this.mode = "detect_cats";
      this.history = [
        createAiMessage("text", "补充一些相关信息，能够更好的了解猫猫。"),
      ];
      // init
      this.topic = "目标:";
      this.cats_id = [];
      cats.map((item) => {
        this.topic += " " + item.name;
        this.cats_id.push(item.id);
      });
    },
    // 释放资源
    async releaseMessage() {
      console.info("release message", "释放 LLM Client; token:", this.token)
      this.history = [];
      this.topic = "";
      this.loadding = false;
      if (this.token != "") {
        const [res, err] = await api.release(this.token);    
        console.debug(res);
      }
    }
  },
});

