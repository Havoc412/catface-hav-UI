<template>
    <view>
        <chip 
            :text="encounterLevel[level].zh"
            :bgColor="encounterLevel[level].bg"
            :color="encounterLevel[level].font"
        />
    </view>
</template>

<script setup>
    import { computed } from "vue";

    import { encounterLevel } from "../../../../common/consts";
    // com
    import chip from "../chip.vue";
    // store
// DATA
    const props = defineProps({
        level: {
            type: Number,
            default: 1
        }
    });
    const emits = defineEmits([]);

// FUNC
    const level = computed(() => {
        return props.level - 1;
    })

</script>

<style scoped>

</style>        