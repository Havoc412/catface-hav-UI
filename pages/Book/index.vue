<template>
    <view class="flex-center-vertical">
        <!--FUNC-->
        <toolbar/>
        <statusWin v-if="flag.status.show" :status="flag.status.type"/>
        <view v-else class="flex-center-vertical">
            <view class="container-cats gap-10">
                <template v-for="(item, index) in data.catsList">
                    <singleCat
                        :id="item.id"
                        :name="item.name"
                        :gender="item.gender"
                        :schoolStatus="item.status"
                        :sterilizationStatus="item.sterilization"
                        :url="item.avatar"
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
            <!--TODO 当没有数据的时候，显示 加号的增加，方便上传-->
            <placeHolder/>
        </view>
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

    import statusWin from "../../components/status-win/statusWin.vue";
    // store

// DATA
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
        loadmore: 'loadmore',
        status: {
            show: true,
            type: "loadding"
        }
    })

// FUNC
    onMounted( async() => {
        data.catsList = await getData(10);
    })

    async function getData(num, skip = 0) {
        const [res, err] = await api.getAnimalBook(num, skip);
        if (err != null) {  // 错误处理
            flag.status.type = "error";
            return
        }
        // check more
        if(res.length < num)
            flag.loadmore = 'nomore';

        flag.status.show = false;
        
        return res;
    }

    function loadmore() {
        // TODO 这里后续请求 API
        console.info("loadmore");
    }

    onReachBottom(() => {
        if(flag.loadmore == 'nomore')
            return;
        
        flag.loadmore = 'loading';

        loadmore();

        setTimeout(() => {
            flag.loadmore = 'loadmore';
        }, 1000);
    })

    function gotoDetial(id) {
        console.debug("Anm_id:", id);
        uni.redirectTo({
            url: "/pages/Detail/index?id=" + id
        })
    }

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 5px;
}

</style>        