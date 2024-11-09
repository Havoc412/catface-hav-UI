<template>
    <view class="flex-center-vertical">
        <view class="container-star-item">
            <up-image class="star-img" height="40rpx" width="40rpx" radius="20rpx"
                :src="fetchUrl" errorIcon="/static/error.png"
            />
        </view>
        <view>{{ props.name }}</view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";

    import api from "../../../request/nginx.js";
    // store
// DATA
    const props = defineProps({
        url: String,
        name: {
            type: String,
            default: "毛茸茸"
        },
        avatar: String,
    });
    const emits = defineEmits([]);

// FUNC
    const fetchUrl = computed(() => {
        // INFO 如果没有 Head_img, 那就先采用 Avatar。
        if (props.url)
            return api.catsHead(props.url);
        else
            return api.catsAvatar(props.avatar);
    })
    

</script>

<style scoped>

.container-star-item {
    padding: 1px;
    border-radius: 50%;

    background-color: #fff;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.star-img {
    background-color: #fff;
    border-radius: 50%;
}

</style>        