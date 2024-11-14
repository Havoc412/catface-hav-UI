<template>
    <view>
        <h-tag :text="data.text" :bgColor="color['sterilization-'+data.type]" lightHold/>
    </view>
</template>

<script setup>
    import { reactive, onMounted, watch } from "vue";
    import color from "@/css/theme/index.module.scss";
    import { SterilizationStatus_EN, SterilizationStatus_ZH, GetFrontIndex  } from "../../../common/consts";
    // store
// DATA
    const props = defineProps({
        type: {
            type: [String, Number],
            default: 'unknown'
        }
    });
    const emits = defineEmits([]);

    const STATUS_ZH = SterilizationStatus_ZH;
    const STATUS_EN = SterilizationStatus_EN;

    const data = reactive({
        text: "不明",
        type: "unknown"
    })
    
// FUNC
    onMounted(() => {
        init();
    })
    watch(() => props.type, () => {
        init();
    })

    function init() {
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