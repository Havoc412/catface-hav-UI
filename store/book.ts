import { defineStore } from "pinia";

export default defineStore("book", {
  state: () => ({
    // TAG School Status
    gender: true,
    school: true,
    sterilization: true,
    // TAG Filter
    
  }),
  getters: {
    getSchoolStatus() {
      return [this.gender, this.school, this.sterilization];
    },
  },
  actions: {
    // TODO 之后增加一个本地保存的效果。
    setSchoolStatus(index: Number) {
      switch (index) {
        case 0:
          this.gender = !this.gender;
          break;
        case 1:
          this.school = !this.school;
          break;
        case 2:
          this.sterilization = !this.sterilization;
          break;
      }
    },
  },
});