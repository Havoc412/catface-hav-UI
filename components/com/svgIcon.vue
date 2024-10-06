<template>
    <image :src="svgPath" class="icon" :style="{'--size': props.size + 'px'}"/>
</template>

<script setup>
    import { ref, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        name: String,
        size: {
            type: [Number, String],
            default: 20
        }
    });
    const emits = defineEmits([]);
    const PathRoot = "/static/icon";
    
// FUNC
    // 定义一个函数来转换字符串
    function transformIconName(iconSymbol) {
        return iconSymbol.replace(/-/g, '/').concat('.svg');
    }

    const svgPath = computed(() => {
        if (props.name) {
            return `${PathRoot}/${transformIconName(props.name)}`;
        }
        return '';
    });

    console.info(svgPath.value);
    

</script>

<style scoped>

.icon {
    width: var(--size);
    height: var(--size);
}

</style>        