<template>
    <view class="flex-center-vertical gap-10 block">
        <view class="flex-center-horizontal gap-5 block" @click="getPoi">
            <h-icon name="map-location" size="20"/>
            <view>标记地点</view>
            <view class="shrink"></view>
            <h-btn variant="tonal">
                <view v-if="!flag.poi" class="why flex-center-horizontal gap-5">
                    <h-icon name="com-light" size="16"/>
                    标记位置让信息更准确！
                </view>
                <view v-else>经度：xxx；纬度：xxx</view>
            </h-btn>
            <h-icon name="arrow-right"/>
        </view>
        <view class="flex-center-horizontal gap-5 block">
            <h-icon name="catface-paw" size="20"/>
            <view>录入猫脸</view>
            <view class="shrink"></view>
            <h-btn variant="tonal">
                <view v-if="!flag.catface" class="why flex-center-horizontal gap-5">
                    <h-icon name="com-light" size="16"/>
                    录入面部模板启用。
                </view>
                <view v-else>模板评估：xx.xx</view>
            </h-btn>
            <h-icon name="arrow-right"/>
        </view>
    </view>
</template>

<script setup>
    import { reactive } from "vue";

    import { GetPoi } from "../../../utils/poi";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['getPoi']);

    const flag = reactive({
        poi: false,
        catface: false,
    })
    
    const date = reactive({
        // TODO 存储得到的数据，解析后展示在前端。
    })
// FUNC
    function getPoi() {
        // TODO 鉴定权限
        GetPoi();
    };

</script>

<style scoped>

.why {
    font-size: 12px;
}

</style>        