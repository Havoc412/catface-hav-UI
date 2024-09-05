<!-- 向上扩展的 list 菜单栏 -->
<template>
    <!--tip  up-overlay 没有 click.stop，外面套一层实现 -->
    <view @click.stop="close">
        <up-overlay z-index="8000" :show="flag.show" :opacity="0.0">
            <view v-show="flag.show" class="self-container flex-vertical gap-5 z-9" :style="{
                    '--width': props.width + 'rpx',
                    '--left': props.left + 'px'
                }"
                @click.stop>
                <template v-for="(item, id) in props.texts" :key="id">
                    <h-btn variant="text" radius="5" active-color="#dfeae8" :customStyle="{
                        padding: '20rpx'
                    }" @click="clickItem(id)">
                        {{ item }}
                    </h-btn>
                </template>
            </view>
        </up-overlay>
    </view>
    
</template>

<script setup>
    import { ref, reactive, watch } from "vue";
    // store
// DATA
    const props = defineProps({
        texts: {
            type: Object,
            default: ["测试文本-1", "测试文本-2"]
        },
        show: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 200
        },
        left: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits(['close', 'choose']);

    // flag
    const flag = reactive({
        show: false
    })

    // watch
    watch(() => props.show, (newVlaue, oldValue) => {
        flag.show = newVlaue;
    })

// FUNC
    const close = () => {
        emits('close');
    }
    const clickItem = (id) => {
        emits('choose', id);
        close();
    }

</script>

<style scoped>

.self-container {
    position: fixed;
    bottom: 60rpx;
    left: var(--left);

    padding: 5rpx;
    width: var(--width);

    background-color: #e8f3f1;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
    border-radius: 5rpx;
}

</style>        