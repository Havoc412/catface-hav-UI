import { get } from "./api";

const api = {
    async randomKnowledges(num) {
        return await get(`admin/knowledge/random?num=${num}`, {}, {}, true);
    }
}

export default api;