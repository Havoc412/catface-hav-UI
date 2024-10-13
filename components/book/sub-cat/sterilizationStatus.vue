<template>
    <view>
        <h-tag :text="data.text" :bgColor="color['sterilization-'+data.type]"/>
    </view>
</template>

<script setup>
    import { reactive, onMounted } from "vue";
    import color from "@/css/theme/index.module.scss";
    import { sterilizationStatus_EN, sterilizationStatus_ZH } from "../../../common/consts";
    // store
// DATA
    const props = defineProps({
        type: {
            type: [String, Number],
            default: 'unknown'
        }
    });
    const emits = defineEmits([]);

    const STATUS_ZH = sterilizationStatus_ZH;
    const STATUS_EN = sterilizationStatus_EN;

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