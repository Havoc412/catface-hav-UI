<template>
    <view style="font-weight: bold;">
        <chip light
            :text="encounterLevel[level].zh"
            :bgColor="encounterLevel[level].bg"
            :color="encounterLevel[level].font"
            @click="changeLevel"
        />
    </view>
</template>

<script setup>
    import { ref, watch } from "vue";

    import { encounterLevel } from "../../../../common/consts";
    // com
    import chip from "../chip.vue";
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: "show"  // INFO #1 show: 常量显示；#2 choose: 选择器；
        },
        // data
        level: {
            type: Number,
            default: 1
        }
    });
    const emits = defineEmits([]);

    const consts = {
        MAX_TYPE: 2,  // INFO 目前用户最多使用前两个字符。
    }

    const level = ref(props.level - 1);

// FUNC
    watch(() => props.level, function() {
        level.value = props.level - 1;
    })

    function changeLevel() {
        if (props.mode != "choose") return;
        level.value = (level.value + 1) % consts.MAX_TYPE;
    }

</script>

<style scoped>

</style>        