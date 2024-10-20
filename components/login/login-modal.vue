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
                <wechatBtn text="拒绝" bg-color="#EDEDED" @click="close"/>
                <wechatBtn text="允许" bg-color="#07C160" color="#fff" font-weight="bold" @click="login"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { reactive, onMounted } from "vue";

    // com
    import user from "../home/sub-post/user.vue";
    import wechatBtn from "../wechat/btn.vue";
    import textRadio from "../wechat/text-radio.vue";

    import api from "../../request/human";
    // store
    import human from "../../store/human";
    const { setLoginStatus } = human();
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['close']);

    const data = reactive({
        url: "/static/Qcat.png",
        name: "Loadding...",
    })

// FUNC
    onMounted(() => {
        uni.getUserInfo({ 
            provider: 'weixin',
            success: function (infoRes) {
                console.log("getUserInfo success", infoRes);
                data.url = infoRes.userInfo.avatarUrl;
                data.name = infoRes.userInfo.nickName;
            }
        })
    })

    function login() {
        console.debug("Login");
        uni.login({  // 
            provider: 'weixin',
            success: async function (res) {
                console.log("login success", res);
                const [wecharRes, err] = await api.weixinLogin(res.code, data.url, data.name);
                console.debug(err, wecharRes);
                if(err == null)
                    setLoginStatus(wecharRes, data.url, data.name);
                // TODO 错误处理
                emits('close');
            },
            fail: function (err) {
                console.log("login fail", err);
                emits('close');
            }
        })
    }


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