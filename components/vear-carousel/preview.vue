<!--INFO 比较特别的组件；使用遮罩。
    之后可以增加特别的功能，比如手动辅助猫脸识别；
-->
<template>
    <up-overlay opacity="1"
        :show="flag" @click="close">
        <view class="flex-center-both" style="height: 100%;">
            <view class="absolute" style="top: 15rpx; left: 15rpx">
                <h-icon name="com-close_light" :size="35"/>
            </view>
            <view class="block" @click.stop>
                <Halbum :list="props.urls" :currentIndex="currentIndex" @change="(index) => { currntIndex = index; }"/>
            </view>
        </view>
    </up-overlay>
</template>

<script setup>
    import { ref } from "vue";
    // store
    // com
    import Halbum from "../encounter/album.vue";
// DATA
    const props = defineProps({
        urls: {
            type: Array,
            defaut: () => []
        },
        currentIndex: {
            type: Number,
            default: 1
        },
        mode: {
            type: String,
            default: 'default' // addAnimal
        }
    });
    const emits = defineEmits(['close']);

    const flag = ref(true);

    const currntIndex = ref(props.currentIndex)  // TIP 过深的传递，reactive 到 album 就失效了

// FUNC
    function close() {
        flag.value = false;
        emits('close');
    }

</script>

<style scoped>

</style>            