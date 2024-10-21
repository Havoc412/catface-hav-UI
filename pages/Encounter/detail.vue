<template>
    <view class="flex-vertical">
        <relation :human="data.human" :animals="data.aniamls"/>
        <album/>
        <view class="flex-vertical container-info gap-10">
            <view class="flex-horizontal">
                <text class="title">{{ data.title }}</text>
                <view class="shrink"/>
                <chip text="日常"/>
            </view>
            <text>{{ data.content }}</text>
            <!-- <chipGroup :topicList="chipsList.topicList" :locationList="chipsList.locationList"
            :foodList="chipsList.foodList" /> -->
            <!--tag comment-->
            <comment/>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    import { onLoad } from "@dcloudio/uni-app"

    // com
    import relation from "../../components/encounter/relation.vue";
    import album from "../../components/encounter/album.vue";
    import comment from "../../components/encounter/comment.vue";
    import chip from "../../components/com/chip/chip.vue";
    // store
// DATA
    const data = reactive({
        id: 0,
        human: {
            avatar: "/static/user.jpg",
            name: "小护"
        },
        aniamls: [
            {avatar: "/static/dog.jpg", name: "猪皮"}
        ],
        title: "Default",
        content: "balabala"
    })


// FUNC
    onLoad( async(params) => {
        data.id = params.id;
        // data.value = await api.getAnimalDetail(AnmID.value);
        // console.debug(data.value);
        // fetchImgPath();
    })

</script> 

<style scoped>

.container-info {
    padding: 13px;
}

.title {
    font-size: 18px;
    line-height: 16.5px;
    font-family: Alimama ShuHeiTi;
}

.content {
    font-size: 16px;
    line-height: 19px;
    font-weight: 300;
}

</style>        