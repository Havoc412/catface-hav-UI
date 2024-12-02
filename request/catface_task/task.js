import { get, post } from "./api";

const api = {
    async getTaskList(num, skip, mode, department) {
        return await get(
          "task",
          {},
          {
            num: num,
            skip: skip,
            mode: mode,
            department: department,
            // TODO 补充更多的参数设定。
          }
        ).then((data) => {
          return [data, null];
        })
        .catch((error) => {
            return [error, true];
        });
    },

};

export default api;