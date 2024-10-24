<template>
    <view class="drag-area flex-center-vertical shrink z-8" :style="{
        '--top': state.top + 'px',
        '--padding': '0 ' + props.padding
    }"> <!--INFO 主要就是依靠 fixed + top 来实现拖动的效果。-->
        <!--拖动杆-->
        <view
            class="flex-center-both"
            :style="{
                'padding-bottom': flag.close ? '15px' : '0',
                'height': '5vh'
            }"
            @touchstart="handleTouchStart" 
            @touchmove="handleTouchMove" 
            @touchend="handleTouchEnd"
            >
            <image src="/static/icon/func/line.svg" style="width: 100rpx;"/>
        </view>
        <!--核心内容-->
        <scroll-view :scroll-y="true" 
            @scrolltolower="lower" @scrolltoupper="upper"
            class="container-waterfall" :style="{
            '--height': state.dragAreaHeight + 'vh'
        }">
            <slot></slot>
            <placeHolder height="10"/>
        </scroll-view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    
    import placeHolder from "../sub-tabbar/placeHolder.vue";
    // store
    import phoneInfor from "../../../store/phoneInfor";
    const phoneInforStore = phoneInfor();   
// DATA
    const props = defineProps({
        padding: {
            type: String,
            default: "30rpx"
        },
        dragHeight: {  // 收缩到最小状态时，流出的区域高度
            type: Number,
            default: 40
        }
    });
    const emits = defineEmits(['open', 'close']);

    const consts = {
        TOP_INIT: 250,
        TOP_MIN: 5,
        THRESHOLD_DOWN: 200,
        THRESHOLD_UP: -70,
        DRAG_HEIGHT: props.dragHeight,
    }

    const state = reactive({
        top: 200,
        dragAreaHeight: 95
    })
    const vars = {
        touchStartY: 0,
        
    }
    const flag = reactive({
        close: false,
        full: false,  // drag 部分是否完全展开
    })

// FUNC
    onMounted(() => {
        flag.close = false;
        flag.full = false;
        state.top = consts.TOP_INIT;
    })
    
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

    function lower() {
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

    padding: var(--padding);

    transition: top 0.5s ease;
}

.container-waterfall {
    height: var(--height);
}

</style>        