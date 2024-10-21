import { get } from "./api";

const api = {
    // INFO 这两个函数默认【通过】
    async getAnimalStar(num, skip, pass=true) {
        return await get(`admin/animal?attrs=head_img,name&num=${num}&skip=${skip}`, {}, {}, pass);
    },

    async getAnimalBook(num, skip, filters, pass=true) {  
        // TODO 这里的条件更加复杂，还是根据前端情况封装到一起。
        return await get(
          `admin/animal?attrs=name,gender,status,sterilization,avatar&num=${num}&skip=${skip}`,
          {},
          {},
          pass
        )
          .then((data) => {
            // TIP 增加一个状态的返回值，模仿 Go 函数的写法
            return [data, null];
          })
          .catch((error) => {
            console.log("Animal.js", error);
            return [error, true];
          });
    },

    async getAnimalDetail(id) {
        return await get(`admin/animal/${id}`, {}, {});
    }
}

export default api;