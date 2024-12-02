import { CATFACE_TASK_URL } from "../../common/setting";
import { Request } from "..";
const request = new Request().http;

import { CheckAuth } from "../auth";

// TEST
import { DEBUG } from "../../common/setting";

function baseApi(url, header, data, method = "GET") {
  return request({
    url: CATFACE_TASK_URL + url,
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