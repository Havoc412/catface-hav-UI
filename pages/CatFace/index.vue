<template>
    <snackbar class="top" v-model="email.snackbar_switch" 
        :message="email.snackbar_message" :color="email.kind_flag"
        :timeout="email.time_flag ? 15000 : 2000 ">
    </snackbar>
    <view class="flex-center-vertical contianer bg-img mt-10">
        <view class="flex-center-vertical">
            <view class="title">点击下图，上传猫猫图像</view>
            <PlaceHolder height="3"/>
            <h-icon name="com-question" size="22" @click="flag.helper = true"/>
            <PlaceHolder height="25"/>
            <!--info 文件上传-->
            <h-upload 
                :open-form="flag.form.show"
                @email="send_email"
                @open-form="open_form"
                @success="load_cat_infor"
                @refresh="refresh"
                @load-file-url="load_file_url"
            />
            <view class="attention">模型开发优化中，识别结果仅供参考。</view>
            
            <!-- TAG cat-list -->
            <view class="flex-vertical gap-10">
                <template v-for="(item, id) in catInforList" :index="cat-id">
                    <cat-item :infor="item"/>
                </template>
                <h-btn 
                    v-show="catInforList.length > 0" 
                    style="font-family: Alimama ShuHeiTi; margin: 10rpx 20rpx;"
                    @click="detect_error"
                    :custom-style="{
                        backgroundColor: '#FDE2E4'
                    }"
                    >不是目标猫猫！
                </h-btn>
                <!--tag Other functions-->
                <view v-if="catInforList.length > 0" class="btn-ai">
                    <func :catInforList="catInforList" @filter_by_poi="filter_by_poi"/>
                </view>
            </view>

            <!-- TAG form -->
            <cat-form 
                v-if="flag.form.show" 
                :breedFromModel="flag.form.breed" 
                :detect-error="flag.form.detect_error"
                @submit="submit"
            />
        </view>
        <view class="flex-center-vertical">
            <view class="flex-center-horizontal gap-5">
                <h-icon name="tool-info"/>
                <view class="attation">小护提醒！</view>
            </view>
            <up-image :src="nginx.static('/img/info/danger.jpg')" radius="5"/>
        </view>
    </view>
    <!--一些辅助用 悬浮窗-->
    <notice-win v-if="noticeList.length > 0" :notices="noticeList"/>
    <helperWin v-if="flag.helper" @close="flag.helper = false"/>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import { CAT_FACE_URL } from "../../common/setting";

    import nginx from "../../request/nginx";
    // com
    import catItem from "../../components/catface/catItem.vue";
    import catForm from "../../components/catface/form.vue";

    import HUpload from "../../components/com/upload.vue";
    import func from "../../components/catface/func.vue";

    import snackbar from "../../components/com/snackbar.vue";

    import PlaceHolder from "../../components/com/sub-tabbar/placeHolder.vue";

        // Wins
    import noticeWin from "./win/notice.vue";
    import helperWin from "./win/helper.vue";
    // store
    import emialStore from "../../store/snackbar";
    const email = emialStore();

    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();

// DATA
    const catInforList = ref([]);
    const noticeList = ref([]);
    const file_url = ref([]);

    // Flag
    const flag = reactive({
        form: {
            show: false,
            detect_error: false,
            breed: "",
        },
        helper: false
    })

// FUNC
    const send_email = (type, msg) => {
        email.sendEmail(type, msg);
        refresh();
    }

    const open_form = (breed) => {
        flag.form.breed = breed;
        flag.form.show = true;
    }

    const load_cat_infor = (list, breed, ntList) => {
        console.info(list, ntList);
        flag.form.breed = breed;
        catInforList.value = list;
        noticeList.value = ntList;

        console.info(catInforList, noticeList);
    }

    const detect_error = () => {
        refresh();
        flag.form.detect_error = true;
        flag.form.show = true;
    }

    const refresh = () => {
        catInforList.value = [];
        flag.form.detect_error = false;
        flag.form.show = false;
    }

    const load_file_url = (url) => {
        file_url.value = url;
        console.info("Load temp file now", file_url.value);
    }

    // INFO 核心访问 API 的任务。
    const submit = (catInfor) => {
        if(file_url.value == "") {
            email.sendEmail(false, "未选中文件。");
            return;
        }
        uni.uploadFile({
            url: CAT_FACE_URL + 'api/cnn/add_cat/',
            filePath: file_url.value,
            name: 'file',
            formData: {
                name: catInfor.name,
                gender: catInfor.gender,
                breed: catInfor.breed
            },
            success: (res) => {
                let data = JSON.parse(res.data);
                if (data.status === 200) {
                    console.info("上传完毕。");
                    email.sendEmail(true, "上传成功！");

                    flag.form.show = false;
                    const id = data.data;
                    catInforList.value = [{
                        'id': id,
                        'url': file_url.value,
                        ...catInfor
                    }]
                    console.info(catInforList, id);
                } else {
                    console.log('状态码不是200', data);
                    email(false, data.status);
                }
            },
            fail: (err) => {
              console.error(err)
            }
        })
    }

    const filter_by_poi = (cats_id) => {
        const newCatInforList = [];
        catInforList.value.forEach((item) => {
            if(cats_id.includes(item.id)) {
                newCatInforList.push(item);
            }
        })
        console.info(cats_id, newCatInforList);
        catInforList.value = newCatInforList;
        if(newCatInforList.length == 0)
            open_form();
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