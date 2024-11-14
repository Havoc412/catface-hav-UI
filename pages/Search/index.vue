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
        
        <!-- <statusWin loaddingMode="knowledge"/> -->
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import tabGroup from "../../components/home/tabGroup.vue";
    import statusWin from "../../components/status-win/statusWin.vue";
    // store
// DATA
    const inputValue = ref("");
    
    const consts = {
        INPUT_MARGIN_TOP_INIT: 200,
        INPUT_MARGIN_TOP_END: 20,
        TAB_LIST: ['全部', '毛茸茸', '路遇', '科普'],
    }

    const state = reactive({
        INPUT_MARGIN_TOP: consts.INPUT_MARGIN_TOP_INIT,
        TAB_INDEX: 0,  // API 根据这个进行调整，
    })

// FUNC
    function confirm() {
        state.INPUT_MARGIN_TOP = consts.INPUT_MARGIN_TOP_END;
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

</style>        