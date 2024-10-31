<template>
    <view class="flex-vertical">
        <view class="flex-top-horizontal">
            <view class="flex-top-horizontal gap-10" @click="showLogin">
                <view class="avatar">
                    <up-image :src="humanStore.user_avatar" width="70" height="70" radius="35"/>
                </view>
                <view class="flex-vertical gap-5">
                    <view class="name">{{ humanStore.user_name }}</view>
                    <view v-if="!humanStore.logined" class="text">{{ data.text }}</view>
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
    <!--INFO Login Modal-->
    <u-popup :show="flag.login" mode="bottom" @close="flag.login = false" round="12">
        <loginModal @close="flag.login = false"/>
    </u-popup>
</template>

<script setup>
    import { reactive } from "vue";
    // com
    import loginModal from "../../components/login/login-modal.vue";
    // store
    import human from "../../store/human";
    const humanStore = human();
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);


    const data = reactive({  // zheng
        text: "点此微信登录"
    });

    const flag = reactive({
        login: false
    });
    
// FUNC
    function showLogin() {  // INFO 可以办到 隐式登录，获取最新的信息。 // TODO 需要用户授权。
        flag.login = true;
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
    font-weight: bold;
}

</style>        