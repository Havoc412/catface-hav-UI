<template>
    <snackbar class="top" v-model="email.snackbar_switch" 
      :message="email.snackbar_message" :color="email.kind_flag"
      :timeout="email.time_flag ? 15000 : 2000 ">
    </snackbar>
    <view class="flex-center-vertical contianer bg-img mt-10">
        <view class="flex-center-vertical">
            <view class="title">点击下图，上传猫猫图片</view>
            <view class="attention">尽量对准猫猫正脸，效果会更好。</view>
            <!--info 文件上传--><!--todo 之后兼容 视频识别 accept="all" -->
            <h-upload 
                @email="send_email"
                @open-form="open_form"
                @success="load_cat_infor"
                @refresh="refresh"
            />
            <view class="attention">模型开发优化中，识别结果仅供参考。</view>

            <!-- <cat-item/> -->
            <view class="flex-vertical gap-10">
                <template v-for="(item, id) in catInforList" :index="cat-id">
                    <cat-item :infor="item" detect/>
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
            </view>

            <!-- form -->
            <cat-form v-if="flag.form.show" 
                :breedFromModel="flag.form.breed" 
                :detect-error="flag.form.detect_error"
            />
        </view>
    </view>
    <h-tarbar />
</template>

<script setup>
    import { ref, reactive } from "vue";

    import { Ecnn } from "../../ErrCode/errmsg";
    // com
    import catItem from "../../components/catface/catItem.vue";
    import catForm from "../../components/catface/form.vue";

    import HUpload from "../../components/com/upload.vue";

    import snackbar from "../../components/com/snackbar.vue";
    // store
    import emialStore from "../../store/snackbar";
    const email = emialStore();

// DATA
    const catInforList = ref([]);

    // Flag
    const flag = reactive({
        form: {
            show: false,
            detect_error: false,
            breed: "",
        },
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

    const load_cat_infor = (list, breed) => {
        flag.form.breed = breed;
        catInforList.value = list;
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

</style>        