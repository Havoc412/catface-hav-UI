<template>
    <view class="relative">
        <!--todo 长按触发功能提示-->
        <view v-show="flag.show" 
            class="absolute flex-center-both msg-container" 
            :class="props.direction"
            :style="{
                '--set-opacity': opacity,
            }">
            <view class="message no-wrap">
                {{ props.msg }}
            </view>
            <view class="view-rotate"/>
        </view>
        <slot></slot>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    // store
// DATA
// todo 关于 absolute 的 right、top 等等还有不少需要设计。
    const props = defineProps({
        direction: {
            type: String,
            default: 'left'
        },
        msg: {
            type: String,
            default: "默认信息。"
        },
        timeOut: {
            type: Number,
            default: 1500
        }
    });
    const emits = defineEmits([]);

    // flag
    const flag = reactive({
        show: true,
    })
    const opacity = ref(1);
// FUNC
    onMounted(() => {
        setTimeout(() => {
            setTimeout(() => {
                flag.show = false;
            }, 1000);
            opacity.value = 0;
        }, props.timeOut);
    })

</script>

<style scoped>

.msg-container {
    opacity: var(--set-opacity);
    transition: opacity 1s;
}

.message {
    font-family: Alimama ShuHeiTi;
    font-size: 25rpx;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
    background-color: #fff;
    border-radius: 10rpx;
    padding: 5rpx 10rpx;
}

.top {
    top: -50rpx;
    right: 0;
}

.left {
    right: 60rpx;;
}

.view-rotate {
    height: 13rpx;
    width: 13rpx;

    background-color: #fff;
    transform: translateX(-7rpx) rotate(45deg) ; /* 顺时针旋转 45 度 */
}

</style>        