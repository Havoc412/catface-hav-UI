import human from "../store/human";
const humanStore = human();

export function CheckAuth(message) {
  if (humanStore.isAuthenticated) return true;
  // INFO 路由守卫，通过直接跳转的方式；同时控制报错信息。
  uni.navigateTo({
    url: `/pages/Wechat/login?title=${message.title}&description=${message.description}`,
  });
  return false;
}
