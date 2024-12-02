import { get, post } from "./api_normal";
import { BASE_URL } from '../common/setting';

import { Cat } from "../models/catInfor";

function fetchStaticFile(filePath) {
    return `${BASE_URL}static/${filePath}`;
}

async function searchSQL() {
    try {
        const res = await get("api/search_sql/", {}, {});
        console.info(res);
        // data pre
        const cat_infor_list = [];
        res.cat_infor_list.map( function(ele) {
            const cat = new Cat(ele);
            cat_infor_list.push(cat)
        })
        
        return cat_infor_list;
    } catch (error) {
        console.info(error);
        return [];
    }
}

async function filter_by_poi(poi, cats_id) {
    try {
        const res = await post("api/filter_by_poi/", {}, {
            poi: poi,
            cats_id: cats_id,
        });
        // ret
        console.info(res);
        return res.cats_id;
    } catch (error) {
        console.error(error);
        return false, cats_id;
    }
}

export default {
    fetchStaticFile: (filePath) => fetchStaticFile(filePath),
    searchSQL: searchSQL,
    filter_by_poi: filter_by_poi,
};
