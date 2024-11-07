<template>
     <h-btn :text="props.text" :customStyle="{
        'background-color': color['main-deep'],
        color: color['main-light'],
        'font-weight': 'bold',
        'padding': '3px 10px',
    }" @click="emits('click')"/>
</template>

<script setup>
    import { ref } from "vue";

    import color from "@/css/theme/index.module.scss";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "深蓝主题"
        }
    });
    const emits = defineEmits(['click']);

// FUNC

</script>

<style scoped>

</style>        