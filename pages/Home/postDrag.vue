<template>
    <view class="drag-area flex-center-vertical shrink z-8" :style="{
        '--top': state.top + 'px'
    }">
        <!--拖动杆-->
        <view @touchstart="handleTouchStart" 
            @touchmove="handleTouchMove" 
            @touchend="handleTouchEnd">
            <h-icon name="func-line" :style="{
                'width': '50px'
            }"/>
        </view>
        <view class="flex-center-vertical">
            <!--TODO 手搓一个 双列瀑布流；关键点就是记录图片的高度-->
            <template v-for="id in 4">
                <view class="flex-horizontal gap-10">
                    <post/>
                    <post/>
                </view>
            </template>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    
    import post from "../../components/home/post.vue";
    // store
    import phoneInfor from "../../store/phoneInfor";
    const phoneInforStore = phoneInfor();   
// DATA
    const props = defineProps({
        
    });
    const emits = defineEmits(['close', 'open']);
    
    const consts = {
        TOP_INIT: 250,
        TOP_MIN: 0,
        THRESHOLD_DOWN: 200,
        THRESHOLD_UP: -70,
        DRAG_HEIGHT: 40
    }
    const state = reactive({
        top: 200,
        touchStartY: 0,
    })

    const flag = reactive({
        close: false
    })

    onMounted(() => {
      flag.close = false;
      state.top = consts.TOP_INIT;
    })
    
// FUNC

    function handleTouchStart(event) {
        state.touchStartY = event.changedTouches[0].pageY;
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
        
        const dif = touchEndY - state.touchStartY;

        console.info(dif);
        
        // UPDATE 这里的逻辑之后再细化一下
        if(flag.close) {
            if(touchEndY < consts.TOP_INIT) {
                state.top = consts.TOP_MIN + phoneInforStore.statusBarHeight;
                flag.close = false;
                emits('open');
            } else if(dif < 0) {
                state.top = consts.TOP_INIT;
                flag.close = false;
                emits('open');
            } else {
                state.top = phoneInforStore.phoneHeight - consts.DRAG_HEIGHT;
            }
        } else {
            if (dif > consts.THRESHOLD_DOWN) {
                state.top = phoneInforStore.phoneHeight - consts.DRAG_HEIGHT;
                flag.close = true;
                emits('close');
            } else if(dif < consts.THRESHOLD_UP) {
                state.top = consts.TOP_MIN + phoneInforStore.statusBarHeight;
            } else {
                state.top = consts.TOP_INIT;
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