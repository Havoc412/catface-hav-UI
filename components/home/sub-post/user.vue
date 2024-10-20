<template>
    <view class="flex-center-horizontal gap-5">
        <up-image :src="props.userAvatar" 
            :height="props.size + 'rpx'" :width="props.size + 'rpx'" :radius="props.radius + 'rpx'"
        />
        <view class="shrink">{{ props.userName }}</view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        userAvatar: {
            type: String,
            default: "/static/icon.png"
        },
        userName: {
            type: String,
            default: "默认名"
        },
        size: {
            type: Number,
            default: 50
        },
        radius: {
            type: Number,
            default: 25
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        