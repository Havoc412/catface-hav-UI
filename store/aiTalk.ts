import { defineStore } from "pinia";
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
      {
        type,
        text,
      },
    ],
  };
}

export const aiTalk = defineStore("aiTalkContent", {
  state: () => {
    return {
      topic: "默认对话",
      avatar: "/static/dog.jpg",
      name: "小护",
      history: [
      ],
      loadding: false,
      loaddingClear: false,

      // tag detect_cat
      mode: "default", // || detect_cat || knowledge
      cats_id: [],

      // TEST 封装 CONSTS // UPDATE 有无更好的方式？
      CONSTS: {
        DEFAULT: "default",
        DETECT_CAT: "detect_cat",
        KNOWLEDGE: "knowledge",
      }
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
      }
  },
  actions: {
    async sendUserMsg(text: String) {
      if (this.loadding) return;
      const userMsg = createUserMessage(text);
      this.history.push(userMsg);

      return; // test
      // AI
      const aiMsgTemp = createAiMessage();
      this.history.push(aiMsgTemp);
      this.loaddingClear = false;
      this.loadding = true;

      // API
      let res;
      if(this.mode == 'default')
        res = await api.query(text);
      else
        res = await api.detectCat(text, this.cats_id);
      console.info(res);

      const index = this.history.length - 1;
      console.info(index);
      if (this.loaddingClear) {
        const aiMsg = createAiMessage("text", res);
        this.history[index]["content"].push(aiMsg);
      } else {
        this.history[index]["content"] = [
          {
            type: "text",
            text: res,
          },
        ];
        this.loaddingClear = true;
      }

      // over
      this.loadding = false;
    },
    stopAiTalk() {
      // 中断当前 sse 连接
      if (this.loading) this.loading = false;
    },
    /**
     * @brief 对话初始化入口函数。
     */
    init(mode: String = 'default') {
      this.mode = mode;
      if(this.mode === 'knowledge') {
        this.history = [
          createAiMessage("text", "你好呀，两脚兽，有什么我能效劳的吗？")
        ];
        this.topic = "科普对话";
      } else if (this.mode == 'detect_cat') {
        // TODO 之后把下面这个函数封装到这里
      } else {

      }
    },
    // tag detect help
    detectInit(cats: Cat[]) {
      this.mode = "detect_cats";
      this.history = [
        createAiMessage("text", "补充一些相关信息，能够更好的了解猫猫。")
      ]
      // init
      this.topic = "目标:";
      this.cats_id = [];
      cats.map((item) => {
        this.topic += " " + item.name;
        this.cats_id.push(item.id);
      })
    },
  },
});

