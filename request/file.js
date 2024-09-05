import { get, post } from './api';
import { BASE_URL } from '../common/setting';

import { Cat } from "../models/catInfor";

function fetchStaticFile(filePath) {
    return `${BASE_URL}static/${filePath}`;
}

async function searchSQL() {
    try {
        const res = await get("api/search_sql", {}, {});
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

export default {
    fetchStaticFile: (filePath) => fetchStaticFile(filePath),
    searchSQL: searchSQL,
}
