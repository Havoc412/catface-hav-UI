<template>
    <view class="flex-center-vertical container-top bg-img">
        <mainfunc/>
        <!--INFO STAR-->
        <view style="height: 10vh"/>
        <view class="block flex-fill">
            <star v-show="flag.star"/>
        </view>
        <!--fixed 形式的拖动栏-->
        <!-- <postDrag/> -->
    </view>
	<h-tarbar/>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import mainfunc from "../../components/home/mainfunc.vue";
    import star from "../../components/home/star.vue";
    import postDrag from "./postDrag.vue";
    
    // store
// DATA
    const flag = reactive({
        star: true,
    })

// FUNC

</script>

<style scoped>

.container-top {
    height: 90vh;
}



</style>