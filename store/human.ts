import { defineStore } from "pinia";

interface wxLogin {
  code: string;
  user_id: number;
  token: string;
  updated_at: string;
  permission: number;
}

export default defineStore({
  id: "human",
  state: () => ({
    user_id: 0, // TODO 根据 Login 改变
    user_name: "未登录",
    user_avatar: "/static/Qcat.png",

    token: "",
    loginTime: "",
    permission: 123
  }),
  getters: {
    logined() {
      return this.user_id > 0;
    },
  },
  actions: {
    setLoginStatus(res: wxLogin, avatar: string, name: string) {
      this.user_id = res.user_id;
      this.token = res.token;
      this.loginTime = res.updated_at;
      this.permission = res.permission;
      
      this.user_avatar = avatar;
      this.user_name = name;

      console.debug(this);
    },
  },
});