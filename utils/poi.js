
export async function GetPoi() {
    console.debug("POI")
    uni.getLocation({
      type: "gcj02",
      // isHighAccuracy: true,
      success: async function (res) {
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);

        const poi = { latitude: res.latitude, longitude: res.longitude };
        return poi;
      },
      fail: function (err) {
        console.error(err);
        return null;
      },
    });
}