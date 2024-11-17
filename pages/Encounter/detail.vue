<template>
    <view class="flex-vertical">
        <relation :human="data.user" :animals="data.animals"/>
        <album :list="fetchFullPhotoUrls"/>
        <view class="flex-vertical container-info gap-10">
            <view class="flex-top-horizontal block">
                <text class="title wrap shrink">{{ data.encounter.title }}</text>
                <chip-encounter-level :level="data.encounter.level"/>
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
    import { ref, reactive, computed } from "vue";
    import { onLoad } from "@dcloudio/uni-app";

    import api from "../../request/encounter";
    import nginx from "../../request/nginx";

    // com
    import relation from "../../components/encounter/relation.vue";
    import album from "../../components/encounter/album.vue";
    import comment from "../../components/encounter/comment.vue";
    import chipEncounterLevel from "../../components/com/chip/variant/chip-encounter-level.vue";
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

    const fetchFullPhotoUrls = computed(() => {
        const fullUrls = data.value['encounter']['photos_list'].map((fileName) => {
            return nginx.encounterPhotos(fileName, data.value['user']['id']);
        })
        return fullUrls;
    })

</script> 

<style scoped>

.container-info {
    padding: 13px;
}

.title {
    font-size: 18px;
    line-height: 20px;
    font-weight: bold;
    font-family: Alimama ShuHeiTi;
}

.content {
    font-size: 16px;
    line-height: 19px;
    font-weight: 300;
}

</style>        