<template>
    <!--TIP 在外部可以直接覆盖 style 来实现不同的变换-->
    <image :src="svgPath" class="icon" :style="{'--size': props.size + 'px'}" @click="emits('click')"/>
</template>

<script setup>
    import { ref, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        name: String,
        size: {
            type: [Number, String],
            default: 24
        }
    });
    const emits = defineEmits(['click']);
    const PathRoot = "/static/icon";
    
// FUNC
    // 定义一个函数来转换字符串
    function transformIconName(iconSymbol) {
        // QUESTION 好像自带了 大小写兼容；
        return iconSymbol.replace(/-/g, '/').concat('.svg');
    }

    const svgPath = computed(() => {
        if (props.name) {
            return `${PathRoot}/${transformIconName(props.name)}`;
        }
        return '';
    });
    // console.info(svgPath.value); // TEST

</script>

<style scoped>

.icon {
    width: var(--size);
    height: var(--size);
}

</style>        