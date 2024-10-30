<template>
    <chipGroup mode="editable" infoIcon @change="(values) => { emits('change', values) }" @info="flag = true"/>
    <up-overlay opacity=".1" :show="flag" @click="flag = false">
        <blockBase>
            别名最多三个，每个别名最多10个字。<br/>
            按住拖动到指定位置即可删除。
        </blockBase>
    </up-overlay>
</template>

<script setup>
    import { ref } from "vue";

    import chipGroup from "../com/chip/chipGroup.vue";
    import blockBase from "../com/substrate/blockBase.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['change']);

    const flag = ref(false);
// FUNC

</script>

<style scoped>

</style>        