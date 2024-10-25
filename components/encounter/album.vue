<template>
    <view class="relative block">
        <text class="absolute num-text flex-center-both">{{ currentIndex+1 }}/{{ length }}</text>
        <u-swiper :list="props.list" :current="currentIndex" height="500" radius="5" :autoplay="false" @change="changeIndex">
            <template #indicator>
                <view class="flex-center-horizontal gap-5">
                    <view v-for="index in length" class="dot" :class="{'dot-light': index-1 === currentIndex}"></view>
                </view>
            </template>
        </u-swiper>
    </view>
</template>

<script setup>
    import { ref, computed, watch } from "vue";

    // store
// DATA
    const props = defineProps({
        currentIndex: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            default: () => ([])
        },
        refresh: Boolean
    });
    const emits = defineEmits(['change']);
    // flag
    const currentIndex = ref(props.currentIndex);
    const length = computed(() => props.list.length);

// FUNC
    watch(() => props.refresh, (newVal) => {
        currentIndex.value = props.currentIndex;
    })

    const changeIndex = (index) => {
        currentIndex.value = index.current;
        emits('change', currentIndex.value)
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