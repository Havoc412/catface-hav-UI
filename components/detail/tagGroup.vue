<template>
    <view class="flex-horizontal gap-10">
        <template v-for="(item, index) in props.tagList" :key="index">
            <tag :text="item"/>
        </template>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    import tag from "../com/tag.vue";
    // store
// DATA
    const props = defineProps({
        tagList: {
            type: Array,
            default: () => ([])
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        