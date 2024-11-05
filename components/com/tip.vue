<template>
    <view class="text-default" :style="{
        '--font-size': props.fontSize + 'px'
    }">
        <slot>
            {{ text }}
        </slot>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "提示用浅色文本，样式主要通过外部设定"  // TODO 外部设定样式。
        },
        fontSize: {
            type: [String, Number],
            default: 13
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.text-default {
    color: #999999;
    font-size: var(--font-size);
}

</style>        