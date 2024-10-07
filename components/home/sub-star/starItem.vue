<template>
    <view class="flex-center-vertical">
        <view class="container-img">
            <up-image class="img" height="40rpx" width="40rpx" radius="20rpx"
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
        }
    });
    const emits = defineEmits([]);

// FUNC
    const fetchUrl = computed(() => {
        return api.catsHead(props.url);
    })
    

</script>

<style scoped>

.container-img {
    padding: 1px;
    border-radius: 50%;

    background-color: #fff;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.img {
    background-color: #fff;
    border-radius: 50%;
}

</style>        