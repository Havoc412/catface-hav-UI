<template>
    <view class="flex-center-both" style="height: 100vh;">
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
    font-weight: bold;
    
    padding: 20px;
    border-radius: 15px;
    
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, .3);
}

</style>        