<template>
    <view class="flex-vertical talk-container bg-img">
        <topic :text="talkStore.topic" :animation="flag.topic"/>
        <!-- TALK WINDOW -->
        <view class="flex-vertical gap-10 container-dialogue mt-10">
            <intro v-if="talkStore.default" @send="sendUserMessage"/>
            <template v-else v-for="(item, index) in talkStore.history" :key="index">
                <ai-bubble v-if="item.side" 
                    :avatar="talkStore.avatar"
                    :content="item.content"
                    :word-by-word="index === talkStore.lastIndex && talkStore.loading"
                />
                <user-bubble v-else :text="item.text"/>
            </template>
        </view>
        <ai-tarbar/>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";

    // com
    import intro from "./sub/intro.vue";
    import topic from "../../components/rag/topic.vue";
    
    import aiBubble from "../../components/rag/bubble/ai.vue";
    import userBubble from "../../components/rag/bubble/user.vue";

    import aiTarbar from "../../components/rag/tabbar.vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
// DATA
    const flag = reactive({
        topic: Boolean
    })
    
// FUNC
    /**
     * @Brief: 通道函数；发送用户消息 From Intro
     */
    function sendUserMessage(text) {
        talkStore.init(talkStore.CONSTS.KNOWLEDGE);
        talkStore.sendUserMsg(text);
        
        topic_animation();
    }

    function topic_animation() {
        flag.topic = !flag.topic;
    }


</script>

<style scoped>

.talk-container {
    min-height: 90vh;  /** 因为有 tabbar 的关系 */

    background-color: #00000009;
}

.container-dialogue {
    /* min-height: 85vh; */
    overflow-y: scroll;
    /* padding: 5px 10px; */
}

</style>