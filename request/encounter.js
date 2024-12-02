import { get, post, del } from "./api_normal";

import human from "../store/human";
const humanStore = human();

const api = {
    async getEncounterList(num, skip, modeStr, pass) {  // NEW 新增一个 mode 控制后端获取数据的种类。
      return await get(
        `admin/encounter?num=${num}&skip=${skip}&user_id=${humanStore.user_id}&mode=${modeStr}`,
        {},
        {},
        pass
      )
        .then((data) => {
          return [data, null];
        })
        .catch((error) => {
          return [error, true];
        });
    },
    
    async getEncounterDetail(encounter_id) {  // TODO 同时传递 user_id && encounter_id，根据状态确定变化。
      return await get(`admin/encounter/${encounter_id}`, {}, {})
    },

    async clickLike(encounter_id, oriStatus) {
      if (!oriStatus) {
        return await post(
          `admin/encounter/like`,
          {},
          {
            user_id: humanStore.user_id,
            encounter_id: encounter_id,
          }
        );
      }
      else {
        return await del(
          `admin/encounter/like`,
          {},
          {
            user_id: humanStore.user_id,
            encounter_id: encounter_id
          }
        );
      }
    },

    async addEncounter(data) {
      return await post(
        `admin/encounter`,
        {},
        {
          user_id: humanStore.user_id,
          ...data
        }
      ).then((data) => {
        return [data, null]
      })
      .catch((error) => {
        console.log("encounter.js", error);
        return [error, true];
      });
    },
}

export default api;