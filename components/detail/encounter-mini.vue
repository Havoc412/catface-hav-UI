<template>
    <view class="flex-center-vertical container-encounter-mini gap-10">
        <view class="flex-center-horizontal block">
            <view class="title">近期路遇</view>
            <view class="shrink"/>
            <h-icon name="com-more_deep" @click="gotoEncounterTimeline"/>
        </view>
        <view class="flex-vertical block gap-5">
            <itemOneDay/>
        </view>
    </view>
</template>1

<script setup>
    import { ref } from "vue";

    import itemOneDay from "../encounter/itemOneDay.vue";
    // store
// DATA
    const props = defineProps({
        type: {
            type: String,
            default: "default"
        },
        id: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits([]);

// FUNC
    function gotoEncounterTimeline() {
        uni.navigateTo({
            url: "/pages/Encounter/timeline?id=" + props.id
        })
    }

</script>

<style scoped>

.container-encounter-mini {
    padding: 0 30rpx;
}

.title {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 24px;
}

</style>        