import { BASE_URL } from "../common/setting";
import { Request } from ".";
const request = new Request().http;

import { CheckAuth } from "./auth";

// TEST
import { DEBUG } from "../common/setting";

const MESSAGE_DEFAULT = {
  title: "登录后获取更多",
  description: "",
};

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
  if (pass || CheckAuth(msg)) {
    return baseApi(url, header, data, "POST");
  }
}

export function del(url, header, data, pass = DEBUG, msg = MESSAGE_DEFAULT) {
  if (pass || CheckAuth(msg)) {
    return baseApi(url, header, data, "DELETE");
  }
}
