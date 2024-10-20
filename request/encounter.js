import { get } from "./api"

const api = {
    async getEncounterList(num, skip) {
        return await get(`admin/encounter?num=${num}&skip=${skip}`, {}, {})
          .then((data) => {
            return [data, null];
          })
          .catch((error) => {
            console.error("encounter.js", error);
            return [error, true];
          });
    }
}

export default api;