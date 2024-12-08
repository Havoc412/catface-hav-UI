<template>
    <view class="shadow" @click="change">
        <h-tag :text="data.text" :bgColor="color['taskLevel-'+data.type]" lightHold/>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, watch } from "vue";

    import color from "@/css/theme/index.module.scss";
    import { TaskLevelMap, TaskLevel } from "../../common/consts";
    // store
// DATA
    const typeValue = defineModel('type');
    const props = defineProps({
        mode: {
            type: String,
            default: 'show' // INFO show: 常量显示；#2 choose: 选择器；
        },
        type: {
            type: [String, Number], 
            default: "low"
        }
    });
    const emits = defineEmits([]);

    const consts = {
        MAX_TYPE: 3,
    }

    const data = reactive({
        text: "不明",
        type: "unknown",
    })
    const level = ref(0);

// FUNC
    onMounted(() => {
        init();
    });
    watch(() => props.type, () => {
        if (props.mode == 'choose') return;
        init();
    });

    function init() {
        if(typeof props.type === 'string') {  // UPDATE 这一部分或许还有问题
            data.type = props.type;
            data.text = TaskLevelMap[data.type].zh;

            // idx
            level.value = TaskLevel.findIndex(task => task.en === props.type);

            // v-model 绑定。
            typeValue.value = data.type;
        }
    }

    // func
    function change(idx) {
        if (props.mode != "choose") return;
        
        level.value = (level.value + 1) % consts.MAX_TYPE;
        data.type = TaskLevel[level.value].en;
        data.text = TaskLevel[level.value].zh;

        typeValue.value = data.type;
    }

</script>

<style scoped>

.shadow {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);;
}

</style>        