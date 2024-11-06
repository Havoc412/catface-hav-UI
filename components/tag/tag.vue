<!--暂时主要就是在 Filter 中使用，其他都是在用 chip-->
<template>
    <view 
        class="flex-center-both" 
        :class="ClassObject" 
        @click="toggle"
        :style="{
            '--font-color': props.color,
            '--bg-color': props.bgColor
        }"
        >
        <text>{{ props.text }}</text>
    </view>
</template>

<script setup>
    import { ref, computed, watch } from "vue";
    import color from "@/css/theme/index.module.scss";

// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: 'full' // hollow  
        },
        text: {
            type: String,
            default: "默认"
        },
        bgColor: {
            type: String,
            default: color['main-light']
        },
        color: {
            type: String,
            default: color['main-deep']  // 有点灰的颜色
        },
        startSelected: Boolean,
        refresh: Boolean,
        shadow: Boolean,
    })
    const emits = defineEmits(['toggle'])

    // flag
    const selectedFlag = ref(props.startSelected);

// Func
    const ClassObject = computed(() => {
        return {
            'selected': selectedFlag.value,
            ['container-' + props.mode]: true,
            'shadow': props.shadow,
        }
    })

    watch(() => props.refresh, (newValue, oldValue) => {
        selectedFlag.value = props.startSelected;
    })

    function toggle() {
        selectedFlag.value = !selectedFlag.value;
        emits('toggle', selectedFlag.value);
    }

</script>

<style scoped>

.container-hollow {
    font-size: 14px;
    font-family: SourceHanSansCN;
    font-weight: 300;

    padding: 8px;
    height: 30px;

    border-radius: 10px;
    background-color: #f9f9f9;
}

.container-full {
    padding: 2px;
    font-weight: bold;

    border-radius: 3px;
    
    background-color: var(--bg-color);
    color: var(--font-color);
}

.view {
  flex: 1 1 80px;
}

.selected {
    color: var(--color);
    border: solid 1px var(--font-color);
    background-color: var(--bg-color);
}

.shadow {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

</style>
