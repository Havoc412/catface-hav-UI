import { defineStore } from "pinia";

const CompomentItems = ["性别", "在校状态", "就读学部", "绝育状态"];
const FlexItems = ["三列小图"]
const CompomentFlagDefault = [true, true, true, false];
const FlexFlagDefault = [false];

export default defineStore("book", {
  state: () => ({
    // TAG School Status // INFO singleCat 小组件直接获取
    CompomentItems: CompomentItems,
    gender: CompomentFlagDefault[0],
    school: CompomentFlagDefault[1],
    department: CompomentFlagDefault[2],
    sterilization: CompomentFlagDefault[3],
    // TAG Filter
    // Flex  // INFO 由 Book-index 来从顶层控制。
    FlexItems: FlexItems,
    threeColumn: FlexFlagDefault[0],
  }),
  getters: {
    // INFO 写在这里会直接绑定起来。
    departmentMode() {
      return (this.school && this.department && this.sterilization) ? 'ellipsis' : 'default';
    }
  },
  actions: {
    // TODO 之后增加一个本地保存的效果。
    setSchoolStatus(status: Number[]) {
      // 实现方式就是直接翻转，所以存在可能正好错乱的 bug。
      this.gender = status[0];
      this.school = status[1];
      this.sterilization = status[2];
      this.department = status[3];
    },
    setFlex(status: Number[]) {
      this.threeColumn = status[0];
    },
    getSchoolStatus() {
      return [this.gender, this.school, this.department, this.sterilization];
    },
    getFlex() {
      return [this.threeColumn];
    },
    reset() {
      this.gender = CompomentFlagDefault[0];
      this.school = CompomentFlagDefault[1];
      this.department = CompomentFlagDefault[2];
      this.sterilization = CompomentFlagDefault[3];

      this.threeColumn = FlexFlagDefault[0];
    },
  },
});