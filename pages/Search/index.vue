<template>
    <view class="flex-center-vertical container-top bg-img gap-10">
        <view class="flex-center-horizontal gap-10 block container-input" :style="{
            '--margin-top': state.INPUT_MARGIN_TOP + 'px',
        }" >
            <input class="input" focus confirm-type="search" 
                placeholder="在这里输入你想知道的"
                placeholder-style="font-size: 16px"
                @confirm="confirm"
            />
            <h-icon name="tool-search_thin" size="25" @click="confirm"/>
        </view>
        <tabGroup :tab-list="consts.TAB_LIST" mode="light"
            @changeIndex="(index) => { state.TAB_INDEX = index; }"
        />
        
        <view v-if="data" class="container-results flex-vertical gap-10 block">
            <view class="type-title" style="margin-top: 0;">毛茸茸</view>
            <template v-for="item in data.animals">
                <imgBlock mode="animal"
                    :id="item.id" :avatar="nginx.catsAvatar(item.avatar)" :title="item.name" :content="item.description"
                    :tagsHighlight="item.nick_names_highlight" :tags="item.nick_names_list"
                    :animalStatus="item.status" :animalDepartment="item.department"
                />
            </template>
            
            <view class="type-title">路遇</view>
        </view>           
        <!-- <statusWin loaddingMode="knowledge"/> -->
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import api from "../../request/search";
    import { TOAST } from "../../utils/notice";
    import nginx from "../../request/nginx";
    // com
    import tabGroup from "../../components/home/tabGroup.vue";
    
    import imgBlock from "../../components/search/img-block.vue";
    import textBlock from "../../components/search/text-block.vue";

    import statusWin from "../../components/status-win/statusWin.vue";
    // store
// DATA
    
    const consts = {
        INPUT_MARGIN_TOP_INIT: 200,
        INPUT_MARGIN_TOP_END: 20,
        TAB_LIST: ['全部', '毛茸茸', '路遇', '科普'],
    }

    const state = reactive({
        INPUT_MARGIN_TOP: consts.INPUT_MARGIN_TOP_INIT,
        TAB_INDEX: 0,  // API 根据这个进行调整，
    })

    const data = ref(null);

// FUNC
    async function confirm(e) {
        state.INPUT_MARGIN_TOP = consts.INPUT_MARGIN_TOP_END;
        
        const query = e.detail.value;
        if (query == "") {
            TOAST("请输入查询内容");
            return;            
        }
        data.value = await api.search(query);
        console.debug(data.value);
    }

</script>

<style scoped>

.container-top {
    min-height: 100vh;  /** 因为有 tabbar 的关系 */

    background-color: #00000009;
}

.container-input {
    margin-top: var(--margin-top);
    
    height: 60px;
    width: 80%;
    padding: 5px 10px;

    border: 3px solid #000000;
    border-radius: 15px;
    
    transition: margin-top 0.5s;
}

.input {
    font-size: 20px;
}

.container-results {
    padding: 0 20px;
}

.type-title {
    font-weight: bold;
    margin-top: 10px;
}

</style>        