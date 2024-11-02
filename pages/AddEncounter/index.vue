<template>
    <view class="flex-vertical container-top">
        <photoGroup mode="add" :imgList="dataShow.photos" @addImage="addImage" @delete="deleteImage" @setFront="setFront"/>
        <view class="block pd-10" style="padding-top: 0;">
            <up-divider dot lineColor="#000"/>

            <up-textarea 
                v-model="data.content" 

                placeholder="在这里记录你的奇遇！"
                :placeholderStyle="JSON.stringify({
                    color: '#888888',
                    fontSize: '18px',
                    fontWeight: 'bold'
                })"
                :customStyle="{
                    fontWeight: 'bold'
                }"
                fontSize="20"
                border="none"
                height="400rpx" 
                focus
            >
            </up-textarea>

            <view class="flex-center-horizontal">
                <h-tag text="#话题" mode="hollow" startSelected/>
                <view class="shrink"/>
                <h-btn variant="text" icon="flex-full" iconSize="24" @click=""/>
            </view>

            <up-divider dot lineColor="#000" marginTD="5"/>
            <!--Title-->
            <up-input
                v-model="data.title"

                placeholder="起一个标题吧。"
                :placeholderStyle="JSON.stringify({
                    color: '#888888',
                    fontWeight: 'bold'
                })"
                border="none"
                :customStyle="{
                    fontWeight: 'bold'
                }"
                fontSize="18"
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
            <up-divider dot lineColor="#000" marginTD="5"/>


            <bottomFunc/>
        </view>

        <view class="container-bottom">
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

.container-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
}

</style>        