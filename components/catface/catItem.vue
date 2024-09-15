<template>
    <view class="flex-center-horizontal self-container" :style="{
        gap: props.gap + 'rpx'
    }">
        <up-image :src=props.infor.url radius="10" width="300rpx" height="300rpx">
            <template #error>
                <up-image src="/static/Qcat.png" width="300rpx" height="300rpx" mode="widthFix"/>
            </template>
        </up-image>
        <view class="max-width">{{ props.infor.name }}</view>
        <view class="max-width">{{ props.infor.breed }}</view>
        <view class="max-width">{{ props.infor.gender }}</view>
        <view v-if="checkConfExist">{{ props.infor.conf }}%</view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
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
                conf: 0 // info 依靠 checkConfExist 进行检查。
            }
        },
        gap: {
            type: Number,
            default: 50
        }
    });
    const emits = defineEmits([]);

// FUNC
    const checkConfExist = computed(() => {
        return props.infor.conf !== undefined && props.infor.conf !== 0;
    })


</script>

<style scoped>
.self-container {
    font-family: Alimama ShuHeiTi;
}

.max-width {
    max-width: 50rpx;
}

</style>        