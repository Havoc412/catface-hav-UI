<template>
    <view>
        <h-tag :text="data.text" :bgColor="color['taskLevel-'+data.type]" lightHold/>
    </view>
</template>

<script setup>
    import { reactive, onMounted, watch } from "vue";

    import color from "@/css/theme/index.module.scss";
    import { TaskLevel } from "../../../common/consts";
    // store
// DATA
    const props = defineProps({
        type: {
            type: [String, Number], 
            default: "inschool"
        }
    });
    const emits = defineEmits([]);

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
        if(typeof props.type === 'string') {  // UPDATE 这一部分或许还有问题
            data.type = props.type;
            data.text = TaskLevel[data.type].zh;
        }
    }

</script>

<style scoped>

</style>        