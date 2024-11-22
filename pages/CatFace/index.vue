<template>
    <view class="flex-center-vertical contianer bg-img">
        <view class="flex-center-vertical">
            <view class="title">点击下图，上传猫猫图像</view>
            <PlaceHolder height="3"/>
            <h-icon name="com-question" size="22" @click="flag.helper = true"/>
            <PlaceHolder height="25"/>
            <!--info 文件上传-->
            <h-upload 
                @success="load_cat_infor"
                @refresh="refresh"
                @load-file-url="load_file_url"

                @catface-start="catfaceStart"
                @catface-end="catfaceEnd"
            />
            <view class="attention">模型开发优化中，识别结果仅供参考。</view>
            <!-- TAG cat-list -->
            <view class="flex-vertical gap-10" style="padding: 0 20px;">
                <template v-for="(item, id) in catInforList" :index="cat-id">
                    <imgBlock 
                        :id="item.animal.id"
                        :avatar="nginx.catsAvatar(item.animal.avatar)" 
                        :title="item.animal.name" 
                        :content="item.animal.description"
                        :tags="StringToStringArray(item.animal.nick_names)"
                        :animalStatus="item.animal.status"
                        :animalDepartment="item.animal.department"
                        :conf="item.conf"
                    />
                    <!-- <cat-item :infor="item"/> -->
                </template>
                <h-btn 
                    v-show="catInforList.length > 0" 
                    @click="notTheCat"
                    :custom-style="{
                        margin: '10rpx 20rpx',
                        backgroundColor: '#FDE2E4',
                        fontWeight: 'bold'
                    }"
                    >以上不是我遇到的猫猫
                </h-btn>
                <!--tag Other functions-->
                <!-- <view v-if="catInforList.length > 0" class="btn-ai">
                    <func :catInforList="catInforList" @filter_by_poi="filter_by_poi"/>
                </view> -->
            </view>
        </view>
        <!-- Status Wins -->
        <statusWin v-if="flag.status.show" 
            :status="flag.status.type" 
            mode="block" loaddingTextMode="knowledge"
            loaddingImgMode="necklace" loaddingImgSize="40px"
        />
        <view v-if="flag.warning" class="flex-center-vertical">
            <view class="flex-center-horizontal gap-5">
                <h-icon name="tool-info"/>
                <view class="attation">小护提醒！</view>
            </view>
            <up-image :src="nginx.static('/img/info/danger.jpg')" radius="5"/>
        </view>
    </view>
    <!--一些辅助用 悬浮窗-->
    <!-- <notice-win v-if="noticeList.length > 0" :notices="noticeList"/> -->
    <helperWin v-if="flag.helper" @close="flag.helper = false"/>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import { TOAST } from "../../utils/notice";
    import { StringToStringArray } from "../../utils/string";
    import nginx from "../../request/nginx";
    import api from "../../request/animal";
    // com
    import HUpload from "../../components/catface/upload.vue";

    import imgBlock from "../../components/search/img-block.vue";
    import func from "../../components/catface/func.vue";

    import PlaceHolder from "../../components/com/sub-tabbar/placeHolder.vue";

        // Wins
    import noticeWin from "./win/notice.vue";
    import helperWin from "./win/helper.vue";
    import statusWin from "../../components/status-win/statusWin.vue";
    // import
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();

// DATA
    const catInforList = ref([]);
    const faceBreed = ref("");

    // Flag
    const flag = reactive({
        status: {
            show: false,
            type: "loadding"
        },
        warning: true,
        helper: false,
    });

// FUNC
    const load_cat_infor = (list, breed, ntList) => {
        console.info(list, ntList);
        flag.form.breed = breed;
        catInforList.value = list;
        noticeList.value = ntList;

        console.info(catInforList, noticeList);
    }

    const refresh = () => {
        catInforList.value = [];
    }

    const load_file_url = (url) => {
        // TODO 
        // file_url.value = url;
        // console.info("Load temp file now", file_url.value);
    }

    // INFO New With Go

    function catfaceStart() {
        flag.warning = false;
        flag.status.show = true;
    }

    function catfaceEnd(res) {
        flag.status.show = false;

        catInforList.value = res['animals'];
        faceBreed.value = res['face_breed'];
    }

    function notTheCat() {
        // 跳转到 Add Animal
        uni.navigateTo({
            url: "/pages/AddAnimal/index?face_breed=" + faceBreed.value
        })
    }

    // FUNC
    function filterByPOI() {
        // TODO
    }


</script>

<style scoped>
    .contianer {
        /* height: var(--height); */
        min-height: 100vh;
        padding-bottom: 100rpx;
    }

    .title {
        font-family: Alimama ShuHeiTi;
        font-size: 50rpx;
    }

    .attention {
        font-family: Alimama ShuHeiTi;
        color: #ff4c55;

        margin-bottom: 50rpx;
    }

    .Qcat {
        height: 500rpx;
        width: 500rpx;
    }

    .btn-ai {
        position: fixed;
        right: 30rpx;
        bottom: 120rpx;
    }

    .attation {
        font-family: Alimama ShuHeiTi;
        color: #ff4c55;
        font-size: 30px;
    }

</style>        