<template>
    <view>
        <h-tag :text="data.text" :bgColor="color['schoolStatus-'+data.type]"/>
    </view>
</template>

<script setup>
    import { reactive, onMounted } from "vue";
    import color from "@/css/theme/index.module.scss";
    import { schoolStatus_ZH, schoolStatus_EN } from "../../../common/consts";
    // store
// DATA
    const props = defineProps({
        type: { 
            type: [String, Number], 
            default: "inschool"  // INFO inschool || 
        }
    });
    const emits = defineEmits([]);

    // ZH 与 EN 一一对应
    const STATUS_ZH = schoolStatus_ZH;
    const STATUS_EN = schoolStatus_EN;

    const data = reactive({
        text: "不明",
        type: "unknown"
    })
// FUNC
    onMounted(() => {
        if(typeof props.type === 'string') {
            data.type = props.type;
            const idx = Math.max(STATUS_EN.indexOf(props.type), 0); // 如果是 -1 就返回 0
            data.text = STATUS_ZH[idx];
        } else {
            data.text = STATUS_ZH[props.type - 1];
            data.type = STATUS_EN[props.type - 1];
        }
    })
    
</script>

<style scoped>

</style>        