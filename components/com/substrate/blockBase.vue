<template>
    <view class="flex-center-both" style="height: 100%;">
        <view class="container-block">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-block {
    font-family: Alimama ShuHeiTi;
    
    padding: 20px;

    background-color: #fff;
    border-radius: 15px;
}

</style>        