import { BASE_NGINX_URL } from "../common/setting";

import human from "../store/human";
const humanStore = human();
function fetchUrl(fileName, dir='') {
  if (!fileName) return;
  // 去除 fileName 开头的多余斜杠
  const normalizedFileName = fileName.replace(/^\\+/, "").replace(/\\/g, "/");
  return `${BASE_NGINX_URL}${dir}/${normalizedFileName}`;
}

export default {
  catsHead: (fileName) => fetchUrl(fileName, "catsHead"),
  catsAvatar: (fileName) => fetchUrl(fileName, "catsAvatar"),
  catsPhotos: (anm_id, fileName) =>
    fetchUrl(fileName, `catsPhotos/anm_${anm_id}`),
  encounterAvatar: (fileName) => fetchUrl(fileName, "encounterAvatar"),
  encounterPhotos: (
    fileName,
    user_id = humanStore.user_id // INFO 由于会去调用很多其他人的信息，所以需要别人的 id，默认采用自己的。
  ) => fetchUrl(fileName, `encounterPhotos/hum_${user_id}`),
  humAvatar: (fileName) => fetchUrl(fileName, "humAvatar"),

  catsPhotosTemp: (fileName) =>
    fetchUrl(fileName, `catsPhotos/hum_${humanStore.user_id}`),

  static: (fileName) => fetchUrl(fileName),
};