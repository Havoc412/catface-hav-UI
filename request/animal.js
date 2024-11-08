import { get, post, del } from "./api";

import human from "../store/human";
const humanStore = human();

const api = {
  // INFO 这两个函数默认【通过：无需鉴权】
  async getAnimalStar(num, skip, pass = true) {
    return await get(
      `admin/animal?attrs=head_img,name&num=${num}&skip=${skip}`,
      {},
      {},
      pass
    )
      .then((data) => {
        return [data.animals, null];
      })
      .catch((error) => {
        return [error, true];
      });
    ;
  },

  async getAnimalBook(num, skip, filters, pass = true) {
    return await get(
      `admin/animal?attrs=name,gender,status,sterilization,avatar,department&gender=${filters.gender}&status=${filters.status}&breed=${filters.breed}&sterilization=${filters.sterilization}&department=${filters.department}&num=${num}&skip=${skip}&user_id=${humanStore.user_id}`,
      {},
      {},
      pass
    )
      .then((data) => {
        // TIP 增加一个状态的返回值，模仿 Go 函数的写法
        return [data.animals, null];  // INFO 不需要使用 key 值。
      })
      .catch((error) => {
        return [error, true];
      });
  },

  async getAnimalSelectAnm(num, skip, filters, key, pass = true) {
    return await get( // 相同的接口，增加了 mode & key 的字段。
      `admin/animal?attrs=name,nick_names,avatar,gender,department&mode=prefer&key=${key}&gender=${filters.gender}&status=${filters.status}&breed=${filters.breed}&sterilization=${filters.sterilization}&department=${filters.department}&num=${num}&skip=${skip}&user_id=${humanStore.user_id}`,
      {},
      {},
      pass
    ).then((data) => {
      return [data, null];  // animals key 字段都有用到，交给调用者处理。
    })
    .catch((error) => {
      return [error, true];
    })
  },

  async getAnimalDetail(id) {
    return await get(`admin/animal/${id}`, {}, {});
  },
  
  /**
   * 喜欢/取消喜欢 两个 API 放到一起。
   * @param {*} animal_id 
   * @param {*} oriStatus 
   * @returns 
   */
  async clickLike(animal_id, oriStatus) {
    if (!oriStatus) {
      return await post(
        `admin/animal/like`,
        {},
        {
          user_id: humanStore.user_id,
          animal_id: animal_id,
        }
      );
    } else {
      return await del(
        `admin/animal/like`,
        {},
        {
          user_id: humanStore.user_id,
          animal_id: animal_id
        }
      )
    }
  },
  
  async addAnimal(data) {
    return await post(
      `admin/animal`,
      {},
      {
        user_id: humanStore.user_id,  // 补充 User_id 的参数。
        ...data,
      }
    )
      .then((data) => {
        // TIP 增加一个状态的返回值，模仿 Go 函数的写法
        return [data, null];
      })
      .catch((error) => {
        console.log("Animal.js", error);
        return [error, true];
      });
  }
};

export default api;