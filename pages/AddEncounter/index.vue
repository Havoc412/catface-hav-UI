<template>
    <view class="flex-center-vertical container-top">
        <photoGroup mode="add" :imgList="dataShow.photos" @addImage="addImage" @delete="deleteImage" @setFront="setFront"/>
        <up-divider :hairline="true" lineColor="#000"/>
        123
    </view>
</template>

<script setup>
    import { reactive } from "vue";

    import nginx from "../../request/nginx";
    // com
    import photoGroup from "../../components/add-encounter/photoGroup.vue";
    // store
// DATA

    const data = reactive({
        photos: [],
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


</style>        