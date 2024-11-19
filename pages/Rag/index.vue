<template>
    <view class="flex-vertical talk-container bg-img">
        <topic :text="talkStore.topic" :animation="flag.topic"/>
        <!-- TALK WINDOW -->
        <view class="flex-vertical gap-10 container-dialogue mt-10">
            <intro v-if="talkStore.default" @send="InitTalk"/>
            <template v-else v-for="(item, index) in talkStore.history" :key="index">
                <ai-bubble v-if="item.side" 
                    :avatar="talkStore.avatar"
                    :content="item.content"
                    :word-by-word="index === talkStore.lastIndex && talkStore.loadding"
                    @addMessage="gotoPageEnd"
                />
                <user-bubble v-else :text="item.text"/>
            </template>
            <!-- <view :style="{
                height: keyboardHeight.toString() + 'px'
            }"/> -->
        </view>
        <!--稍微高一些，更好的阅读效果。-->
        <ai-tabbar @send-message="sendUserMessage"/>  <!--TODO 这里需要获取信息 @key-board-change="handleKeyBoard"-->
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, nextTick, watch } from "vue";

    // com
    import intro from "./sub/intro.vue";
    import topic from "../../components/rag/topic.vue";
    
    import aiBubble from "../../components/rag/bubble/ai.vue";
    import userBubble from "../../components/rag/bubble/user.vue";

    import aiTabbar from "../../components/rag/tabbar.vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
// DATA
    const flag = reactive({
        topic: false
    })
    // animation
    // const keyboardHeight = ref(0);
    
// FUNC
    const gotoPageEnd = (time = 100) => {
        nextTick(() => {
            uni.pageScrollTo({ scrollTop: 99999, duration: time });
        });
    }

    onMounted(() => {
        gotoPageEnd(0);
    })
    // INFO 方案一：性能开销有些太大了。
    // watch(() => talkStore.history, () => {  // 只有一开始添加数据的时候会监听到变化。
    //     // todo 增加关于 滑动范围的判定。
    //     console.debug("talkStore.history changed.")
    //     gotoPageEnd(100);
    // }, { deep: true })
    
    // TAG Core Code

    function sendUserMessage(text) {
        talkStore.sendUserMsg(text);
        gotoPageEnd(200);
    }
    
    /**
     * @Brief: 通道函数；发送用户消息 From Intro
     */
    function InitTalk(text) {
        topic_animation();
        talkStore.init(talkStore.CONSTS.KNOWLEDGE);

        sendUserMessage(text);
    }

    // TAG animation
    function topic_animation() {
        flag.topic = !flag.topic;
    }

    // const handleKeyBoard = (infor) => {
    //     keyboardHeight.value = infor.height;
    //     gotoPageEnd(100);
    // }

</script>

<style scoped>

.talk-container {
    min-height: 100vh;
    background-color: #00000009;
}

.container-dialogue {
    overflow-y: scroll;
}

</style>