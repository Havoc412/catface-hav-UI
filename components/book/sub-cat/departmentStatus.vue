<template>
    <view>
        <h-tag :text="props.mode == 'ellipsis' ? data.text[0] : data.text" bgColor="#fff" lightHold shadow/>
    </view>
</template>

<script setup>

import { reactive, onMounted, watch } from "vue";
// import color from "@/css/theme/index.module.scss";v
import { Departments_EN, Departments_ZH, GetFrontIndex } from "../../../common/consts";
// store
// DATA
const props = defineProps({
    type: {
        type: [String, Number],
        default: "it"  // 
    },
    mode: {
        type: String,
        default: "default" // ellipsis
    }
});
const emits = defineEmits([]);

// ZH 与 EN 一一对应

const data = reactive({
    text: "其他",
    type: "other"
})
// FUNC
onMounted(() => {
    init();
})

watch(() => props.type, init);

function init() {
    if (typeof props.type === 'string') {
        data.type = props.type;
        const lowerCaseType = props.type.toLowerCase();  // 大小写不敏感。
        const idx = Math.max(Departments_EN.indexOf(lowerCaseType), 0); // 如果是 -1 就返回 0
        data.text = Departments_ZH[idx];
    } else {
        const index = GetFrontIndex(props.type, Departments_ZH.length);
        data.text = Departments_ZH[index];
        data.type = Departments_EN[index];
    }
}

</script>

<style scoped></style>