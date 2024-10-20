import { defineStore } from "pinia";

export default defineStore({
  id: "human",
  state: () => ({
    user_id: 1,  // TODO 根据 Login 改变
    user_name: "小护",
    user_avatar: "/static/dog.jpg"
  }),
  actions: {
    
  }
})