<template>
    <view class="flex-horizontal m-5">
        <pair :avatar="props.human.avatar" :name="props.human.name"/>
        <view class="shrink"/>
        <template v-for="(item, index) in props.animals" :key="index">
            <pair :avatar="item.avatar" :name="item.name"/>
        </template>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import pair from "./pair.vue";
    // store
// DATA
    const props = defineProps({
        // {avatar: , name: } 都是这种结构的组成
        human: {
            type: Object,
            default: () => ({})  
        },
        animals: {  // TODO 接收一个数组，具体展示方式在此组件判断
            type: Array,
            default: () => []
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        