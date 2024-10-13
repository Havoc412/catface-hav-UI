import { get } from "./api";

const api = {
    async getAnimalStar(num, skip) {
        return await get(`animal?attrs=head_img,name&num=${num}&skip=${skip}`, {}, {});
    },

    getAnimalBook(num, skip) {  // TODO 这里的条件更加复杂，还是根据前端情况封装到一起。

    }
}

export default api;