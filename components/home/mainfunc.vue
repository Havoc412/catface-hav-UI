<template>
    <view class="container-mf flex-center-horizontal">
        <template v-for="(item, index) in FuncList">
            <SingleBtn :img-path="item.imgPath" :text="item.text"/>
        </template>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import SingleBtn from "./sub-mainfunc/singleBtn.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

    const FuncList = ref([
        {
            imgPath: "/static/cats/head/1.png",
            text: "猫脸识别"
        },
        {
            imgPath: "/static/cats/head/2.png",
            text: "对话小护"
        },
        {
            imgPath: "/static/cats/head/3.png",
            text: "待定？"
        },
    ])

// FUNC

</script>

<style scoped>

.container-mf {
    width: 90vw;
    height: 80px;
    
    padding: 5% 10%;
    margin: 15vh 5vw;
    background-color: #fff;
    border-radius: 12px;
}

</style>        