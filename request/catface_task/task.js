import { get, post } from "./api";

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
};

export default api;