<template>
    <view class="flex-center-both" style="height: 100vh;">
        <view 
            class="container-block" 
            :class="{
                'font-bold': !props.closeFontBold
            }"
            :style="{
                '--max-width': props.maxWidth,
                '--width': props.width,
                'margin-bottom': props.marginBottom,
            }"
        >
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        closeFontBold: Boolean,
        maxWidth: {
            type: String,
            default: "90vw"
        },
        width: {  // 比如，Knowledge 场景需要固定宽度。
            type: String,
            default: "auto"
        },
        marginBottom: {  // 考虑到常用于 popup 中的消息提示，但是 flex-center-both 有些偏低，故此默认靠此调整。
            type: String,
            default: "200px"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-block {   
    max-height: 100vh; 
    max-width: var(--max-width);
    width: var(--width);
    
    padding: 20px;
    border-radius: 15px;
    
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, .3);
}

.font-bold {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
}

</style>        