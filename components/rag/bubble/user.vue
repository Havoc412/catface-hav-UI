<template>
    <view class="flex-top-horizontal container gap-10">
        <view class="talk-container flex-vertical">
            <text class="wrap">{{ props.text }}</text>
        </view>
        <!--TODO 这里的图片需要从 User Infor 获取。-->
        <up-image src="/static/user.jpg" height="70rpx" width="70rpx" radius="35rpx"/>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "hello，护。"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container {
    justify-content: flex-end;
    padding: 0 10rpx;

}

.talk-container {
    max-width: calc(100% - 80px);

    padding: 10px 12px;
    background-color: #a8ece0;
    border-radius: 15px 5px 15px 15px;

    font-size: 16px;
    font-family: SourceHanSansCN;
    font-weight: 300;
    /* color: #ffffff; */
}

</style>        