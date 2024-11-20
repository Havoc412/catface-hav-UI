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

function createAiMessage(text: string = "", type: string = "text") {
  return {
    side: true,
    content: [
      {
        type,
        text,
      },
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

export const AITALK_MODE = {  // UPDATE 这里字段的设定也最好通过 API 和后端保持统一。
  DEFAULT: 'Default', // 配合后端 YML 文件的书写习惯。
  KNOWLEDGE: 'Knowledge',
  DETECT_CAT: 'Detect',
  ANM_DIARY: 'Diary',
}
const TOPIC_TAG = {
  default: "默认对话",
  knowledge: "知识科普",
  detect: "辅助辨别",
  diary: "猫猫日记",
};

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
      // TAG User FOR 【 detect_cat || UNDERSTAND_ANM】
      cats_id: [],
    };
  },
  getters: {
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
        url: this.buildWebsocketUrl(text),
        method: "GET", // TIP 仅 wx 支持。// BUG 实测 wx 换 POST 也还是 GET。
        header: {
          "content-type": "application/json", // 根据后端要求设置 content-type
        },
        complete: () => {},
        fail: (error) => {
          console.error(error);
        },
      });
      
      // STAGE webocket start to Listion data
      ws.onMessage((event) => {
        if (!this.loadding) {
          ws.close();
          return;
        }
        let data;
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          console.error(e);
          return;
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
    /**
     * @brief 动态调整 url 传参。
     * @param query 
     * @returns 
     */
    buildWebsocketUrl(query) {
      let url = WSS_URL + "admin/rag/chat?query=" + query
        + "&token=" + this.token;
      switch (this.mode) {
        case AITALK_MODE.ANM_DIARY:
          url += "&mode=" + this.mode + "&cats_id=" + this.cats_id.join(',');
        break

      }
      return url;
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
    init(mode: string = AITALK_MODE.DEFAULT, data: any = null) {
      console.info(mode, data);
      this.mode = mode;
      this.history = []
      this.loadding = false;
      this.cats_id = [];
      
      this.topic = TOPIC_TAG[mode];
      console.info(this.topic)
      switch (mode) {
      case AITALK_MODE.KNOWLEDGE:
        // TODO
        break;
      case AITALK_MODE.DETECT_CAT:
        // TODO
        break;
      case AITALK_MODE.ANM_DIARY:
        this.cats_id = data.ids;
        const aiMsgTemp = createAiMessage(
          "关于【" + data.name + "】，你有什么想要了解的吗？我可以帮你查阅两脚兽们上传的路遇笔记。🐱"
        );
        this.history.push(aiMsgTemp);
        break;
      default:
        break;
      }
    },
    /**
     * @brief 释放长对话资源
     */
    async releaseMessage() {
      this.history = [];
      this.topic = "";
      this.loadding = false;
      if (this.token != "") {
        console.info("release message", "释放 LLM Client; token:", this.token);
        const [res, err] = await api.release(this.token);
        console.debug(res);
      }
    },
  },
});

