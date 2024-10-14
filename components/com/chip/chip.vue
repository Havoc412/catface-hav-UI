<!--INFO 因为暂时用不到 原项目 chip 的长按功能，就先使用一个简化的版本就好。-->
<template>
    <view class="flex-center-both basic" :style="{
        '--bg-color': props.bgColor,
        '--font-color': props.color
    }">
        <slot> <!--放一个 slot，增加灵活性-->
            {{ props.text }}
        </slot>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: [String, Number],
            default: "日常"
        },
        bgColor: {
            type: String,
            default: "#fff"
        },
        color: {
            type: String,
            default: "#000"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.basic {
    padding: 10px;
    height: 30px;

    background-color: var(--bg-color);
    border-radius: 10rpx;

    color: var(--font-color);
    letter-spacing: 1px;    /* 字间距 */
    font-size: 14px;
    line-height: 13px;
    font-family: Alimama ShuHeiTi;

    flex-shrink: 0;
    flex-basis: auto;
    white-space: nowrap;
}

</style>        