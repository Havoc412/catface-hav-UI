<template>
    <view class="container-top flex-center-both">
        <view class="container-alert">
            <up-alert :title="data.title" type="error" :description="data.description" show-icon closable></up-alert>
        </view>
        <view class="flex-center-vertical">
            <view class="flex-vertical gap-5 container-sub">
                <view class="user">
                    <user userName="CatFace 申请" :size="200"/>
                </view>
                <view class="title">使用你的头像与用户名并登录/注册</view>
                <view class="flex-center-horizontal gap-20" style="margin-bottom: 150rpx;">
                    <up-avatar :src="data.url" shape="square" size="60"></up-avatar>
                    <view>{{ data.name }}</view>
                    <view class="shrink"/>
                </view>
                <textRadio text="近期自动登录"/>
            </view>
            <view class="container-btns flex-vertical gap-10">
                <wechatBtn text="允许" bg-color="#07C160" color="#fff" font-weight="bold" @click="login" block/>
                <wechatBtn text="拒绝" bg-color="#EDEDED" @click="close" block/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { reactive, onMounted } from "vue";
    import { onLoad } from "@dcloudio/uni-app"

    // com
    import user from "../../components/home/sub-post/user.vue";
    import wechatBtn from "../../components/wechat/btn.vue";
    import textRadio from "../../components/wechat/text-radio.vue";
    // store
// DATA
    const data = reactive({
        url: "/static/Qcat.png",
        name: "Loadding...",

        title: "登录后获取更多",
        description: ""
    })

// FUNC
    onMounted(() => {
        // uni.getUserInfo({ 
        //     provider: 'weixin',
        //     success: function (infoRes) {
        //         data.url = infoRes.userInfo.avatarUrl;
        //         data.name = infoRes.userInfo.nickName;
        //     }
        // })
    })

    onLoad( (params) => {
        data.title = params.title;
        data.description = params.description;
    })

    function close() {
        uni.navigateBack();
    }

    function login() {
        
    }

</script>

<style scoped>

.container-alert {
    position: fixed;
    top: 200rpx;
}

.container-top {
    height: 100vh;
}

.container-sub {
    width: 550rpx;

}

.container-btns {
    margin-top: 50rpx;
    width: 100%;
}

.user {
    font-size: large;
    font-weight: bold;

    margin-bottom: 50rpx;
}

.title {
    color: #1E1E1E;
    font-weight: bold;
    font-size: 17px;
}


</style>        