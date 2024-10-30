export function GetPoi(timeout = 1000) {
  console.debug("POI");

  // 创建一个超时的 Promise
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // TEST 这里先用一个 Timeout 来模拟；之后也记得改 timeout 参数。
      const testPoi = { latitude: 39.9042, longitude: 116.4074 }; // 北京市的经纬度
      resolve(testPoi);
      // reject(new Error("获取位置超时"));
    }, timeout);
  });

  // 创建获取位置的 Promise
  const locationPromise = new Promise((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
      // isHighAccuracy: true,
      success: function (res) {
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);

        const poi = { latitude: res.latitude, longitude: res.longitude };
        resolve(poi);
      },
      fail: function (err) {
        console.error("获取位置失败，使用测试值：", err);
        reject(err);
      },
    });
  });

  // 使用 Promise.race 等待第一个完成的 Promise
  return Promise.race([locationPromise, timeoutPromise]);
}