<template>
    <view class="flex-vertical container-top">
        <photoGroup 
            mode="add" 
            :size="flag.textArea ? consts.PHOTO_SIZE_MIN : consts.PHOTO_SIZE_INIT"
            :imgList="dataShow.photos" 
            @addImage="addImage" 
            @delete="deleteImage" 
            @setFront="setFront"
        />
        <animals/>
        <view class="block pd-10" style="padding-top: 0;">
            <up-divider dot lineColor="#000" marginTD="5"/>

            <view class="flex-vertical gap-10">
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

                    @focus="flag.textArea = true"
                    @blur="finishContent"
                >
                </up-textarea>
                <view class="flex-center-horizontal">
                    <chipGroup 
                        mode="editable"
                        ediMode="text"
                        ediStyleMode="hollow"
                        ediPosMode="prefix"
                        placeholder="话题"
                        :ediFocus="false"
                        styleMode="topic"
                        :maxNum="5"
                        topicMode
                        infoIcon
                        containerWidthPrecent="90"
                        @focus="flag.textArea = true"
                        @blur="flag.textArea = false"
                    >
                        <template #info>
                            话题最多5个，每个话题不超过10字。<br/>
                            双击蓝色话题即可删除。
                        </template>
                    </chipGroup>
                    <!-- <view class="shrink"/> -->
                    <h-btn variant="text" icon="flex-full" iconSize="24" @click=""/>
                </view>
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
            <bottomFunc @getPoi="getPoi"/>
        </view>

        <view class="container-bottom">
            <bottomSubmit 
                bgColorLeft="#fff"
                :submitAbled="submitAbled"
                @submitData="submitData"
            />
        </view>
    </view>
</template>

<script setup>
    import { reactive, computed } from "vue";

    import color from "@/css/theme/index.module.scss";
    import nginx from "../../request/nginx";
    // com
    import photoGroup from "../../components/add-encounter/photoGroup.vue";
    import animals from "./sub-index/animals.vue";
    import bottomFunc from "../../components/bottomFunc/bottomFunc.vue";
    import bottomSubmit from "../../components/bottomFunc/bottomSubmit.vue";
    import chipGroup from "../../components/com/chip/chipGroup.vue";
    // store
// DATA
    const consts = {
        PHOTO_SIZE_INIT: 160,
        PHOTO_SIZE_MIN: 120,
    }

    const data = reactive({
        // user_id 交给 api.js
        animals_id: [],  // TODO 需要一个智能方便的表单 3fr
        photos: [],
        title: "",
        content: "",
        poi: {},
        extra: {
            topics: [],
        }
    })

    const dataShow = reactive({
        photos: [],
    })

    const flag = reactive({
        textArea: false,
        // 提交按钮
        submitAbled: false,
    })

// FUNC
    // TAG Rules
    const submitAbled = computed(() => {
        return data.content !== ''; // TODO animals_id
    })

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

    // TAG Content && Title
    function finishContent() {
        flag.textArea = false;
        if (data.content !== '' && data.title == '') {
            // TODO API 默认自动生成一次？
        }
    }

    // TAG additional functions
    function getPoi(poi) {
        data.poi = poi;  // 接受一个 { latitude: xx, longitude: xx};
    }

    // TAG Submit
    function submitData() {
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