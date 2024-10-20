<template>
    <view class="drag-area flex-center-vertical shrink z-8" :style="{
        '--top': state.top + 'px'
    }"> <!--INFO 主要就是依靠 fixed + top 来实现拖动的效果。-->
        <!--拖动杆-->
        <view :style="{
            'margin-bottom': flag.close ? '15px' : '0'
        }"
            @touchstart="handleTouchStart" 
            @touchmove="handleTouchMove" 
            @touchend="handleTouchEnd"
            >
            <image src="/static/icon/func/line.svg" style="width: 100rpx; height: 40rpx;"/>
            <!--QUESTION wx 中无效，所以直接取出来了。-->
            <!-- <h-icon name="func-line" :style="{
                'width': '100rpx'
            }"/> -->
        </view>
        <view>
            <scroll-view :scroll-y="true" 
                @scrolltolower="lower" @scrolltoupper="upper"
                class="container-waterfall" :style="{
                '--height': state.waterfallHeight + 'vh'
            }">
                <statusWin v-if="flag.status.show" :status="flag.status.type"/>
                <view v-else class="flex-top-horizontal gap-10">
                    <view class="flex-vertical gap-10">
                        <template v-for="(item, index) in data.left" :key="index">
                            <post :url="item.url" :title="item.title" :userAvatar="item.userAvatar" :userName="item.userName" :time="item.time" :like="item.like" :height="item.adoptHeight"/>
                        </template>
                    </view>
                    <view class="flex-vertical gap-10">
                        <template v-for="(item, index) in data.right" :key="index">
                            <post :url="item.url" :title="item.title" :userAvatar="item.userAvatar" :userName="item.userName" :time="item.time" :like="item.like" :height="item.adoptHeight"/>
                        </template>
                    </view>
                </view>
            </scroll-view>
        </view>
        <placeHolder/>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";

    import scssConsts from "@/common/consts.module.scss";
    import { extractIntFromSize } from "@/utils/string";

    import post from "../../components/home/post.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import statusWin from "../../components/status-win/statusWin.vue";
    // store
    import phoneInfor from "../../store/phoneInfor";
    const phoneInforStore = phoneInfor();   

    import api from "../../request/encounter";
// DATA
    const props = defineProps({
        
    });
    const emits = defineEmits(['close', 'open']);
    
    const consts = {
        TOP_INIT: 250,
        TOP_MIN: 5,
        THRESHOLD_DOWN: 200,
        THRESHOLD_UP: -70,
        DRAG_HEIGHT: 40,
        POST: {
            WIDTH: extractIntFromSize(scssConsts['post-width']),  // rpx
            HEIGHT_MIN: 200, // rpx
            HEIGHT_MAX: 450,
        },
        TITLE: {  // 简单的估算，超过 THRESHOLD_LEN 个字符就增加 HEIGHT 的高度。
            THRESHOLD_LEN: 13,
            HEIGHT: 20 // rpx
        }
    }
    const state = reactive({
        top: 200,
        waterfallHeight: 85,
    })
    const vars = {
        touchStartY: 0,
        // # Waterfall
        heightLeft: 0,
        heightRight: 0
    }
    const flag = reactive({
        status: {
            show: true,
            type: "loadding"
        },
        close: false,
        full: false,  // drag 部分是否完全展开
        // twiceClose: false,  // 当下滑两次的时候，就会触发 close
    })
    
    // TEST
    const EXAMPLE = [
        {
            "url": "/catsAvatar/0.jpg",  // 暂时先用一下
            "title": "Title-1",
            "userAvatar": "/static/cats/head/1.png",
            "userName": "小王",
            "time": "22.12.31",
            "like": true,
            "height": 2397,
            "width": 1600
        },{
            "url": "/catsAvatar/5.jpg",
            "title": "Title-4",
            "userAvatar": "/static/cats/head/4.png",
            "userName": "软软!!!",
            "time": "23.1.1",
            "like": false,
            "height": 1080,
            "width": 1440
        },{
            "url": "/catsAvatar/0.jpg",  // 暂时先用一下
            "title": "Title-1",
            "userAvatar": "/static/cats/head/1.png",
            "userName": "小王",
            "time": "22.12.31",
            "like": true,
            "height": 2397,
            "width": 1600
        },
        {
            "url": "/catsAvatar/2.jpg",
            "title": "默认标题默认标题默认标题默认标题默认标题",
            "userAvatar": "/static/cats/head/3.png",
            "userName": "张三",
            "time": "23.3.5",
            "like": true,
            "height": 1600,
            "width": 2133
        },
        {
            "url": "/catsAvatar/1.jpg",
            "title": "Title-2 WHU WHU WHU WHU",
            "userAvatar": "/static/cats/head/2.png",
            "userName": "李华",
            "time": "23.2.14",
            "like": false,
            "height": 1776,
            "width": 1184
        },
        {
            "url": "/catsAvatar/5.jpg",
            "title": "Title-4",
            "userAvatar": "/static/cats/head/4.png",
            "userName": "软软!!!",
            "time": "23.1.1",
            "like": false,
            "height": 1080,
            "width": 1440
        },{
            "url": "/catsAvatar/2.jpg",
            "title": "默认标题默认标题默认标题默认标题默认标题",
            "userAvatar": "/static/cats/head/3.png",
            "userName": "张三",
            "time": "23.3.5",
            "like": false,
            "height": 1600,
            "width": 2133
        },
    ]

    // TAG ## Waterfall
    const data = reactive({
        left: [],
        right: []
    })

    onMounted(() => {
        flag.close = false;
        flag.full = false;
        state.top = consts.TOP_INIT;

        data.left = [];
        data.right = [];

        loadmore(15);
    })
    
