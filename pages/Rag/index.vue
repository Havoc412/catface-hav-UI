<template>
    <view class="flex-vertical talk-container bg-img">
        <topic :text="talkStore.topic" :animation="flag.topic"/>
        <!-- TALK WINDOW -->
        <view class="flex-vertical gap-10 container-dialogue mt-10"
            @touchstart="handleTouchStart" 
            @touchmove="handleTouchMove" 
            @touchend="handleTouchEnd"
            >
            <intro v-if="flag.intro" @send="InitTalkFromIntro"/>
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
        <ai-tabbar @send-message="sendUserMessage" @keyBoardChange="gotoPageEnd(0)"/>  <!--TODO 这里需要获取信息 @key-board-change="handleKeyBoard"-->
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, nextTick, watch, onUnmounted } from "vue";
	import { onReachBottom, onLoad } from '@dcloudio/uni-app'

    // com
    import intro from "./sub/intro.vue";
    import topic from "../../components/rag/topic.vue";
    
    import aiBubble from "../../components/rag/bubble/ai.vue";
    import userBubble from "../../components/rag/bubble/user.vue";

    import aiTabbar from "../../components/rag/tabbar.vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
    import { AITALK_MODE } from "../../store/aiTalk";
    
// DATA
    const CONSTS = {
        PAGEMOVE_STOP_THRESHOLD: 10,
    }
    const flag = reactive({
        topic: false,
        intro: true,
        pageMove: true,
    })
    const vars = {
        touchStartY: 0,
    }
    // animation
    
// FUNC
    /**
     * @brief: 页面加载时，设置对话模式。
     */
    onLoad((params) => {
        const mode = params.mode;
        let data = null;
        // STAGE 1. params
        switch (mode) {
            case AITALK_MODE.ANM_DIARY:
                const id = params.id; // TODO 如果获取复数目标？
                data = {
                    ids: [id],
                    name: params.name
                }
                break;
            case AITALK_MODE.TASK: // TODO 提供一些基本信息。
            case AITALK_MODE.DETECT_CAT:
            case AITALK_MODE.KNOWLEDGE:
            case AITALK_MODE.DEFAULT:
                break;
            default:
                break;
        }
        // mode 或许是 null，或者其他乱七八糟的 string，下面处理都通用。
        // STAGE 2. init
        if (AITALK_MODE[mode] != '')
            talkStore.init(mode, data);
        // STAGE 3. intro
        if (mode != null && mode != AITALK_MODE.DEFAULT) {
            flag.intro = false;
            topic_animation();
        }
    })

    const gotoPageEnd = (time = 100) => {
        if (flag.pageMove)
            nextTick(() => {
                uni.pageScrollTo({ scrollTop: 99999, duration: time });
            });
    }

    onMounted(() => {
        gotoPageEnd(0); // 适用于有历史对话之时。
    })
    // INFO 方案一：性能开销有些太大了；换方案二，子组件发送事件。
    // watch(() => talkStore.history, () => {  // 只有一开始添加数据的时候会监听到变化。
    //     // todo 增加关于 滑动范围的判定。
    //     console.debug("talkStore.history changed.")
    //     gotoPageEnd(100);
    // }, { deep: true })
    
    // TAG Core Code

    function sendUserMessage(text) {
        if (flag.intro)
            flag.intro = false;
        flag.pageMove = true;  // 发送消息时一定滚动到最后。
        talkStore.sendUserMsg(text);
        gotoPageEnd(200);
    }
    
    /**
     * @Brief: 通道函数；发送用户消息 From Intro
     */
    function InitTalkFromIntro(text) {
        topic_animation();
        talkStore.init(AITALK_MODE.KNOWLEDGE);

        sendUserMessage(text);
    }

    // TAG Drag Handler：控制 gotoPageEnd 的触发。
    function handleTouchStart(event) {
        flag.pageMove = false;
        vars.touchStartY = event.changedTouches[0].pageY;
        event.stopPropagation();
    }
    function handleTouchMove(event) {
        event.stopPropagation();
        // if (touchMoveY - vars.touchStartY > CONSTS.PAGEMOVE_STOP_THRESHOLD)
        //     flag.pageMove = false;
    };
    function handleTouchEnd(event) {
        const touchMoveY = event.changedTouches[0].pageY;
        if (touchMoveY - vars.touchStartY > CONSTS.PAGEMOVE_STOP_THRESHOLD)
            return;
        flag.pageMove = true;
    }

    onReachBottom(() => {
        flag.pageMove = true;
    })

    // TAG animation
    function topic_animation() {
        flag.topic = !flag.topic;
    }
    
    // 清空会话记录 && 释放连接。
    onUnmounted(() => {
        talkStore.releaseMessage();
    })
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