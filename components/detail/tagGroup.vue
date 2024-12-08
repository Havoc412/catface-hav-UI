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
            type: [String, Array],
            default: ""
        }
    });
    const emits = defineEmits([]);

// FUNC
    const decodeTagList = computed(() => {
        if (!props.tagList || props.tagList === "") return [];
        else if (typeof props.tagList === "string")
            return props.tagList.split(",");
        else
            return props.tagList;
    }) 

</script>

<style scoped>

</style>        