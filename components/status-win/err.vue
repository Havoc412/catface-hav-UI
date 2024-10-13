<template>
    <view class="flex-center-vertical">
        <image src="/static/error.svg"/>
        <view class="text">出错了...</view>
        <view class="text-re">点击重试</view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.text {
    font-family: Alimama ShuHeiTi;
    font-size: 20px;
}

.text-re {
    opacity: .6;
}

</style>        