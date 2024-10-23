import { BASE_URL } from "../common/setting";

export class Request {
  http(param) {
    const url = BASE_URL + param.url; // TODO 如果需要访问多台服务器，就需要修改这里
    const method = param.method;
    let header = Object.assign(param.header , { 
      Connection: "keep-alive",
      Host: "localhost:20201",
      // "Access-Control-Allow-Headers":
      //   "Access-Control-Allow-Headers,Authorization,User-Agent, Keep-Alive, Content-Type, X-Requested-With,X-CSRF-Token,AccessToken,Token",
      // "Access-Control-Expose-Headers":
      //   "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    });
    const data = Object.assign(param.data || {});
    // const hideLoading = param.hideLoading || false; // info toast 的显示
    // Run
    if (method == "POST" || method == "DELETE") {
      header = Object.assign(
        {
          "content-type": "multipart/form-data",
        },
        header
      );
    } else {
      // tag GET
      header = Object.assign(
        {
          "content-type": "application/json",
        }, 
        header
      );
    } 
    // console.debug(method, header, data);

    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: method,
        hedaer: header,
        data: data,
        success: (res) => {
          if (res.data.code >= 200 && res.data.code < 300) {
            // mark 一般默认会用200吧，不过也看实际了，
            resolve(res.data.data);
          } else {
            // todo 错误处理
            console.info("Request bug - success:", res);
            reject(
              new Error("Request succeeded but with a non-success status")
            );
          }
        },
        fail: (err) => {
          console.info("Request bug - fail:", err);
          reject(err);
        },
      });
    });
  }
}
