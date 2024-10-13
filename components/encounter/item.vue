<template>
    <view class="container-item flex-center-horizontal gap-10" :style="{
        '--bg-color': color[`encounter-${props.level}-light`],
    }">
        <up-image :src="props.avatar" height="90px" width="90px" radius="12px"/> <!--TODO POST IMAGE in Nginx-->
        <view class="flex-vertical shrink">
            <view>{{ props.title }}</view>
            <placeHolder height="30"/>
            <view class="flex-horizontal">
                <User :userAvatar="props.userAvatar" :userName="props.userName"/>
                <view style="flex-grow: 100;"/>
                <view class="time">{{ props.time }}</view>
            </view>
        </view>
        <view class="detail-btn flex-center-both" :style="{
            '--btn-color': setOpacity(color[`encounter-${props.level}-deep`], .5),
        }">
            <up-icon name="play-right-fill" :color="color[`encounter-${props.level}-deep`]"/>
        </view>
    </view>
</template> 

<script setup>
    import { ref } from "vue";

    import color from "@/css/theme/index.module.scss";
    import { setOpacity } from "../../utils/color";
    // com
    import User from "../home/sub-post/user.vue";
    import placeHolder from "../com/sub-tabbar/placeHolder.vue";
    // store
// DATA
    const props = defineProps({
        avatar: {
            type: String,
            default: "/static/user.jpg"
        },
        title: {
            type: String,
            default: "Title Default"
        },
        level: {
            type: String,
            default: "normal"
        },
        userAvatar: {
            type: String,
            default: "/static/dog.jpg"
        },
        userName: {
            type: String,
            default: "小护"
        },
        time: {
            type: String,
            default: "XX:xx"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-item {
    padding: 20rpx;
    padding-right: 30rpx;

    background-color: var(--bg-color);
    border-radius: 25px;
}

.detail-btn {
    height: 45px;
    width: 45px;
    margin: 20rpx;
    
    background-color: var(--btn-color);
    border-radius: 80px;
}

.time {
    font-family: Alimama ShuHeiTi;
    font-size: 10px;
    opacity: .6;    
}

</style>        