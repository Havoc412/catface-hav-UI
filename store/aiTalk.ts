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
        createAiMessage("text", "你好呀，两脚兽，有什么我能效劳的吗？"),
      ],
      loadding: false,
      loaddingClear: false,

      // tag detect_cat
      mode: "default", // || detect_cat
      cats_id: [],
    };
  },
  actions: {
    async sendUserMsg(text: String) {
      if (this.loadding) return;
      const userMsg = createUserMessage(text);
      this.history.push(userMsg);
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

