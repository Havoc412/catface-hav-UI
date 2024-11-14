<!--INFO 目前就是针对 【科普】 内容-->
<template>
    <view class="flex-vertical gap-5">
        <view class="dirs">
            <template v-for="(item, index) in props.dirs">
                <span v-if="index != 0"> · </span>
                {{ item }}
            </template>
        </view>
        <view class="flex-top-horizontal gap-10">
            <view class="title">
                <rich-text :nodes="props.title"/>
            </view>
            <view class="content shrink">
                <rich-text :nodes="props.content"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        dirs: Array,
        title: String,
        content: String,
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.dirs {
    font-weight: bold;
    font-size: 15px
}

.title {
    font-weight: bold;
}

.content {
    font-size: 14px;
    flex-wrap: wrap;
}

</style>        