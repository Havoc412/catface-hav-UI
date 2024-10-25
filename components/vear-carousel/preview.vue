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
                <album :refresh="refresh" :list="props.urls" :currentIndex="currentIndex" @change="changeIndex"/>
            </view>
            <view v-if="addMode" class="absolute" style="bottom: 15rpx; right: 15rpx">
                <view class="flex-center-horizontal gap-10" @click.stop>
                    <h-btn v-if="currentIndex > 0" variant="tonal" pre-icon="arrow-front" @click="setFront">设为首图</h-btn>
                    <h-btn v-if="props.urls.length > 1" variant="tonal" pre-icon="tool-delete_thin" @click="deleteImage">删除</h-btn>
                </view>
            </view>
        </view>
    </up-overlay>
</template>

<script setup>
    import { ref, computed } from "vue";
    // store
    // com
    import album from "../encounter/album.vue";
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
            default: 'default' // add
        }
    });
    const emits = defineEmits(['close', 'delete', 'setFront']);

    const flag = ref(true);
    const refresh = ref(false);

    const currentIndex = ref(props.currentIndex)  // TIP 过深的传递，reactive 到 album 就失效了
// FUNC
    function close() {
        flag.value = false;
        emits('close');
    }

    const addMode = computed(() => {
        return props.mode === 'add';
    })

    function changeIndex(index) {
        currentIndex.value = index;
    }

    function deleteImage() {
        emits('delete', currentIndex.value);
        if (currentIndex.value > 0)
            currentIndex.value -= 1
        refresh.value = !refresh.value;
    }

    function setFront() {
        emits('setFront', currentIndex.value);
    }

</script>

<style scoped>

</style>            