import { defineStore } from "pinia";

export default defineStore("phoneStore", {
  state: (): {
    statusBarHeight: number;
    phoneWidth: number;
    phoneHeight: number;
  } => {
    return {
      statusBarHeight: 20,
      phoneWidth: 420,
      phoneHeight: 800,
    };
  },
  getters: {
    singlePx() {
      // 用于 rpx ~ px 转换
      return this.phoneWidth / 750;
    }
  },
  actions: {
    setPhoneInfor(phoneInfor) {
      this.statusBarHeight = phoneInfor.statusBarHeight;
      this.phoneWidth = phoneInfor.windowWidth;
      this.phoneHeight = phoneInfor.windowHeight;
    },
    cal_menu_Location: function (id: number, num: number, menuWidth: number) {
      // num 中第 id 个目标。 menuWidth：rpx
      // !!! id: from 1... 因为本项目 0 作为 首页 id。
      let blockWidth = this.phoneWidth / num;
      let blockCenter = (id - 0.5) * blockWidth;
      // console.info(this.phoneWidth, blockWidth, blockCenter, this.singlePx);
      return Math.floor(blockCenter - menuWidth * this.singlePx / 2); // 返回 fixed-left. px
    },
  },
});