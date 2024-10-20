const DEBUG = true;

let baseUrl, nginxUrl;
if (DEBUG) {
  baseUrl = "http://127.0.0.1:20201/";  // 开发环境
  nginxUrl = "http://127.0.0.1/";
} else {
  baseUrl = "http://113.44.68.213:20201/";  // 生产环境
  nginxUrl = "http://113.44.68.213/img/";
}

export { baseUrl as BASE_URL, nginxUrl as BASE_NGINX_URL };
