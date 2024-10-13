<!--INFO 采用时间线的展示方式-->
<template>
    <view class="container">
        <toolbar/>
        <itemOneDay/>
        <itemOneDay/>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    import { onLoad } from "@dcloudio/uni-app"

    // com
    import toolbar from "./toolbar.vue";
    import itemOneDay from "../../components/encounter/itemOneDay.vue";
    // store
    
// DATA

// FUNC
    onLoad( async(params) => {
        // TODO 根据 id 请求 API
    })

</script>

<style scoped>

.container {
    padding: 0 20rpx;
}

</style>        