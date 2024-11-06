<template>
    <Header ref="headerRef" @filterConditionsChange="filterConditionsChange" @add="gotoAddAnimal"/>
    <view class="flex-center-vertical">
        <!--FUNC-->
        <statusWin v-if="flag.status.show" :status="flag.status.type" @reload="init()"/>
        <view v-else class="flex-center-vertical">
            <view class="container-cats gap-10"  :style="{
                '--grid-template-columns': ['repeat(' + (bookStore.threeColumn ? 3 : 2) + ', 1fr)']
            }">
                <template v-for="(item, index) in data.catsList">
                    <littleCat v-if="bookStore.threeColumn" 
                        :id="item.animal.id" 
                        :name="item.animal.name" 
                        :gender="item.animal.gender"
                        :schoolStatus="item.animal.schoolStatus" 
                        :sterilizationStatus="item.animal.sterilizationStatus"
                        :department="item.animal.departmentvv"
                        :url="item.animal.avatar" 
                        :like="item.like"
                        @click="gotoDetial"
                    />
                    <singleCat v-else
                        :id="item.animal.id"
                        :name="item.animal.name"
                        :gender="item.animal.gender"
                        :schoolStatus="item.animal.status"
                        :sterilizationStatus="item.animal.sterilization"
                        :department="item.animal.department"
                        :url="item.animal.avatar"
                        :like="item.like"
                        @click="gotoDetial"
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
            <placeHolder/>
        </view>
    </view>
    <!-- UPDATE 感觉不是很有必要，同时可以放到 tools 内部。 <up-back-top :scroll-top="flag.scrollTop" top="100"/> -->
    <sideTools :status="flag.loadmore" mustStatus="nomore" @add="gotoAddAnimal"/>
    <h-tabbar/>
</template>

<script setup>
    import { ref, reactive, onMounted, watch } from "vue";
	import { onReachBottom } from '@dcloudio/uni-app'

    import api from "../../request/animal";

    // com
    import Header from "./header.vue";
    import littleCat from "../../components/book/littleCat.vue";
    import singleCat from "../../components/book/singleCat.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import sideTools from "../../components/com/side-tools.vue";

    import statusWin from "../../components/status-win/statusWin.vue";
    // store
    import book from "../../store/book";
    const bookStore = book();

// DATA
    const consts = {
        NUM_INIT: 6,
        NUM_SINGLE: 6
    }
    const state = {
        skip: 0,
    }

    const data = reactive({
        catsList: [ // Example
            // {name: "斜刘海", gender: "female", status: "inschool", sterilization: "sterilized", avatar: "0.jpg"},
            // {name: "小北", gender: "female", status: "graduation", sterilization: "sterilized", avatar: "1.jpg"},
            // {name: "打三", gender: "female", status: "inschool", sterilization: "sterilized", avatar: "2.jpg"},
            // {name: "发发", gender: "female", status: "graduation", sterilization: "sterilized", avatar: "3.jpg"},
            // {name: "猪皮", gender: "male", status: "inschool", sterilization: "sterilized", avatar: "4.jpg"},
            // {name: "软软", gender: "female", status: "inschool", sterilization: "sterilized", avatar: "5.jpg"},
        ]
    })
    
    const flag = reactive({
        // TAG Loadmore 组件
        loadmore: 'loadmore',
        status: {
            show: true,
            type: "loadding"
        },
        // TAG 新增毛茸茸组件
        toggleFilter: false,
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

        // setTimeout(() => {
        //     flag.loadmore = 'loadmore';
        // }, 1000);
    })

    // TAG Router
    function gotoDetial(id) {
        console.debug("Anm_id:", id);
        uni.navigateTo({
            url: "/pages/Detail/index?id=" + id
        })
    }

    function gotoAddAnimal() {
        console.debug("gotoAddAnimal");
        uni.navigateTo({
            url: "/pages/AddAnimal/index"
        })
    }

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    padding: 5px;
}

</style>        