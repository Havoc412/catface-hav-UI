<template>
    <view class="flex-vertical gap-10">
        <view class="date">-{{ props.date }}</view>
        <template v-for="(item, index) in props.list" :key="index">
            <item/>
        </template>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import item from "./item.vue";
    // store
// DATA
    const props = defineProps({
        date: {
            type: String,
            default: "10月2号"
        },
        list: {
            type: Array,
            default: [{}, {}]  // TODO
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.date {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 18px;
}

</style>        