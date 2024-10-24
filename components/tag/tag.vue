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
    })
    const emits = defineEmits(['toggle'])

    // flag
    const selectedFlag = ref(props.startSelected);

// Func
    const ClassObject = computed(() => {
        return {
            'selected': selectedFlag.value,
            ['container-' + props.mode]: true,
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

    padding: 8px 0;
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
</style>
