<template>
    <view class="flex-center-both topic" :style="{
        '--top': top + 'rpx'
    }">
        {{ props.text }}
    </view>
</template>

<script setup>
    import { ref, watch } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "默认对话"
        },
        animation: Boolean
    });
    const emits = defineEmits([]);

    const top = ref(-60);
// FUNC
    watch(() => props.animation, animation);

    function animation() {
        top.value = 30;
        setTimeout(() => {
            top.value = -60;
        }, 2000);
    }

</script>

<style scoped>

.topic {
    position: fixed;
    top: var(--top);
    left: 0;
    right: 0;

    font-family: Alimama ShuHeiTi;

    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .5);
    border-radius: 100rpx;
    
    margin: 0 250rpx;
    padding: 5rpx 15rpx;

    transition: top .5s ease;
}

</style>        