// FUNC
    // TAG # Drag Handler
    function handleTouchStart(event) {
        vars.touchStartY = event.changedTouches[0].pageY;
        event.stopPropagation();
        // emits('touchstart');
    }
    function handleTouchMove(event) {
        const touchMoveY = event.changedTouches[0].pageY;
        // ReLoad
        state.top = Math.max(consts.TOP_MIN, touchMoveY);
        event.stopPropagation();
    };
    function handleTouchEnd(event) {
        const touchEndY = event.changedTouches[0].pageY;
        
        const dif = touchEndY - vars.touchStartY;

        console.info(dif);
        
        // UPDATE 这里的逻辑之后再细化一下
        if(flag.close) {
            if(touchEndY < consts.TOP_INIT) {
                state.top = consts.TOP_MIN + phoneInforStore.statusBarHeight;
                flag.full = true;
                flag.close = false;
                emits('open');
            } else if(dif < 0) {
                state.top = consts.TOP_INIT;
                flag.full = false;
                flag.close = false;
                emits('open');
            } else {
                state.top = phoneInforStore.phoneHeight - consts.DRAG_HEIGHT;
            }
        } else {
            if (dif > consts.THRESHOLD_DOWN) {
                state.top = phoneInforStore.phoneHeight - consts.DRAG_HEIGHT;
                flag.full = false;
                flag.close = true;
                emits('close');
            } else if(dif < consts.THRESHOLD_UP) {
                state.top = consts.TOP_MIN + phoneInforStore.statusBarHeight;
                flag.full = true;
            } else {
                state.top = consts.TOP_INIT;
                flag.full = false;
            }
        }
        event.stopPropagation();
    }

    // TAG # Waterfall
    async function loadmore(num, skip = 0) {
        if(flag.status.type == 'nomore')
            return
        
        const [res, err] = await api.getEncounterList(num, skip)
        if (err != null) {
            flag.status.type = 'error';
            return
        }

        if(res.length < num)
            flag.status.type = 'nomore'

        console.debug(res);
        
        res.forEach((item) => {
            // img info
            let height = Math.round(item.height / item.width * consts.POST.WIDTH);
            if (height < consts.POST.MIN_HEIGHT) {
                height = consts.POST.MIN_HEIGHT;
            } else if (height > consts.POST.HEIGHT_MAX) {
                height = consts.POST.HEIGHT_MAX;
            }
            if (item.title.length > consts.TITLE.THRESHOLD_LEN) {
                height += consts.TITLE.HEIGHT;
            }
            // console.debug(item.height, item.width, height)
            item.adoptHeight = height;  // INFO rpx

            // min
            if (vars.heightLeft <= vars.heightRight) {
                data.left.push(item);
                vars.heightLeft += height;
            } else {
                data.right.push(item);
                vars.heightRight += height;
            }
        })

        flag.status.show = false;
    }
    
    function lower() {
        loadmore();
        
        if (!flag.full) {
            state.top = consts.TOP_MIN + phoneInforStore.statusBarHeight;
            flag.full = true;
        }
    }

    function upper() {
        if(flag.full) {
            state.top = consts.TOP_INIT;
            flag.full = false;
        }
        // else {  // UPDATE 这个的触发条件是 变动为 0 的状态，不是特别有用。
        //     if(flag.twiceClose) { // 第二次下滑的时候
        //         state.top = phoneInforStore.phoneHeight - consts.DRAG_HEIGHT;
        //         flag.close = true;
        //         emits('close');
        //     }
        //     flag.twiceClose = !flag.twiceClose;
        // }
    }
    
</script>

<style scoped>

.drag-area {
    position: fixed;
    top: var(--top);
    left: 0;
    
    width: 100vw;
    
    background-color: #fff;
    border-radius: 24px 24px 0 0;

    transition: top 0.5s ease;
}

.container-waterfall {
    height: var(--height);
}

</style>        