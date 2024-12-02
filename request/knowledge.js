import { get } from "./api_normal";

const api = {
    async randomKnowledges(num) {
        return await get(`admin/knowledge/random?num=${num}`, {}, {}, true);
    }
}

export default api;