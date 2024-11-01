<template>
    <Header :opacity="state.headerOpacity"/>
    <view class="flex-center-vertical container-top bg-img">
        <mainfunc/>
        <!--INFO STAR-->
        <view class="block flex-fill">
            <!--不启用的时候，无需渲染-->
            <star v-if="flag.star"/>
        </view>
        <!--fixed 形式的拖动栏-->v
        <encounterDrag @close="closeDrag" @mid="openDrag" @full="fullDrag"/>
    </view>
	<h-tabbar :bottom="state.tabbarBottom"/>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    // com
    import Header from "./header.vue";
    import mainfunc from "../../components/home/mainfunc.vue";
    import star from "../../components/home/star.vue";
    import encounterDrag from "./encounterDrag.vue";
    
    // store
// DATA
    const flag = reactive({
        star: false,
        header: true,
    })
    const state = reactive({
        tabbarBottom: 0,
        headerOpacity: 0
    })

    onMounted(() => {
        flag.star = false;  
        // flag.star = true; // TEST
        state.tabbarBottom = 0;
    })

// FUNC
    function closeDrag() {
        flag.star = true;
        state.tabbarBottom = -70;
        state.headerOpacity = 0;
    }
    function openDrag() {
        flag.star = false;
        state.tabbarBottom = 0;
        state.headerOpacity = 0;
    }
    function fullDrag() {
        openDrag();
        state.headerOpacity = 1;
    }

</script>

<style scoped>

.container-top {
    height: 100vh;
}

</style>