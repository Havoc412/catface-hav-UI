<template>
    <view>
        <h-tag :text="STATUS_ZH[index]" :bgColor="color['sterilization-'+props.type]"/>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    import color from "@/css/theme/index.module.scss";
    // store
// DATA
    const props = defineProps({
        type: {
            type: String,
            default: 'unknown'
        }
    });
    const emits = defineEmits([]);

    const STATUS_ZH = ['已绝育', '未绝育', '不明'];
    const STATUS_EN = ['sterilized', 'unsterilized', 'unknown'];
// FUNC
    const index = computed(() => {
        const idx = STATUS_EN.indexOf(props.type);
        return idx !== -1 ? idx : STATUS_EN.length() - 1;
    })

</script>

<style scoped>

</style>        