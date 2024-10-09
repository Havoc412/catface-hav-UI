<template>
    <view class="container-post">
        <image :src="nginx.static(props.url)" class="img" :style="{
            '--height': props.height + 'rpx'
        }"/>
        <view class="flex-vertical container-info gap-5">
            <view>{{ props.title }}</view>
            <view class="flex-horizontal gap-5">
                <up-image :src="props.userAvatar" height="50rpx" width="50rpx" radius="25rpx"/>
                <view class="no-shrink">{{ props.userName }}</view>
                <view class="shrink"/>
                <view class="flex-bottom-horizontal gap-5">
                    <view class="time">{{ props.time }}</view>
                    <h-icon :name="likeSvg" @click="like"/>
                </view>
            </view>
            <!---->
            
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    
    import nginx from "../../request/nginx";
    // store
// DATA
    const props = defineProps({
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
            default: "23.1.1"
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

// FUNC
    const likeSvg = computed(() => {
        return `com-heart${flag.like ? "_active" : ""}`;
    });

    function like() {
        flag.like = !flag.like;
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