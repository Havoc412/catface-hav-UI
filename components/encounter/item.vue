<template>
    <view>
        
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        avatar: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        level: {
            type: String,
            default: "normal"
        },
        userAvatar: {
            type: String,
            default: ""
        },
        userName: {
            type: String,
            default: ""
        },
        time: {
            type: String,
            default: ""
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        