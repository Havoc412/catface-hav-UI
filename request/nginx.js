import { BASE_NGINX_URL } from "../common/setting";

import human from "../store/human";
const humanStore = human();
function fetchUrl(fileName, dir='') {
  // 去除 fileName 开头的多余斜杠
  const normalizedFileName = fileName.replace(/^\\+/, "").replace(/\\/g, "/");
  return `${BASE_NGINX_URL}${dir}/${normalizedFileName}`;
}

export default {
  catsHead: (fileName) => fetchUrl(fileName, "catsHead"),
  catsAvatar: (fileName) => fetchUrl(fileName, "catsAvatar"),
  catsPhotos: (anm_id, fileName) => fetchUrl(fileName, `catsPhotos/anm_${anm_id}`),
  encounterAvatar: (fileName) => fetchUrl(fileName, "encounterAvatar"),
  encounterPhotos: (user_id, fileName) =>
    fetchUrl(fileName, `encounterPhotos/hum_${user_id}`),
  humAvatar: (fileName) => fetchUrl(fileName, "humAvatar"),

  catsPhotosTemp: (fileName) =>
    fetchUrl(fileName, `catsPhotos/hum_${humanStore.user_id}`),

  static: (fileName) => fetchUrl(fileName),
};