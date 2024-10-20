<template>
    <view class="flex-center-vertical container-top bg-img">
        <mainfunc/>
        <!--INFO STAR-->
        <view class="block flex-fill">
            <!--不启用的时候，无需渲染-->
            <star v-if="flag.star"/>
        </view>
        <!--fixed 形式的拖动栏-->v
        <postDrag @close="closeDrag" @open="openDrag"/>
    </view>
	<h-tabbar :bottom="state.tabbarBottom"/>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    // com
    import mainfunc from "../../components/home/mainfunc.vue";
    import star from "../../components/home/star.vue";
    import postDrag from "./encounterDrag.vue";
    
    // store
// DATA
    const flag = reactive({
        star: false,
    })
    const state = reactive({
        tabbarBottom: 0
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
    }
    function openDrag() {
        flag.star = false;
        state.tabbarBottom = 0;
    }

</script>

<style scoped>

.container-top {
    height: 100vh;
}

</style>