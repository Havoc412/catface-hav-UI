<template>
    <Header ref="headerRef" @filterConditionsChange="filterConditionsChange" />
    <view class="flex-vertical container-top">
        <statusWin v-if="flag.status.show" :status="flag.status.type" @reload="init()"/>
        <view v-else class="container-cats gap-10">
            <template v-for="(item, index) in data.catsList">
                <littleCat
                    :id="item.animal.id" 
                    :name="item.animal.name" 
                    :gender="item.animal.gender"
                    :schoolStatus="item.animal.schoolStatus" 
                    :sterilizationStatus="item.animal.sterilizationStatus"
                    :department="item.animal.department"
                    :url="item.animal.avatar" 
                    :like="item.like"
                    @click=""
                />
            </template>
        </view>
        <up-loadmore 
            :status="flag.loadmore"
            loading-text="小护龟速翻阅中..."
            nomore-text="已经没有更多资料啦。"
            color="#777"
            @loadmore="loadmore"
        />
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
	import { onReachBottom } from '@dcloudio/uni-app'

    import api from "../../request/animal";
    // com
    import littleCat from "../../components/book/littleCat.vue";

    import Header from "./sub-select/header.vue";
    import statusWin from "../../components/status-win/statusWin.vue";
    // store
// DATA
    const consts = {
        NUM_INIT: 6,
        NUM_SINGLE: 6
    }
    const state = {
        skip: 0,
    }
    
    const data = reactive({
        catsList: []
    })

    const flag = reactive({
        // TAG Loadmore 组件
        loadmore: 'loadmore',
        status: {
            show: true,
            type: "loadding"
        },
    })

    const headerRef = ref(null);


// FUNC
    onMounted( async() => {
        await init();
    })

    async function init() {
        flag.status.type = "loadding";
        flag.status.show = true;
        data.catsList = await getData(consts.NUM_INIT);
        // TEST *1
        // data.catsList = [...data.catsList, ...data.catsList, ...data.catsList];
    }

    async function getData(num, skip = 0) {
        const filterConditions = headerRef.value.getFilterConditions();
        const [res, err] = await api.getAnimalBook(num, skip, filterConditions, true);
        if (err != null) {  // 错误处理
            flag.status.type = "error";
            return [];
        }
        // check more
        if(res.length < num)
            flag.loadmore = 'nomore';

        state.skip += res.length;
        flag.status.show = false;
        
        return res;
    }

    async function filterConditionsChange() {
        flag.status.type = "loadding";
        flag.status.show = true;
        data.catsList = await getData(consts.NUM_INIT);
    }

    async function loadmore() {
        console.info("loadmore");
        const res = await getData(consts.NUM_SINGLE, state.skip);
        data.catsList = data.catsList.concat(res);
    }

    // Life
    onReachBottom(() => {
        if(flag.loadmore == 'nomore')
            return;
        
        flag.loadmore = 'loading';

        loadmore();
    })

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 5px;
}

</style>        