import { BASE_URL } from "../common/setting";

export class Request {
  http(param) {
    const url = BASE_URL + param.url;
    const method = param.method;
    let header = param.header || {};
    const data = Object.assign(param.data || {});
    // const hideLoading = param.hideLoading || false; // info toast 的显示
    // Run
    if (method == "POST") {
      header = Object.assign(
        {
          "content-type": "application/x-www-from-urlencoded",
        },
        param.hedaer
      );
    } else {
      // tag GET
      header = Object.assign(
        {
          "content-type": "application/json",
        },
        param.header
      );
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: method,
        hedaer: header,
        data: data,
        success: (res) => {
          if (res.data.status == 200) {
            // mark 一般默认会用200吧，不过也看实际了，
            resolve(res.data);
          } else {
            // todo 错误处理
            console.info("request bug - success:", res);
            reject(
              new Error("Request succeeded but with a non-success status")
            );
          }
        },
        fail: (err) => {
          console.info("request bug - fail:", err);
          reject(err);
        },
      });
    });
  }
}

// export { default as file } from "./file";

