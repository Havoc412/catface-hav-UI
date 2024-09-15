<template>
    <view class="flex-vertical gap-5">
        <view class="flex-horizontal top-container">
            <view style="font-size: 35rpx;">{{ props.notice.name }}</view>
            <view class="spacer"></view>
            <view class="flex-horizontal gap-10 time">
                <view>From:{{ props.notice.human }}</view>
                <view>{{ props.notice.time }}</view>
            </view>
        </view>
        <view class="flex-top-left-horizontal gap-10">
            <up-image :src=url radius="10" width="200rpx" height="200rpx">
                <template #error>
                    <up-image src="/static/Qcat.png" width="200rpx" height="200rpx" mode="widthFix"/>
                </template>
            </up-image>
            <view class="content">{{ props.notice.content }}</view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    import api from "../../../request/file";
    // store
// DATA
    const props = defineProps({
        notice: {
            type: Object,
            default: {
                id: 0,
                name: "小护",
                content: "测试通知内容。",
                human: "小护",
                time: "2024-9-15",
                name: "Hu"
            }
        }
    });
    const emits = defineEmits([]);

// FUNC
    const url = computed(() => {
        return api.fetchStaticFile("images/cats/" + props.notice.id + ".jpg")
    })

</script>

<style scoped>

.top-container {
    font-family: Alimama ShuHeiTi;
}

.time {
    font-size: 25rpx;
    color: #333;
}

.content {
    width: calc(100% - 200rpx); /* 确保宽度设置正确，去掉单引号 */
    white-space: pre-wrap; /* 保留空白符并在需要时换行 */
    word-break: break-all; /* 允许在单词内部进行换行 */
    overflow-wrap: break-word; /* 长单词和URL也能正确换行 */
}

</style>        