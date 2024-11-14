<template>
    <view class="flex-center-vertical half-container">
        <!-- image -->
        <image :src="imgPath" 
            class="image-loadding"
            :style="{ 
                transform: `scale(${scale})`, 
                opacity: opacity,
                '--height': props.size,
                '--width': props.size
            }" 
        />
        <!-- TAG text -->
        <view v-if="props.mode == 'text'" class="flex-center-both loadding-text">
            {{ props.loaddingText }}
            <template v-for="index in 3">
                <span v-show="pointNum >= index">.</span>
            </template>
        </view>
        <view v-else-if="props.mode == 'knowledge' && knowledge" class="flex-center-vertical gap-5 container-knowledge" :style="{
            '--knowledge-width': props.knowledgeWidth,
        }" @click="knowledge = knowledgeStore.Next()">
            <!-- <view>{{ knowledge.dirs[knowledge.dirs.] }}</view> -->
            <view class="knowledge-title">
                {{ knowledge.dirs[knowledge.dirs.length-1] }} · {{ knowledge.title }}
            </view>
            <view>{{ knowledge.content }}</view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from "vue";
    // com
    import knowledgeS from "../../store/knowledge";
    const knowledgeStore = knowledgeS();
    // store

// DATA
    const props = defineProps({
        size: {
            type: String,
            default: "50%"
        },
        mode: {
            type: String,
            default: "text" // knowledge
        },
        loaddingText: {
            type: String,
            default: "Loading"
        },
        knowledgeWidth: {
            type: String,
            default: "80vw"
        }
    })

    const IMG_NUM = 4;  // UPDATE 需要思考一下图片大小和打包之间的处理方式，
    const TIME_OUT = 1000;
    const ANIMATION_TIME = 400; // info 虽然动画是 .5s 但是这样效果挺好的。
    const index = ref(1);
    const ANIMATION_POINT_TIME = 400;
    const pointNum = ref(3);

    let interval, intervalPoint;
    const scale = ref(1);
    const opacity = ref(1);

    const knowledge = ref(null);

// FUNC
    onMounted(async() => {
        // init
        index.value = getRandomNumber();
        interval = setInterval(() => {
            shrinkTransition();
            setTimeout(() => {
                nextImg();
                resetTransition();
            }, ANIMATION_TIME);
        }, TIME_OUT);

        // depent Mode to choose show way.
        if (props.mode === 'text') {
            intervalPoint = setInterval(() => {
                pointNum.value = (pointNum.value + 1) % 4;
            }, ANIMATION_POINT_TIME);
        } else if (props.mode === 'knowledge') {
            knowledge.value = await knowledgeStore.InitKnowledge();
        } else {
            console.error("mode:", props.mode, "is not supported.");
        }
    })
    onUnmounted(() => {
        clearInterval(interval);
        if (intervalPoint) clearInterval(intervalPoint);
        
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

.half-container {
    animation: fadeInBig 1s ease forwards;
    
    gap: 70rpx
}

.image-loadding {
    height: var(--height);
    width: var(--width);
    transition: opacity 0.5s, transform 0.5s;
}

.loadding-text {
    font-weight: bold;
    font-size: 20px;

    transform: translateY(-50px);
}

.container-knowledge {
    width: var(--knowledge-width);
}

.knowledge-title {
    font-weight: bold;
}

@keyframes fadeInBig {
  from {
    opacity: 0;
    scale: .7;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

</style>        