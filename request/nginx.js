import { BASE_NGINX_URL } from "../common/setting";

function fetchUrl(fileName, dir='') {
    return `${BASE_NGINX_URL}${dir}/${fileName}`;
}

export default {
  catsHead: (fileName) => fetchUrl(fileName, "catsHead"),
  catsAvatar: (fileName) => fetchUrl(fileName, "catsAvatar"),
  static: (fileName) => fetchUrl(fileName),
};