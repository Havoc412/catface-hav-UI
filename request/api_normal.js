import { BASE_URL } from "../common/setting";
import { Request } from ".";
const request = new Request().http;

import human from "../store/human";
const humanStore = human();

// TEST
import { DEBUG } from "../common/setting";

const MESSAGE_DEFAULT = {
  title: "登录后获取更多",
  description: "",
};

// { title, description }
function checkAuth(message) {
  if (humanStore.isAuthenticated) return true;
  // INFO 路由守卫，通过直接跳转的方式；同时控制报错信息。
  uni.navigateTo({
    url: `/pages/Wechat/login?title=${message.title}&description=${message.description}`,
  });
  return false;
}

function baseApi(url, header, data, method = "GET") {
  return request({
    url: BASE_URL + url,
    method: method,
    header: header,
    data: data,
  });
}

export function get(url, header, data, pass = DEBUG, msg) {
  return baseApi(url, header, data);
}

export function post(url, header, data, pass = DEBUG, msg = MESSAGE_DEFAULT) {
  if (pass || checkAuth(msg)) {
    return baseApi(url, header, data, "POST");
  }
}

export function del(url, header, data, pass = DEBUG, msg = MESSAGE_DEFAULT) {
  if (pass || checkAuth(msg)) {
    return baseApi(url, header, data, "DELETE");
  }
}
