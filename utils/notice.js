
export function notice(title, icon = "none", duration = 2000, success, fail, complete) {
  uni.showToast({
    title: title,
    icon: icon, // 如果要纯文本，不要 icon，将值设为 'none'
    duration: duration, // 持续时间为 2 秒
    success: success, // 成功回调
    fail: fail, // 失败回调
    complete: complete // 完成回调
  });
}