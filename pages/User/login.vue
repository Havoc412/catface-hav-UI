<template>
    <view class="flex-vertical">
    <view class="flex-top-horizontal">
        <view class="flex-top-horizontal gap-10" @click="Login">
            <view class="avatar">
                <up-image :src="data.url" width="70" height="70" radius="35"/>
            </view>
            <view class="flex-vertical gap-5">
                <view class="name">{{ data.name }}</view>
                <view class="text">{{ data.text }}</view>
            </view>
        </view>
        <view class="shrink"/>
        <view class="flex-horizontal gap-10">
            <h-icon name="user-sun"/>
            <h-icon name="user-list_block"/>
        </view>
    </view>
    <!--装饰-->
    <view style="height: 200px; width: 150px; border-radius: 20px;
        background-color: #AEC4EA;
        transform: translate(-20px, 20px); /* 向 x 轴偏移 -20px，y 轴偏移 20px */">
    </view>
</view>
</template>

<script setup>
    import { provide, reactive } from "vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);


    const data = reactive({  // zheng
        url: '/static/Qcat.png',
        name: "未登录",
        text: "点此微信登录"
    });
    
// FUNC
    function Login() {
        console.log("Login");
        uni.login({  // 
            provider: 'weixin',
            success: function (res) {
                console.log("login success", res);
                uni.getUserInfo({
                    provider: 'weixin',
                    success: function (infoRes) {
                        console.log("getUserInfo success", infoRes);
                        data.url = infoRes.userInfo.avatarUrl;
                        data.name = infoRes.userInfo.nickName;
                        data.text= "已登录";
                    }
                })
            },
            fail: function (err) {
                console.log("login fail", err);
            }
        })
    }

</script>

<style scoped>

.avatar {
    background-color: #fff;
    border-radius: 50%;
}

.name {
    font-size: 25px;
    font-family: Alimama ShuHeiTi;
}

</style>        