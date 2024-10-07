<template>
    <view>
        <h-tag :text="STATUS_ZH[index]" :bgColor="color['schoolStatus-'+props.type]"/>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    import color from "@/css/theme/index.module.scss";
    import { schoolStatus_ZH, schoolStatus_EN } from "../../../common/consts";
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
    const STATUS_ZH = schoolStatus_ZH;
    const STATUS_EN = schoolStatus_EN;
// FUNC
    const index = computed(() => {
        const idx = STATUS_EN.indexOf(props.type);
        return idx !== -1 ? idx : STATUS_EN.length() - 1;
    })
    
</script>

<style scoped>

</style>        