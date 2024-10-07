<template>
    <view class="flex-horizontal block gap-10 mr-10 container-tool z-9">
        <view class="shrink"/>
        <h-icon name="com-list"/>
        <h-icon name="com-filter"/>
    </view>
    <!--TODO 这里触发一些悬浮框-->
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

.container-tool {
    position: sticky;
    top: 45px;

    padding: 5px 10px;
    background-image: linear-gradient(to right, #ffffff0F, #ffffff);
}

</style>        