<template>
    <view class="flex-vertical">
        <relation :human="data.user" :animals="data.animals"/>
        <album :user-id="data.user.id" :list="data.encounter.photos_list"/>
        <view class="flex-vertical container-info gap-10">
            <view class="flex-horizontal">
                <text class="title">{{ data.encounter.title }}</text>
                <view class="shrink"/>
                <chip text="日常"/>
            </view>
            <text>{{ data.encounter.content }}</text>
            <!-- <chipGroup :topicList="chipsList.topicList" :locationList="chipsList.locationList"
            :foodList="chipsList.foodList" /> -->
            <!--tag comment-->
            <comment/>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    import { onLoad } from "@dcloudio/uni-app";

    import api from "../../request/encounter";

    // com
    import relation from "../../components/encounter/relation.vue";
    import album from "../../components/encounter/album.vue";
    import comment from "../../components/encounter/comment.vue";
    import chip from "../../components/com/chip/chip.vue";
    // store
// DATA
    const EncounterID = ref(0);
    const data = ref({
        user: {
            user_avatar: "/static/user.jpg",
            user_name: "小护"
        },
        animals: [
            {avatar: "/static/dog.jpg", name: "猪皮"}
        ],
        encounter: {
            title: "Default",
            content: "balabala",
            photos_list: []
            // ...
        }
    })


// FUNC
    onLoad( async(params) => {
        EncounterID.value = +params.id;
        data.value = await api.getEncounterDetail(EncounterID.value)
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