<template>
    <view class="flex-center-horizontal gap-5">
        <up-image :src="props.userAvatar" height="50rpx" width="50rpx" radius="25rpx"/>
        <view class="name yes-shrink">{{ props.userName }}</view>
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
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.name {
    flex-shrink: 1;
}

</style>        