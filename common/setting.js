const DEBUG = true;

let baseUrl;
if (DEBUG) {
  baseUrl = "http://127.0.0.1:20201/";  // 开发环境
} else {
  baseUrl = "http://113.44.68.213:20201/";  // 生产环境
}

export { baseUrl as BASE_URL };
export const BASE_NGINX_URL = "http://113.44.68.213/img/";
