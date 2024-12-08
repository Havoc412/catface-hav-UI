import { get, post } from "./api";

import human from "../../store/human";
const humanStore = human();

const api = {
  async getTaskList(num, skip, mode, department, keywords) {
    return await get(
      "task",
      {},
      {
        num: num,
        skip: skip,
        mode: mode,
        department: department,
        keywords: keywords,
        // TODO 补充更多的参数设定。
      }
    )
      .then((data) => {
        return [data, null];
      })
      .catch((error) => {
        return [error, true];
      });
  },

  // TODO 之后移动到 task_entrance 部分中。
  async addTask(data) {
    return await post(
      `task`,
      {},
      {
        user_id: humanStore.user_id, // 补充 User_id 的参数。
        ...data,
      }
    )
      .then((data) => {
        // TIP 增加一个状态的返回值，模仿 Go 函数的写法
        return [data, null];
      })
      .catch((error) => {
        console.log("Task.js", error);
        return [error, true];
      });
  },
};

export default api;