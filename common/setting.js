const DEBUG = true;

let baseUrl, nginxUrl, catfaceTaskUrl, wssUrl;
if (DEBUG) {
  baseUrl = "http://127.0.0.1:20201/";  // 开发环境
  wssUrl = "ws://127.0.0.1:20201/";

  catfaceTaskUrl = "http://127.0.0.1:8009/";

  nginxUrl = "http://127.0.0.1/";
} else {
  // baseUrl = "http://113.44.68.213:20201/";  // 生产环境
  // nginxUrl = "http://113.44.68.213/img/";
  
  baseUrl = "https://vv9710nr2082.vicp.fun/";
  wssUrl = "wss://vv9710nr2082.vicp.fun/";
  nginxUrl = "https://971e02z082.goho.co/";
}

export { 
  baseUrl as BASE_URL,
  wssUrl as WSS_URL,
  nginxUrl as BASE_NGINX_URL, 
  catfaceTaskUrl as CATFACE_TASK_URL,
  DEBUG, 
};

export const VERSION = "0.0.4"