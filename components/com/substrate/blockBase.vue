<template>
    <view class="flex-center-both" style="height: 100vh;">
        <view 
            class="container-block" 
            :class="{
                'font-bold': !props.closeFontBold
            }"
            :style="{
                '--max-width': props.maxWidth,
                '--width': props.width
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
        width: {
            type: String,
            default: "auto"
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