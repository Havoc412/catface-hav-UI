<template>
    <view>
        <h-tag :text="data.text" :bgColor="color['schoolStatus-'+data.type]"/>
    </view>
</template>

<script setup>
    import { reactive, onMounted, watch } from "vue";
    import color from "@/css/theme/index.module.scss";
    import { SchoolStatus_EN, SchoolStatus_ZH, GetFrontIndex } from "../../../common/consts";
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
    const STATUS_ZH = SchoolStatus_ZH;
    const STATUS_EN = SchoolStatus_EN;

    const data = reactive({
        text: "不明",
        type: "unknown"
    })
// FUNC
    onMounted(() => {
        init();
    });
    watch(() => props.type, init);

    function init() {
        console.debug("schoolStatus.init", props.type);
        if(typeof props.type === 'string') {
            data.type = props.type;
            const idx = Math.max(STATUS_EN.indexOf(props.type), 0); // 如果是 -1 就返回 0
            data.text = STATUS_ZH[idx];
        } else {
            const index = GetFrontIndex(props.type, STATUS_EN.length);
            data.text = STATUS_ZH[index];
            data.type = STATUS_EN[index];
        }
    }
    
</script>

<style scoped>

</style>        