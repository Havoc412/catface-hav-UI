<template>
    <view>
        <fr-icon-preview-open v-show="flag.open" theme="outline" :size="props.size" :fill="[props.color]" />
        <fr-icon-preview-close v-show="!flag.open" theme="outline" :size="props.size" :fill="[props.color]" />
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, onUnmounted } from "vue";
    // store
// DATA
    const props = defineProps({
        color: {
            type: String,
            default: "#000"
        },
        size: {
            type: Number,
            default: 50
        }
    });
    const emits = defineEmits([]);

    // flag
    const flag = reactive({
        open: true,
    })

    let timer = null;
// FUNC
    onMounted(() => {
        flag.open = true;
        timer = setInterval(() => {
            flag.open = !flag.open;
        }, 1000);
    })
    onUnmounted(() => {
        clearInterval(timer);
    })

</script>

<style scoped>

</style>        