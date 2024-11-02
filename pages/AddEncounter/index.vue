<template>
    <view class="flex-center-vertical container-top">
        <photoGroup mode="add" :imgList="dataShow.photos" @addImage="addImage" @delete="deleteImage" @setFront="setFront"/>
        <view class="block pd-10" style="padding-top: 0;">
            <up-divider dot lineColor="#000"/>

            <up-textarea :border="'none'" v-model="data.content" height="400rpx" focus placeholder="在这里记录你的奇遇！">
            </up-textarea>

            <view class="flex-center-horizontal">
                <h-tag text="#话题" mode="hollow" startSelected/>
                <view class="shrink"/>
                <h-btn variant="text" icon="flex-full" iconSize="24" @click=""/>
            </view>

            <up-divider dot lineColor="#000"/>
            <up-input
                placeholder="起一个标题吧。"
                border="none"
                v-model="data.title"
                clearable
                @change=""
            >
                <template #suffix>
                    <h-btn text="AI小结" :customStyle="{
                        'background-color': color['main-deep'],
                        color: '#fff',
                        'font-weight': 'bold',
                    }" @click=""/>
                </template>

            </up-input>
            <up-divider dot lineColor="#000"/>

            <bottomFunc/>
            <bottomSubmit bgColorLeft="#fff"/>
        </view>
    </view>
</template>

<script setup>
    import { reactive } from "vue";

    import color from "@/css/theme/index.module.scss";
    import nginx from "../../request/nginx";
    // com
    import photoGroup from "../../components/add-encounter/photoGroup.vue";
    import bottomFunc from "../../components/bottomFunc/bottomFunc.vue";
    import bottomSubmit from "../../components/bottomFunc/bottomSubmit.vue";
    // store
// DATA

    const data = reactive({
        photos: [],
        content: "",
        title: "",
    })

    const dataShow = reactive({
        photos: [],
    })

// FUNC

    // TAG Image
    function addImage(paths) {
        if(!paths)  return;
        data.photos = data.photos.concat(paths);
        
        // 展示用临时路径。
        const newFullPath = paths.map(path => {
            let fullpath = nginx.encounterPhotos(path)
            console.debug(fullpath);
            return fullpath;
        })
        
        dataShow.photos = dataShow.photos.concat(newFullPath);
        console.debug(dataShow.photos, data.photos);
    }
    function deleteImage(index) {
        data.photos.splice(index, 1)
        dataShow.photos.splice(index, 1);
    }
    function setFront(index) {
        if (index !== -1) {
            const [item] = data.photos.splice(index, 1);
            data.photos.unshift(item);
            dataShow.photos.unshift(dataShow.photos.splice(index, 1)[0]);
        }
    }


</script>

<style scoped>

.container-top {
    width: 100vw;

}

</style>        