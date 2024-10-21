import { Request } from ".";
const request = new Request().http;

import human from "../store/human";
const humanStore = human();

function checkAuth(message="") {
    if (humanStore.isAuthenticated)
        return true;
    // INFO 路由守卫，通过直接跳转的方式；同时控制报错信息。
    uni.redirectTo({ url: '/pages/Wechat/Login' });
    return false;
}

export function get(url, header, data, pass=false, msg="") {
    return request({
        url: url,
        method: "GET",
        header: header,
        data: data
    })
}

export function post(url, header, data, pass=false, msg="") {
    if (pass || !checkAuth()) {
        return null;
    }
    return request({
        url: url,
        method: "POST",
        header: header,
        data: data
    })
}
