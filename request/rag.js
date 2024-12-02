import { post, del } from "./api_normal";

const api = {
    // async query(query) {  // INFO 直接采用 websocket 了。
    //     return await post(
    //         'admin/rag/default_talk',
    //         {},
    //         {
    //             query: query
    //         }
    //     ).then((data) => {
    //         return [data.answer, null];
    //     })
    //     .catch(error => {
    //         return [error, true];
    //     })
    // }

    async release(token) {
        return await del(
            'admin/rag',
            {},
            {
                token: token
            }
        ).then((data) => {
            return [data.answer, null];
        })
        .catch(error => {
            return [error, true];
        })
    }
}

export default api;