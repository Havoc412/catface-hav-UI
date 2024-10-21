<template>
    <view class="relative">
        <text class="absolute num-text flex-center-both">{{ currentIndex+1 }}/{{ length }}</text>
        <u-swiper :list="fetchFullPhotoUrls" height="500" radius="10" @change="changeIndex">
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

    import nginx from "../../request/nginx";
    // store
// DATA
    const props = defineProps({
        list: {
            type: String,
            default: ""
        },
        userId: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits([]);
    const photosList = ref([]);
    // flag
    const currentIndex = ref(0);
    const length = computed(() => photosList.value.length);

// FUNC
    const changeIndex = (index) => {
        currentIndex.value = index.current;
        // console.debug(index, currentIndex.value);
    }

    const fetchFullPhotoUrls = computed(() => {
        photosList.value = props.list.split(',');
        console.debug("photosList", photosList, props.list);
        const fullUrls = photosList.value.map((fileName) => {
            return nginx.encounterPhotos(props.userId, fileName);
        })
        console.debug(fullUrls);
        return fullUrls;
    })

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