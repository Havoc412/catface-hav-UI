<template>
    <view class="container-post" @click="gotoDetial">
        <image :src="data.avatar" 
            class="img" :style="{
            '--height': props.height + 'rpx'
            }"
            mode="widthFix"
            @error="imageError"
        />
        <view class="flex-vertical container-info gap-5">
            <view>{{ props.title }}</view>
            <view class="flex-horizontal gap-1 block" @click.stop>
                <!--INFO 为了压缩有效，不适合二次封装 <user :userAvatar="nginx.humAvatar(props.userAvatar)" :userName="props.userName"/> -->
                <!--TODO 增加用户信息查询，-->
                <up-image :src="nginx.humAvatar(props.userAvatar)" height="50rpx" width="50rpx" radius="25rpx"/>
                <view class="name yes-shrink">{{ props.userName }}</view>
                <view class="shrink"/>
                <view class="flex-bottom-horizontal gap-5">
                    <view class="time">{{ formatTime }}</view>
                    <h-icon :name="likeSvg" @click="like"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    
    import nginx from "../../request/nginx";
    import api from "../../request/encounter";

    // import user from "./sub-post/user.vue";
    // store
// DATA
    const props = defineProps({
        id: {
            type: Number,
            default: 0
        },
        userId: { // 上传者 id
            type: Number,
            default: 0  
        },
        url: {
            type: String,
            default: "/static/dog.jpg"
        },
        title: {
            type: String,
            default: "默认标题"
        },
        userAvatar: {
            type: String,
            default: "/static/icon.png"
        },
        userName: {
            type: String,
            default: "默认名"
        },
        time: {
            type: String,
            default: "2024-10-20T20:38:54+08:00" // INFO 这里会计算一次
        },
        like: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 350
        }
    });
    const emits = defineEmits([]);

    const flag = reactive({
        like: props.like
    })
    const data = reactive({
        avatar: nginx.encounterAvatar(props.url)
    })

// FUNC
    const likeSvg = computed(() => {
        return `com-heart${flag.like ? "_active" : ""}`;
    });

    const formatTime = computed(() => {
         const date = new Date(props.time);
    
        // 获取年、月、日
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // 判断是否是当前年份
        const currentYear = new Date().getFullYear();
        const formattedDate = year === currentYear ? `${month}.${day}` : `${String(year).slice(-2)}.${month}.${day}`;
        
        return formattedDate;
    })

    async function like() {
        api.clickLike(props.id, flag.like);
        flag.like = !flag.like;
    }

    function gotoDetial() {
        uni.navigateTo({
            url: "/pages/Encounter/detail?id=" + props.id
        })
    }

    function imageError() {
        data.avatar = "/static/error.png";
    }

</script> 

<style lang="scss">
@import "/css/theme/index.module.scss";  // UPDATE 还是得一个个导入？
@import "/common/consts.module.scss";

.container-post {
    width: $post-width;
    
    border-radius: 5px;
    background-color: $h-bg-light;
    overflow: hidden;
}

.img {
    height: var(--height);
    width: $post-width;
}

.container-info {
    font-size: 14px;
    padding: 10rpx;
    padding-top: 0;
}

.time {
    font-family: Alimama ShuHeiTi;
    color: #6B6B6B;
}

</style>        