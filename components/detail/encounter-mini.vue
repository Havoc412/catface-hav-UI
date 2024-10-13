<template>
    <view class="flex-center-vertical container-encounter-mini">
        <view class="flex-center-horizontal block">
            <view class="title">近期路遇</view>
            <view class="shrink"/>
            <h-icon name="com-more"/>
        </view>
        <view>
            <!--test-->
            <item/>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import item from "../encounter/item.vue";
    // store
// DATA
    const props = defineProps({
        type: {
            type: String,
            default: "default"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-encounter-mini {
    padding: 0 30rpx;

}

.title {
    font-family: Alimama ShuHeiTi;
    font-size: 24px;
}

</style>        