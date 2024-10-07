<template>
    <view>
        <h-tag :text="STATUS_ZH[index]" :bgColor="color['schoolStatus-'+props.type]"/>
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
            default: "inschool"  // INFO inschool || 
        }
    });
    const emits = defineEmits([]);

    // ZH 与 EN 一一对应
    const STATUS_ZH = ['在校', '毕业', '失踪', '喵星', '不明'];
    const STATUS_EN = ['inschool', 'graduation', 'missing', 'catstar', 'unknown'];
// FUNC
    const index = computed(() => {
        const idx = STATUS_EN.indexOf(props.type);
        return idx !== -1 ? idx : STATUS_EN.length() - 1;
    })
    
</script>

<style scoped>

</style>        