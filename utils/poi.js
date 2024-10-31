/**
 * @brief 鉴权模块
 * @from https://blog.csdn.net/mossbaoo/article/details/116240044
 */
function checkOpenGPSService() {
  let flag = true;

	let systemType = uni.getSystemInfoSync().platform;
  console.debug(systemType);
	// 安卓
	if (systemType === 'android') {
		var context = plus.android.importClass('android.content.Context');
		var locationManager = plus.android.importClass('android.location.LocationManager');
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);

		if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
      flag = false;
			uni.showModal({
				title: '提示',
				content: '请打开定位服务功能',
				showCancel: false,
				success() {
					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
						var Intent = plus.android.importClass('android.content.Intent');
						var Settings = plus.android.importClass('android.provider.Settings');
						var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
						main.startActivity(intent); // 打开系统设置定位服务功能页面
					} else {
						console.log('定位服务功能已开启');
					}
				}
			});
		}
	}
  // TODO 其他模式都先直接跳过了。
  return flag;
}
 

export function GetPoi(timeout = 1000) {
  console.debug("POI");
  // if (!checkOpenGPSService())
      // return;

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