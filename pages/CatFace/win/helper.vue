<template>
    <up-overlay opacity=".3"
        :show="flag.show" @click="close">
        <view class="flex-center-both" style="height: 100%;">
            <view class="flex-vertical container-helper gap-5">
                <view>1. 尽量对准猫猫正脸，效果会更好。</view>
                <view>2. 室外环境下，使用录像功能会更方便一些。</view>
                <placeHolder height="10"/>
                <view>参考案例：</view>
                <up-image src="/static/error.svg"/> <!--TODO 之后插入 1~2 张合适的例子-->
            </view>
        </view>
    </up-overlay>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import placeHolder from "../../../components/com/sub-tabbar/placeHolder.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['close']);

    const flag = reactive({
        show: true
    })

// FUNC
    function close() {
        flag.show = false;
        emits('close');
    }

</script>

<style scoped>

.container-helper {
    font-family: Alimama ShuHeiTi;
    
    padding: 20px;

    background-color: #fff;
    border-radius: 15px;
}

</style>        