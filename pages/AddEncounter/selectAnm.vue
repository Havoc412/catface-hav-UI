<template>
    <Header ref="headerRef" 
        @filterConditionsChange="filterConditionsChange"
        @name="getDataByName"
        @nameCancel="init"
    />
    <view class="flex-vertical container-top">
        <statusWin v-if="flag.status.show" :status="flag.status.type" @reload="init()"/>
        <view v-else class="flex-center-vertical block">
            <h-tip>挑选至多三位主角毛茸茸吧！</h-tip>
            <view class="container-cats gap-10">
                <template v-for="(item, index) in data.catsListSelected">
                    <littleCat
                        mode="select-un-only"

                        :id="item.animal.id" 
                        :name="item.animal.name"
                        :nickNames="item.animal.nick_names"
                        :gender="item.animal.gender"
                        :schoolStatus="item.animal.schoolStatus" 
                        :sterilizationStatus="item.animal.sterilizationStatus"
                        :department="item.animal.department"
                        :url="item.animal.avatar" 
                        :like="item.like"
                        @unselect="unselect"
                    />
                </template>
                <!--TODO 增加一些状态表示：最近关心、。-->
                <template v-for="(item, index) in data.catsList">
                    <littleCat
                        mode="select-only"

                        :id="item.animal.id" 
                        :name="item.animal.name"
                        :nickNames="item.animal.nick_names"
                        :nickNamesHit="item.nick_name_hit"
                        :gender="item.animal.gender"
                        :schoolStatus="item.animal.schoolStatus" 
                        :sterilizationStatus="item.animal.sterilizationStatus"
                        :department="item.animal.department"
                        :url="item.animal.avatar" 
                        :like="item.like"
                        @select="select"
                    />
                </template>
            </view>
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
    import { ref, reactive, onMounted, computed } from "vue";
	import { onReachBottom } from '@dcloudio/uni-app'

    import api from "../../request/animal";
    import { TOAST } from "../../utils/notice";
    // com
    import littleCat from "../../components/book/littleCat.vue";

    import Header from "./sub-select/header.vue";
    import statusWin from "../../components/status-win/statusWin.vue";
    // store
// DATA
    const consts = {
        NUM_INIT: 4,
        NUM_SINGLE: 4
    }
    const state = {
        skip: 0,
        key: 0,
    }
    
    const data = reactive({
        catsList: [],
        catsListSelected: [], // 选中的目标。
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
        state.key = 0;
        state.skip = 0;

        flag.status.type = "loadding";
        flag.status.show = true;
        data.catsList = await getData(consts.NUM_INIT);
        // TEST *1
        // data.catsList = [...data.catsList, ...data.catsList, ...data.catsList];
    }

    async function getData(num, skip = 0) {
        const filterConditions = headerRef.value.getFilterConditions();
        const [res, err] = await api.getAnimalSelectAnm(num, skip, filterConditions, state.key, true);

        console.debug(res);

        if (err != null) {  // 错误处理
            flag.status.type = "error";
            return [];
        }
        // check more
        if(res.animals.length < num)
            flag.loadmore = 'nomore';

        state.skip += res.animals.length;
        state.key = res.key;
        flag.status.show = false;
        
        return res.animals;
    }

    async function filterConditionsChange() {
        state.key = 0;
        state.skip = 0;

        flag.status.type = "loadding";
        flag.status.show = true;
        data.catsList = await getData(consts.NUM_INIT);
    }

    async function loadmore() {
        console.info("loadmore");
        const res = await getData(consts.NUM_SINGLE, state.skip);
        data.catsList = data.catsList.concat(res);
    }

    async function getDataByName(name) {
        flag.loadmore = 'nomore';

        const [res, err] = await api.getAnimalSelectAnmByName(name);
        if (err != null) {
            flag.loadmore = 'nomore';
            return;
        }
        console.debug(res)
        // 过滤掉 dataSelected 中已存在的 id
        const filteredRes = res.filter(item => !data.catsListSelected.some(selectedItem => selectedItem.animal.id === item.animal.id));

        data.catsList = filteredRes;
    }

    // Life
    onReachBottom(() => {
        if(flag.loadmore == 'nomore')
            return;
        
        flag.loadmore = 'loading';

        loadmore();
    })

    // TAG BTN
    function select(id) {
        if (data.catsListSelected.length >= 3) {
            TOAST("至多选择三位，请挑选你心中的主角。");
            return;
        }
        const index = data.catsListSelected.findIndex(item => item.animal.id == id);
        if(index == -1) {   // 没有选中; 有点多余。
            const animal = data.catsList.find(item => item.animal.id == id);
            data.catsListSelected.push(animal);
            data.catsList.splice(data.catsList.findIndex(item => item.animal.id == id), 1);
        }
    }

    function unselect(id) {
        const index = data.catsListSelected.findIndex(item => item.animal.id == id);
        if(index != -1) {   // 已经选中
            const animal = data.catsListSelected.splice(index, 1)[0];
            data.catsList.unshift(animal);
        }
    }

    // 记录选中者的 ID，方便条件改变时的过滤。
    const selectedAnimalsId = computed(() => {
        return data.catsListSelected.map(item => item.animal.id);
    })

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 2px;
    padding: 5px;
}

</style>        