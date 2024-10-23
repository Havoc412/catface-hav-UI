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
        </view>
        <!--核心内容-->
        <slot></slot>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";

    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

    const consts = {
        TOP_INIT: 250,
        TOP_MIN: 5,
        THRESHOLD_DOWN: 200,
        THRESHOLD_UP: -70,
        DRAG_HEIGHT: 40,
    }

    const state = reactive({
        top: 200,
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

</style>        