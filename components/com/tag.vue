<template>
    <view class="container-tag" :style="{
        '--bg-color': props.bgColor,
        '--font-color': props.color
    }">
        {{ props.text }}
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "Tag"
        },
        bgColor: {
            type: String,
            default: "#fff"
        },
        color: {
            type: String,
            default: "#424B4F"  // 有点灰的颜色
        },
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-tag {
    padding: 2px;
    font-weight: bold;

    border-radius: 3px;
    
    background-color: var(--bg-color);
    color: var(--font-color);
}

</style>        