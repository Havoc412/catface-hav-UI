<template>
    <view class="flex-center-vertical container-top bg-img gap-10">
        <view class="flex-center-horizontal gap-10 block container-input" :style="{
            '--margin-top': state.INPUT_MARGIN_TOP + 'px',
            '--height': state.INPUT_HEIGHT + 'px'
        }" >
            <input class="input" focus confirm-type="search" 
                placeholder="在这里输入查询词句"
                placeholder-style="font-size: 16px"
                :value="state.inputValue"
                @confirm="confirm"
            />
            <h-icon name="tool-search_thin" size="25" @click="confirm"/>
        </view>
        <!--INFO 下层的展示返回的结果-->
        <tabGroup :tab-list="consts.TAB_LIST" mode="light"
            @changeIndex="(index) => { state.TAB_INDEX = index; }"
        />
        <view v-if="data" class="container-results flex-vertical gap-10 block">
            <view v-if="data.animals" class="type-title">毛茸茸</view>
            <template v-for="item in data.animals">
                <imgBlock mode="animal"
                    :id="item.id" :avatar="nginx.catsAvatar(item.avatar)" :title="item.name" :content="item.description"
                    :tagsHighlight="item.nick_names_highlight" :tags="item.nick_names_list"
                    :animalStatus="item.status" :animalDepartment="item.department"
                />
            </template>
            
            <view v-if="data.encounters" class="type-title">路遇</view>
            <template v-for="item in data.encounters">
                <imgBlock
                    mode="encounter"
                    :id="item.id" :avatar="nginx.encounterAvatar(item.avatar)" :title="item.title" :content="item.content"
                    :tagsHighlight="item.tags_highlight" :tags="item.tags"
                    :userAvatar="nginx.humAvatar(item.user_avatar)" :userName="item.user_name"
                />
            </template>

            <view v-if="data.knowledges" class="type-title">科普</view>
            <template v-for="item in data.knowledges">
                <textBlock
                    :dirs="item.dirs"
                    :title="item.title" :content="item.content"
                />
            </template>
        </view>
        <!-- status -->
        <placeHolder v-if="flag.status.show && state.moveUp"/>
        <statusWin v-if="flag.status.show" 
            :status="flag.status.type" 
            mode="block" loaddingTextMode="knowledge"
            loaddingImgMode="necklace" loaddingImgSize="40px"
        />
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

    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import statusWin from "../../components/status-win/statusWin.vue";
    // store
// DATA
    
    const consts = {
        INPUT_MARGIN_TOP_INIT: 200,
        INPUT_MARGIN_TOP_END: 20,
        TAB_LIST: ['全部', '毛茸茸', '路遇', '科普'],
        INPUT_HEIGHT_INIT: 60,
        INPUT_HEIGHT_END: 45
    }

    const state = reactive({
        INPUT_MARGIN_TOP: consts.INPUT_MARGIN_TOP_INIT,
        TAB_INDEX: 0,  // API 根据这个进行调整，
        INPUT_HEIGHT: consts.INPUT_HEIGHT_INIT,
        inputValue: "",  // 借此实现 input 缓存的效果。
        moveUp: false,
    })

    const data = ref(null);

    const flag = reactive({
        status: {
            show: false,
            type: "loadding"
        }
    })

// FUNC
    async function confirm(e) {  
        if (e.detail.value)
            state.inputValue = e.detail.value;      
        if (state.inputValue == "") {
            TOAST("请输入查询内容");
            return;            
        }
        
        data.value = null;
        flag.status.show = true;
        
        setTimeout(async() => {  // TEST  模拟一个延时的效果
            data.value = await api.search(state.inputValue);
            flag.status.show = false;

            if (data.value.animals || data.value.encounters || data.value.knowledges) {
                moveUp();           
            } else {
                moveDown();
                TOAST("小护翻遍了资料库，但没有找到。😿")
            }
        }, 2000)
    }

    // Styles
    function moveUp() {
        state.moveUp = true;
        state.INPUT_MARGIN_TOP = consts.INPUT_MARGIN_TOP_END;
        state.INPUT_HEIGHT = consts.INPUT_HEIGHT_END;    
    }

    function moveDown() {
        state.moveUp = false;
        state.INPUT_MARGIN_TOP = consts.INPUT_MARGIN_TOP_INIT;
        state.INPUT_HEIGHT = consts.INPUT_HEIGHT_INIT;    
    }

</script>

<style scoped>

.container-top {
    min-height: 100vh;  /** 因为有 tabbar 的关系 */

    background-color: #00000009;
}

.container-input {
    margin-top: var(--margin-top);
    
    height: var(--height);
    width: 80%;
    padding: 5px 10px;

    border: 3px solid #000000;
    border-radius: 15px;
    
    transition: margin-top 0.5s, height .5s;
}

.input {
    font-size: 20px;
}

.container-results {
    padding: 0 20px;
}

.type-title {
    font-weight: bold;
}

</style>        