<!--BUG 在 wx 中直接被忽略了。-->
<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="4" viewBox="0 0 40 4" fill="none">
        <g :opacity="props.opacity">
            <rect  x="0" y="0" width="40" height="4" rx="2" :fill="props.color"/>
        </g>
    </svg>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        color: {
            type: String,
            default: "#000000"
        },
        opacity: {
            type: Number,
            default: 0.35
        }
    });
    const emits = defineEmits([]);

</script>   