<template>
    <view class="container-place" :style="{
        '--height': height + props.type
    }"></view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        height: {
            type: String,
            default: "70"
        },
        type: {
            type: String,
            default: "px"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-place {
    height: var(--height);
}

</style>        