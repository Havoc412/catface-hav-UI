import { get } from "./api"

import human from "../store/human";
const humanStore = human();

const api = {
    async getEncounterList(num, skip, pass) {
        return await get(
          `admin/encounter?num=${num}&skip=${skip}&user_id=${humanStore.user_id}`,
          {},
          {},
          pass
        ).then((data) => {
            return [data, null];
          })
        .catch((error) => {
            console.error("encounter.js", error);
            return [error, true];
          });
    }
}

export default api;