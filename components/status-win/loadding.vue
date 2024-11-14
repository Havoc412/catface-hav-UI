<template>
    <view class="flex-center-vertical half-container">
        <!-- image -->
        <loadingCatNecklace v-if="props.imgMode == 'necklace'" :size="props.size"/>
        <loadingCatSingle v-else="props.imgMode == 'single'" :size="props.size"/> <!--这里先占位，作为 default 的效果-->
        <!-- TAG text -->
        <view v-if="props.textMode == 'text'" class="flex-center-both loadding-text">
            {{ props.loaddingText }}
            <template v-for="index in 3">
                <span v-show="pointNum >= index">.</span>
            </template>
        </view>
        <view v-else-if="props.textMode == 'knowledge' && knowledge" class="flex-center-vertical gap-5 container-knowledge" :style="{
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
    import { ref, onMounted, onUnmounted } from "vue";
    // com
    import loadingCatSingle from "./sub-loadding-cat/loading-cat-single.vue";
    import loadingCatNecklace from "./sub-loadding-cat/loading-cat-necklace.vue";
    // store
    import knowledgeS from "../../store/knowledge";
    const knowledgeStore = knowledgeS();

// DATA
    const props = defineProps({
        // image
        imgMode: {
            type: String,
            default: "single" // necklace
        },
        size: {
            type: String,
            default: "50%" // INFO single 推荐 %； necklace 推荐 px；
        },
        // TAG text
        textMode: {
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

    let intervalPoint;
    const ANIMATION_POINT_TIME = 400;
    const pointNum = ref(3);
    
    const knowledge = ref(null);

// FUNC
    onMounted(async() => {
        // depent Mode to choose show way.
        if (props.textMode === 'text') {
            intervalPoint = setInterval(() => {
                pointNum.value = (pointNum.value + 1) % 4;
            }, ANIMATION_POINT_TIME);
        } else if (props.textMode === 'knowledge') {
            knowledge.value = await knowledgeStore.InitKnowledge();
        } else {
            console.error("mode:", props.textMode, "is not supported.");
        }
    })
    onUnmounted(() => {
        if (intervalPoint) clearInterval(intervalPoint);
    })

</script>

<style scoped>

.half-container {
    animation: fadeInBig 1s ease forwards;
    
    gap: 70rpx
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

</style>        