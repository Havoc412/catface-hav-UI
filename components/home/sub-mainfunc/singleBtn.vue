<template>
    <view class="flex-center-vertical" @click="emits('click')">
        <image :src="imgPath" class="img"></image>
        <view class="text">{{ props.text }}</view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        imgPath: {
            type: String,
            default: "/static/cats/head/1.png"
        },
        text: {
            type: String,
            default: "默认文本"
        }
    });
    const emits = defineEmits(['click']);

// FUNC

</script>

<style scoped>

.img {
    height: 100rpx;
    width: 100rpx;
}

.text {
    font-family: Alimama ShuHeiTi;
    font-size: 10px;
}

</style>        