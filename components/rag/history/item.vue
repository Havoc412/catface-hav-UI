<template>
    <view class="container-item flex-horizontal">
        <view>{{ props.title }}</view>
        <view class="shrink"></view>
        <view class="flex-bottom-horizontal gap-5">
            <view class="time">{{ props.time }}</view>
            <h-icon :name="starSvg" @click="flag.star = !flag.star"/>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        title: {
            type: String,
            default: "默认对话"
        },
        time: {
            type: String,
            default: "16:20"
        },
        star: Boolean
    });
    const emits = defineEmits([]);

    const flag = reactive({
        star: props.star
    })

// FUNC
    const starSvg = computed(() => {
        return `com-star${flag.star ? "_active" : ""}`
    })

</script>

<style scoped>

.container-item {
    height: 45px;

    padding: 25rpx 40rpx;
    font-weight: bold;
    
    background-color: #fff;
    border-radius: 10px;
}

.time {
    opacity: .6;
    font-size: 14px;
}

</style>        