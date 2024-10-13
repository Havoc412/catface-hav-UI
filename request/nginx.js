import { BASE_NGINX_URL } from "../common/setting";

function fetchUrl(fileName, dir='') {
    return `${BASE_NGINX_URL}${dir}/${fileName}`;
}

export default {
  catsHead: (fileName) => fetchUrl(fileName, "catsHead"),
  catsAvatar: (fileName) => fetchUrl(fileName, "catsAvatar"),
  catsPhotos: (anm_id, fileName) => fetchUrl(fileName, `catsPhotos/${anm_id}`),
  static: (fileName) => fetchUrl(fileName),
};