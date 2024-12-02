import { get } from "./api_normal";

const api = {
    async search(query) {
        return await get(`admin/search?query=${query}`, {}, {});
    }
}
export default api;