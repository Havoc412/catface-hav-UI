<template>
    <image :src="imgPath" 
        class="image-loadding"
        :style="{ 
            transform: `scale(${scale})`, 
            opacity: opacity,
            '--height': props.size,
            '--width': props.size
        }" 
    />
</template>

<script setup>
    import { ref, onMounted, computed, onUnmounted } from "vue";
    // store
// DATA
    const props = defineProps({
        size: {
            type: String,
            default: "50%"
        }
    });
    const emits = defineEmits([]);

    // TAG consts
    const IMG_NUM = 4;  // UPDATE 需要思考一下图片大小和打包之间的处理方式，
    const TIME_OUT = 1000;
    const ANIMATION_TIME = 400; // info 虽然动画是 .5s 但是这样效果挺好的。

    let interval;
    const index = ref(1);
    const scale = ref(1);
    const opacity = ref(1);

// FUNC
    onMounted(() => {
        // init
        index.value = getRandomNumber();
        interval = setInterval(() => {
            shrinkTransition();
            setTimeout(() => {
                nextImg();
                resetTransition();
            }, ANIMATION_TIME);
        }, TIME_OUT);
    });
    onUnmounted(() => {
        clearInterval(interval);
    })

    const imgPath = computed(() => {
        return "/static/cats-head/" + index.value.toString() + ".png";
    })

    const nextImg = () => {
        index.value ++;
        if(index.value > IMG_NUM)
            index.value = 1;
    }

    const shrinkTransition = () => {
        scale.value = 0.7; // Scale up
        opacity.value = 0.2; // Fade out
    };

    const resetTransition = () => {
        scale.value = 1; // Reset scale
        opacity.value = 1; // Reset opacity
    };
    
    // init
    function getRandomNumber() {
        // 使用 Math.random() 生成 0 到 1 之间的随机小数
        const randomNumber = Math.random();

        // 将随机小数映射到 1 到 IMG_NUM(eg. 14) 之间的整数范围
        // 乘以 (14 - 1 + 1) + 1 是为了确保生成的随机整数包括 1 和 14
        const randomInteger = Math.floor(randomNumber * IMG_NUM) + 1;
        return randomInteger;
    }

</script>

<style scoped>

.image-loadding {
    height: var(--height);
    width: var(--width);
    transition: opacity 0.5s, transform 0.5s;
}

</style>