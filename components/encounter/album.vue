<template>
    <view class="relative">
        <text class="absolute num-text flex-center-both">{{ currentIndex+1 }}/{{ length }}</text>
        <u-swiper :list="list" height="500" radius="5" @change="changeIndex">
            <template #indicator>
                <view class="flex-center-horizontal gap-5">
                    <view v-for="index in length" class="dot" :class="{'dot-light': index-1 === currentIndex}"></view>
                </view>
            </template>
        </u-swiper>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";

    // store
// DATA
    const props = defineProps({
        list: {
            type: Array,
            default: () => []
        },
    });
    const emits = defineEmits([]);
    // flag
    const currentIndex = ref(0);
    const length = computed(() => props.list.length);

// FUNC
    const changeIndex = (index) => {
        currentIndex.value = index.current;
    }

</script>

<style scoped>

.num-text {
    right: 20px;
    top: 20px;

    padding: 4px 0;
    background-color: #33333366;
    border-radius: 10px;
    width: 40px;

    font-size: 14px;
    color: #ffffff;
    line-height: 13px;
}

.dot {
    background-color: #DAE2E6;
    width: 4px;
    height: 4px;
    border-radius: 50%;
}
 
.dot-light {
    background-color: #30444E;
    width: 5px;
    height: 5px;
    border-radius: 50%;
}

</style>        