<template>
    <view class="flex-center-vertical" @click="emits('click')">
        <image src="/static/nothing.svg"/>
        <view class="text">这里空无一物...</view>
        <view class="text-re">点击重试</view>
    </view>
</template>

<script setup>
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['click']);

// FUNC

</script>

<style scoped>

.text {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 20px;
}

.text-re {
    opacity: .6;
    font-size: 12px;
}

</style>        