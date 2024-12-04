<template>
    <view class="container-task flex-center-horizontal gap-5" @click="flag = true">
        <view class="flex-vertical gap-5 shrink">
            <view class="title">{{ props.title }}</view>
            <view class="content">{{ getContentSlice(props.content, 20) }}</view>
            <!-- <view class="content">{{ formatDate(props.updatedAt) }}</view> -->
        </view>
        <h-btn icon="arrow-right" variant="tonal"/>
    </view>
    <!--TODO overflow 展开展示 -->
</template>

<script setup>
    import { ref } from "vue";

    import { getContentSlice, formatDate } from "./utils";
    // store
// DATA
    const props = defineProps({
        id: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: "Title Default"
        },
        content: {
            type: String,
            default: "Description Default"
        }
    });
    const emits = defineEmits([]);

    const flag = ref(false);

// FUNC

</script>

<style scoped>

.container-task {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding-left: 5px;
}

.title {
    font-size: 14px;
}

.content {
    font-size: 12px;
    font-weight: 300;
}

</style>        