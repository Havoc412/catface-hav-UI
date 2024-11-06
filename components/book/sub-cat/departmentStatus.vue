<template>
    <view>
        <h-tag :text="props.mode == 'ellipsis' ? data.text[0] : data.text" bgColor="#fff" />
    </view>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import color from "@/css/theme/index.module.scss";
import { Departments_EN, Departments_ZH } from "../../../common/consts";
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
    if (typeof props.type === 'string') {
        data.type = props.type;
        const idx = Math.max(Departments_EN.indexOf(props.type), 0); // 如果是 -1 就返回 0
        data.text = Departments_ZH[idx];
    } else {
        data.text = Departments_ZH[props.type - 1];
        data.type = Departments_EN[props.type - 1];
    }
})

</script>

<style scoped></style>