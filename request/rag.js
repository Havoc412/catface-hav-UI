import { post } from "./api";
import { BASE_URL } from "../common/setting";

async function chatCommon(query) {
    try {
        const res = await post("api/rag/common_query/", {}, {
            'query': query
        });
        console.info(res);
        return res.answer;
    } catch(error) {
        console.info(error);
        return "";
    }
}

async function detectHelp(query, cats_id) {
    try {
        const res = await post("api/rag/detect_help/", {}, {
            query: query,
            cats_id: cats_id
        }
        );
        console.info(res);
        return res.answer;
    } catch (error) {
      console.info(error);
      return "";
    }
}

export default {
  query: chatCommon,
  detectCat: detectHelp
};