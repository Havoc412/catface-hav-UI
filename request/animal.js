import { get } from "./api";

const api = {
    async getAnimalStar(num, skip) {
        return await get(`animal?attrs=head_img,name&num=${num}&skip=${skip}`, {}, {});
    },

    async getAnimalBook(num, skip, filters) {  
        // TODO 这里的条件更加复杂，还是根据前端情况封装到一起。
        return await get(`animal?attrs=name,gender,status,sterilization,avatar&num=${num}&skip=${skip}`, {}, {})
        .then((data) => {  // TIP 增加一个状态的返回值，模仿 Go 函数的写法
            return [data, null];
        })
        .catch((error) => {
            console.log("Animal.js", error);
            return [error, true];
        });
    },

    async getAnimalDetail(id) {
        return await get(`animal/${id}`, {}, {});
    }
}

export default api;