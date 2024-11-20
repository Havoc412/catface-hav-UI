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
        <animals :animalList="dataShow.animalList" @click="gotoSelectAnm"/>
        <view class="block pd-10" style="padding-top: 0;">
            <up-divider dot lineColor="#000" marginTD="5"/>

            <view class="flex-vertical gap-10 relative">
                <!--TODO TextArea 功能键：全屏编辑-->
                <!-- <view class="absolute container-textarea-tools" style="right: 5px; top:5px" :class="{ 'op-5': flag.textArea }">
                    <h-btn variant="text" icon="flex-full" iconSize="20" activeColor="transparent" @click=""/>
                </view> -->
                <up-textarea 
                    v-model="data.content" 
                    placeholder="在这里记录你的路遇！"
                    confirmType="send"
                    :show-confirm-bar="false"
                    :placeholderStyle="JSON.stringify({
                        color: '#888888',
                        fontSize: '18px',
                    })"
                    :customStyle="{
                        fontWeight: 'bold'
                    }"
                    fontSize="20"
                    border="none"
                    height="400rpx" 
                    :maxlength="512"
                    focus

                    @focus="flag.textArea = true"
                    @blur="finishContent"
                >
                </up-textarea>
                <view class="flex-top-horizontal">
                    <view class="shrink">
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
                            containerWidthPrecent="100"
                            @change="(list) => { data.extra.topics = list }"
                        >   
                            <!-- 不适合 wx 的渲染能力，会有明显的延迟；
                                @focus="flag.textArea = true"
                                @blur="flag.textArea = false"
                            -->
                            <template #info>
                                话题最多5个，每个话题不超过10字。<br/>
                                双击蓝色话题即可删除。
                            </template>
                        </chipGroup>
                    </view>
                    <!-- <view class="shrink"/> -->
                    <chipEncounterLevel ref="levelRef" mode="choose"/>
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
                    <btnLoadding 
                        :trigger="flag.titleBtn"
                        text="AI小结"
                        :customStyle="{
                            'background-color': color['main-deep'],
                            color: '#fff',
                            'font-weight': 'bold',
                        }"
                        @click="generateTitle"
                        @cancel="flag.titleBtn = false"
                    />
                    <!-- <h-btn text="AI小结" :customStyle="{
                        'background-color': color['main-deep'],
                        color: '#fff',
                        'font-weight': 'bold',
                    }" @click=""/> -->
                </template>

            </up-input>
            <up-divider dot lineColor="#000" marginTD="5"/>
            <bottomFunc @getPoi="getPoi"/>
        </view>

        <bottomSubmit 
            bgColorLeft="#fff"
            :customStyle="{
                'position': 'fixed',
                'bottom': '25rpx',
                'padding': '0 30rpx'
            }"
            :submitAbled="submitAbled"
            @submitData="submitData"
        />
        <!--状态加载-->
        <statusWin v-if="flag.status.show" :status="flag.status.type" loaddingText="上传中"/>
    </view>
</template>

<script setup>
    import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

    import { TOAST } from "../../utils/notice";
    import color from "@/css/theme/index.module.scss";
    import nginx from "../../request/nginx";

    import api from "../../request/encounter";
    import apiNLP from "../../request/nlp";
    // com
    import photoGroup from "../../components/add-encounter/photoGroup.vue";
    import animals from "./sub-index/animals.vue";
    import bottomFunc from "../../components/bottomFunc/bottomFunc.vue";
    import bottomSubmit from "../../components/bottomFunc/bottomSubmit.vue";
    import chipGroup from "../../components/com/chip/chipGroup.vue";
    import btnLoadding from "../../components/com/button/variant/btn-loadding.vue";
    import statusWin from "../../components/status-win/statusWin.vue";

    import chipEncounterLevel from "../../components/com/chip/variant/chip-encounter-level.vue";
    // store
// DATA
    const consts = {
        PHOTO_SIZE_INIT: 160,
        PHOTO_SIZE_MIN: 120,
    }
    const levelRef = ref(null);

    const data = reactive({
        // user_id 交给 api.js
        animals_id: [],  
        photos: [],
        title: "",
        content: "",
        level: 1,
        poi: {},
        extra: {
            topics: [],
        }
    })

    const dataShow = reactive({
        photos: [],
        animalList: [],
    })

    const flag = reactive({
        textArea: false,
        // 提交按钮
        submitAbled: false,
        titleBtn: false,
        // StatusWin
        status: {
            show: false,
            type: "loadding"
        },
    })

// FUNC
    onMounted(() => {
        uni.$on('selectedAnm', (res) => {
            dataShow.animalList = res;
            data.animals_id = res.map(item => item.animal.id);
        })
    })

    onUnmounted(() => {
        uni.$off('selectedAnm');
    });

    // TAG Rules
    const submitAbled = computed(() => {
        return data.content !== '' && data.animals_id.length > 0; 
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
            generateTitle();
        }
    }

    async function generateTitle() {
        // STAGE Check
        if (data.content.length == 0) {
            flag.titleBtn = false;
            TOAST("请先描述你的路遇。")
            return;
        }
        // Run
        flag.titleBtn = true;
        const title = await apiNLP.getTitle(data.content);
        if(flag.titleBtn)
            data.title = title;
        flag.titleBtn = false;
    }

    // TAG additional functions
    function getPoi(poi) {
        data.poi = poi;  // 接受一个 { latitude: xx, longitude: xx};
    }

    // TAG Submit
    async function submitData() {
        // STAGE prepare data
        data.level = levelRef.value.getLevel(); 
        
        console.debug(data);
        flag.status.type = 'loadding';
        flag.status.show = true;
        const [res, err] = await api.addEncounter(data);
        if (err) {
            flag.status.type = 'err';
            // TODO 错误处理
        } else {
            flag.status.show = false;
            // 然后跳转进详细页。
            uni.redirectTo({
                url: `/pages/Encounter/detail?id=${res.encounter_id}`
            })
        }
    }

    // router
    function gotoSelectAnm() {
        uni.navigateTo({
            url: '/pages/AddEncounter/selectAnm'
        })
    }

</script>

<style scoped>

.container-top {
    width: 100vw;
}

.container-textarea-tools {
    background-color: #ffffff48;
    border-radius: 5px;
    
    transition: opacity 0.5s;
}

</style>        