
<template>
    <view class="container-mf flex-center-horizontal">
        <template v-for="(item, index) in FuncList">
            <SingleBtn :img-path="item.imgPath" :text="item.text" @click="goto(item.page)"/>
        </template>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";

    import SingleBtn from "./sub-mainfunc/singleBtn.vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

    const FuncList = ref([
        {
            imgPath: "/static/cats-head/1.png",
            page: "CatFace",
            text: "猫脸识别"
        },
        {
            imgPath: "/static/cats-head/2.png",
            page: "Rag",
            text: "对话小护"
        },
        {
            imgPath: "/static/cats-head/3.png",
            page: 'Search',
            text: "搜索" // TODO 搜索之后调整到左上方 ？
        },
        {
            imgPath: "/static/cats-head/4.png",
            page: 'Task',
            text: "路过帮忙"
        }
    ])

// FUNC
    function goto(page) {
        const pageUrl = `/pages/${page}/index`;

        if (page == "Rag") {
            talkStore.init();
        }
        
        uni.navigateTo({ url: pageUrl });
    }

</script>

<style scoped>

.container-mf {
    width: 90vw;
    height: 80px;
    
    padding: 5%;
    margin: 15vh 5vw;
    background-color: #fff;
    border-radius: 12px;
}

</style>        