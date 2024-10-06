<template>
    <tabberBase :bottom="props.bottom">
        <h-icon name="tabbar-book"/>
    </tabberBase>
</template>

<script setup>
    import { ref } from "vue";
    import tabberBase from "./substrate/tabberBase.vue";
    // store
// DATA
    const props = defineProps({
        bottom: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        