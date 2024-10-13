<template>
    <tabberBase>
        <template #prefix>
            <funcGroup/>
            <view class="contanier-heart flex-center-vertical absolute z-0">
                <h-icon :name="heartSvg" @click="flag.heart = !flag.heart"/>
            </view>
        </template>
    </tabberBase>
</template>

<script setup>
    import { ref } from "vue";
    import tabberBase from "../com/substrate/tabberBase.vue";

    import funcGroup from "./funcGroup.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        