<template>
    <view class="container-login flex-vertical gap-5">
        <user userName="CatFace 申请" :size="80"/>
        <view class="flex-vertical shrink gap-10">
            <view class="title">使用你的头像与用户名</view>
            <view class="flex-center-horizontal gap-20">
                <up-avatar :src="data.url" shape="square" size="60"></up-avatar>
                <view>{{ data.name }}</view>
                <view class="shrink"/>
            </view>
            <textRadio text="近期自动登录"/>
            <view class="flex-center-horizontal container-btn">
                <btn text="拒绝" bg-color="#EDEDED"/>
                <btn text="允许" bg-color="#07C160" color="#fff" font-weight="bold"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";

    // com
    import user from "../home/sub-post/user.vue";
    import btn from "../wechat/btn.vue";
    import textRadio from "../wechat/text-radio.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

    const data = reactive({
        url: "/static/user.jpg",
        name: "小护",
    })

// FUNC
    // onMounted(() => {
    //     uni.getUserInfo({ 
    //         provider: 'weixin',
    //         success: function (infoRes) {
    //             console.log("getUserInfo success", infoRes);
    //             data.url = infoRes.userInfo.avatarUrl;
    //             data.name = infoRes.userInfo.nickName;
    //             data.text= ""; // INFO 暂时感觉没什么太大的作用。
    //             console.info(data.url)
    //         }
    //     })
    // })

</script>

<style scoped>

.container-login {
    color: #1E1E1E;

    background-color: #fff;
    padding: 25rpx 50rpx;
}

.title {
    color: #1E1E1E;
    font-weight: bold;
    font-size: 17px;
}

.container-btn {
    margin: 10px 0 20px 0;
}

</style>        