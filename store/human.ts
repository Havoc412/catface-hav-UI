import { defineStore } from "pinia";

export default defineStore({
  id: "human",
  state: () => ({
    user_id: 0,  // TODO 根据 Login 改变
    user_name: "未登录",
    user_avatar: "/static/Qcat.png"
  }),
  getters: {
    loginStatus() {
      return this.user_id > 0
    }
  },
  actions: {
      setLoginStatus(user_id: number, avatar: string, name: string) {
        this.user_id = user_id;
        this.user_avatar = avatar;
        this.user_name = name;
      }
  }
})