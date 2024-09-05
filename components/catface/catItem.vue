<template>
    <view class="flex-center-horizontal self-container" :style="{
        gap: props.gap + 'rpx'
    }">
        <up-image :src=props.infor.url radius="10" width="300rpx" height="300rpx">
            <template #error>
                <up-image src="/static/Qcat.png" width="300rpx" height="300rpx" mode="widthFix"/>
            </template>
        </up-image>
        <view>{{ props.infor.name }}</view>
        <view>{{ props.infor.breed }}</view>
        <view>{{ props.infor.gender }}</view>
        <view v-if="props.detect">{{ props.infor.conf }}%</view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    import api from "../../request/file";
    // store
// DATA
    const props = defineProps({
        infor: {
            type: Object,
            default: {
                name: '小护',
                breed: '机器狗',
                gender: 'NaN',
                url: "/static/dog.jpg",
                conf: 0
            }
        },
        detect: {  // 只有 detect 模式下有 conf 的参数。
            type: Boolean,
            default: false
        },
        gap: {
            type: Number,
            default: 50
        }
    });
    const emits = defineEmits([]);

// FUNC


</script>

<style scoped>
.self-container {
    font-family: Alimama ShuHeiTi;
}

</style>        