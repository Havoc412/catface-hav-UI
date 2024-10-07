import { BASE_NGINX_URL } from "../common/setting";

function fetchCatsHead(fileName) {
    return `${BASE_NGINX_URL}catsHead/${fileName}`;
}

function fetchCatsAvatar(fileName) {
    return `${BASE_NGINX_URL}catsAvatar/${fileName}`;
}

export default {
    catsHead: (fileName) => fetchCatsHead(fileName),
    catsAvatar: (fileName) => fetchCatsAvatar(fileName)
}