import { BASE_NGINX_URL } from "../common/setting";

function fetchCatsHead(fileName) {
    return `${BASE_NGINX_URL}catsHead/${fileName}`;
}

export default {
    catsHead: (fileName) => fetchCatsHead(fileName)
}