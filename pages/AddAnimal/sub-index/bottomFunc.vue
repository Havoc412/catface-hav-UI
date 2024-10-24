<template>
    <view class="flex-center-vertical gap-10 block">
        <view class="flex-center-horizontal gap-5 block">
            <h-icon name="map-location" size="20"/>
            <view>标记地点</view>
            <view class="shrink"></view>
            <h-icon name="arrow-right"/>
        </view>
        <view class="flex-center-horizontal gap-5 block">
            <h-icon name="catface-paw" size="20"/>
            <view>录入猫脸</view>
            <view class="shrink"></view>
            <h-icon name="arrow-right"/>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['getPoi']);

// FUNC

</script>

<style scoped>

</style>        