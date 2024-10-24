<template>
    <view class="flex-horizontal gap-10">
        <template v-for="(item, index) in decodeTagList" :key="index">
            <h-tag :text="item"/>
        </template>
    </view>
</template>

<script setup>
    import { computed } from "vue";
    // store
// DATA
    const props = defineProps({
        tagList: {
            type: String,
            default: ""
        }
    });
    const emits = defineEmits([]);

// FUNC
    const decodeTagList = computed(() => {
        if (!props.tagList || props.tagList === "") return [];
        return props.tagList.split(",");
    }) 

</script>

<style scoped>

</style>        