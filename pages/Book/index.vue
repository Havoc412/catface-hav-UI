<template>
    <view class="flex-center-vertical">
        <!--FUNC-->
        <toolbar/>
        <view class="container-cats gap-10">
            <template v-for="(item, index) in data.catsList">
                <singleCat
                    :id="item.id"
                    :name="item.name"
                    :gender="item.gender"
                    :schoolStatus="item.status"
                    :sterilizationStatus="item.sterilization"
                    :url="item.avatar"
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
    <h-tabbar/>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
	import { onReachBottom } from '@dcloudio/uni-app'

    import api from "../../request/animal";

    // com
    import toolbar from "./toolbar.vue";
    import singleCat from "../../components/book/singleCat.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    // store

// DATA
    const data = reactive({
        // TODO 通过 API 获取数据
        catsList: [
            // {name: "斜刘海", gender: "female", status: "inschool", sterilization: "sterilized", avatar: "0.jpg"},
            // {name: "小北", gender: "female", status: "graduation", sterilization: "sterilized", avatar: "1.jpg"},
            // {name: "打三", gender: "female", status: "inschool", sterilization: "sterilized", avatar: "2.jpg"},
            // {name: "发发", gender: "female", status: "graduation", sterilization: "sterilized", avatar: "3.jpg"},
            // {name: "猪皮", gender: "male", status: "inschool", sterilization: "sterilized", avatar: "4.jpg"},
            // {name: "软软", gender: "female", status: "inschool", sterilization: "sterilized", avatar: "5.jpg"},
        ]
    })
    
    const flag = reactive({
        loadmore: 'loadmore'
    })

// FUNC
    onMounted(async() => {
        data.catsList = await api.getAnimalBook(10, 0);
    })

    function loadmore() {
        // TODO 这里后续请求 API
        console.info("loadmore");
    }

    onReachBottom(() => {
        console.info("onReachBottom"); // test
        flag.loadmore = 'loading';

        loadmore();

        setTimeout(() => {
            flag.loadmore = 'loadmore';
        }, 1000);
    })

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 5px;
}

</style>        