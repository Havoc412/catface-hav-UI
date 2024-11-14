<template>
    <view class="flex-center-horizontal gap-20">
        <template v-for="(item, index) in imgIndex">
            <image :src="`/static/cats-head/${item}.png`" 
                class="image-loadding"
                :class="[index == currentIndex ? '' : 'image-bigger']"
                :style="{
                    '--height': props.size,
                    '--width': props.size,
                }"
            />
        </template>
    </view>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from "vue";
    // store
// DATA
    const props = defineProps({
        size: {
            type: String,
            default: "30px"
        }
    });
    const emits = defineEmits([]);

    const consts = {
        IMG_NUM: 4,
        TIME_INTERVAL: 1000,
    }
    
    const imgIndex = ref([]);
    
    let interval;
    const currentIndex = ref(0);
// FUNC
    onMounted(() => {
        imgIndex.value = randomArray();
        interval = setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % consts.IMG_NUM;
        }, consts.TIME_INTERVAL);
    })
    onUnmounted(() => {
        clearInterval(interval);
    })

    // 计算属性，生成1到num之间的随机排列
    const randomArray = () => {
        const numbers = Array.from({ length: consts.IMG_NUM }, (_, i) => i + 1);
        // Fisher-Yates洗牌算法
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers;
    };

</script>

<style scoped>

.image-loadding {
    height: var(--height);
    width: var(--width);
    transition: opacity 0.5s, transform 0.5s;
}

.image-bigger {
    transform: scale(.6);
}

</style>        