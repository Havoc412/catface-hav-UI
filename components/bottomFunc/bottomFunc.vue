<template>
    <view class="flex-center-vertical gap-10 block">
        <view v-if="props.poi" class="flex-center-horizontal gap-5 block" @click="getPoi">
            <h-icon name="map-location_full" :size="CONSTS.ICON_SIZE"/>
            <view>标记地点</view>
            <view class="shrink"></view>
            <h-btn variant="tonal">
                <view v-if="!flag.poi" class="why flex-center-horizontal gap-5">
                    <h-icon name="com-light" size="16"/>
                    标记位置让信息更准确！
                </view>
                <!--TODO 更好的反馈方式-->
                <view class="why" v-else>经度：{{ data.poi.longitude.toFixed(1) }}；纬度：{{ data.poi.latitude.toFixed(1) }}</view>
            </h-btn>
            <h-icon name="arrow-right"/>
        </view>
        <view v-if="props.catface" class="flex-center-horizontal gap-5 block">
            <h-icon name="catface-paw" :size="CONSTS.ICON_SIZE"/>
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

    import { GetPoi } from "../../utils/poi";
    // store
// DATA
    const props = defineProps({
        poi: {
            type: Boolean,
            default: true
        },
        catface: {
            type: Boolean,
            default: false
        }
    });
    const emits = defineEmits(['getPoi']);

    const flag = reactive({
        poi: false,
        catface: false,
    })
    
    const data = reactive({
        poi: {
            longitude: 0,
            latitude: 0
        }
    })

    const CONSTS = {
        ICON_SIZE: 16
    }

// FUNC
    async function getPoi() {
        // TODO 鉴定定位权限
        data.poi = await GetPoi();
        if(data.poi) {
            flag.poi = true;
            emits('getPoi', data.poi);
        } else {
            // TODO 错误处理
        }
    };

</script>

<style scoped>

.why {
    font-size: 12px;
}

</style>        