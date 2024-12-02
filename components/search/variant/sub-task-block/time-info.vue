<template>
    <view class="flex-center-both gap-5">
        <view>{{ formattedStartTime }}</view>
        <view class="flex-center-vertical">
            <view>{{ props.estimated_min_duration }}</view>
            <view style="margin: -10px 0;">--------</view>
            <view>{{ props.estimated_max_duration }}</view>
        </view>
        <view>{{ formattedDeadline }}</view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        start_time: {
            type: String,
            default: "2024-10-20T20:38:54+08:00"
        },
        deadline: {
            type: String,
            default: "2024-10-20T20:38:54+08:00"
        },
        estimated_min_duration: {
            type: String,
        },
        estimated_max_duration: {
            type: String,
        }
    });
    const emits = defineEmits([]);

// FUNC
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}.${day} ${hours}:${minutes}`;
    };

    const formattedStartTime = computed(() => formatDate(props.start_time));
    const formattedDeadline = computed(() => formatDate(props.deadline));


</script>

<style scoped>

</style>        