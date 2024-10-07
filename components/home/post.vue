<template>
    <view class="container-post">
        <image :src="props.url" class="img" :style="{
            '--height': props.height + 'rpx'
        }"/>
        <view class="flex-vertical container-info">
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
            default: 340
        }
    });
    const emits = defineEmits([]);

    const flag = reactive({
        like: props.like
    })

// FUNC
    const likeSvg = computed(() => {
        return `post-heart${flag.like ? "_active" : ""}`;
    });

    function like() {
        flag.like = !flag.like;
    }

</script> 

<style lang="scss">
@import "/css/theme/index.scss";  // UPDATE 还是得一个个导入？

.container-post {
    border-radius: 5px;
    background-color: $h-bg-light;
}

.img {
    height: var(--height);
    width: 340rpx;
}

.container-info {
    font-size: 14px;
    padding: 10rpx;
}

.time {
    font-family: Alimama ShuHeiTi;
    color: #6B6B6B;
}

</style>        