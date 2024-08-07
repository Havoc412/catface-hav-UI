<template>
    <view class="flex-vertical container">
        <view style="height: 100%"><!--填充块--></view> 
        <tabber :hidePathFloatWin="true" @keyBoardChange="keyboardMove"/>
    </view>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    // com
    import tabber from "@/components/AiTalk/tabber.vue";
    // import MapSelf from "./subNVues/map.vue"; // bug 设为vue后，内部组件显示异常。
// DATA

let mapComp;
const aitalk = uni.getSubNVueById('aitalk');

// FUNC
onMounted(() => {
    console.info("加载 subNVue");
    // 通过 id 获取 nvue 子窗体  
    const subNVue = uni.getSubNVueById('map')  
    mapComp = subNVue;
    // 打开 nvue 子窗体  
    // subNVue.show('', 0, function(){  
    //     // 打开后进行一些操作...  
    //     //   
    // });
    // 关闭 nvue 子窗体  
    // subNVue.hide('fade-out', 100)
    // aitalk.hide('fade-out', 100);
})

function keyboardMove(detail) {
    console.info(detail.height);
    uni.$emit("keyboard-move", {
        height: detail.height
    })
    aitalk.setStyle({
        "bottom": (50 + detail.height) + 'px'
    })
}


</script>

<style scoped>

.container {
    height: 100%;
}

</style>        