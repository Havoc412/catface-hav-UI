import { post } from "./api_normal";

const api = {
  async weixinLogin(code, user_avatar, user_name) {
    return await post("admin/users/weixinlogin", {}, { code: code, user_avatar: user_avatar, user_name }, true)
        .then(res => {
            return [res, null];
        })
        .catch(err => {
            return [err, true];
        });
  },
};

export default api;