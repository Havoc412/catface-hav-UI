import { post } from "./api_normal";

const api = {
    async getTitle(content) {
        return await post(
            'admin/nlp/title',
            {},
            {
                content: content
            }
        ).then((data) => {
            return data.title
        })
    }
}

export default api;