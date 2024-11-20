<template>
    <view class="container-encounter flex-center-horizontal" @click="gotoEncounterDetail">
        <view class="flex-vertical gap-5 shrink">
            <view class="title">{{ props.title }}</view>
            <view class="content">{{ getContentSlice(props.content, 20) }}</view>
            <view class="content">{{ formatDate(props.updatedAt) }}</view>
        </view>
        <h-btn icon="arrow-right" variant="tonal"/>
    </view>
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
            default: "标题"
        },
        content: {
            type: String,
            default: "内容"
        },
        updatedAt: {
            type: String,
            default: "2023-01-01"
        }
    });
    const emits = defineEmits([]);

// FUNC

    // Router
    function gotoEncounterDetail() {
        uni.navigateTo({
            url: "/pages/Encounter/detail?id=" + props.id
        })
    }

</script>

<style scoped>

.container-encounter {
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