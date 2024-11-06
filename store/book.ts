import { defineStore } from "pinia";

const CompomentItems = ["性别", "在校状态", "绝育状态"];
const FlexItems = ["三列小图"]
const CompomentFlagDefault = [true, true, true];
const FlexFlagDefault = [false];

export default defineStore("book", {
  state: () => ({
    // TAG School Status // INFO singleCat 小组件直接获取
    CompomentItems: CompomentItems,
    gender: CompomentFlagDefault[0],
    school: CompomentFlagDefault[1],
    sterilization: CompomentFlagDefault[2],
    // TAG Filter
    // Flex  // INFO 由 Book-index 来从顶层控制。
    FlexItems: FlexItems,
    threeColumn: FlexFlagDefault[0],
  }),
  getters: {
    // INFO 写在这里会直接绑定起来。
  },
  actions: {
    // TODO 之后增加一个本地保存的效果。
    setSchoolStatus(status: Number[]) {
      // 实现方式就是直接翻转，所以存在可能正好错乱的 bug。
      this.gender = status[0];
      this.school = status[1];
      this.sterilization = status[2];
    },
    setFlex(status: Number[]) {
      this.flex = status[0];
    },
    getSchoolStatus() {
      return [this.gender, this.school, this.sterilization];
    },
    getFlex() {
      return [this.threeColumn];
    },
    reset() {
      this.gender = CompomentFlagDefault[0];
      this.school = CompomentFlagDefault[1];
      this.sterilization = CompomentFlagDefault[2];
      this.threeColumn = FlexFlagDefault[0];
    },
  },
});