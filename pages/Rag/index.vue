<template>
    <view class="flex-vertical talk-container bg-img">
        <view class="flex-center-both topic">{{ talkStore.topic }}</view>
        <!-- TALK WINDOW -->
        <view class="flex-vertical gap-10 container-dialogue">
            <template v-for="(item, index) in talkStore.history" :key="index">
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
    import { ref } from "vue";
    // com
    import aiBubble from "../../components/rag/bubble/ai.vue";
    import userBubble from "../../components/rag/bubble/user.vue";

    import aiTarbar from "../../components/rag/tarbar.vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
// DATA

// FUNC

</script>

<style scoped>

.talk-container {
    min-height: 100vh;

    background-color: #00000009;
}

.container-dialogue {
    /* min-height: 85vh; */
    overflow-y: scroll;
    /* padding: 5px 10px; */
}

.topic {
    position: sticky;
    top: 10rpx;

    font-family: Alimama ShuHeiTi;

    background-color: #ffffff;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, .3);
    border-radius: 100rpx;

    margin: 20rpx 250rpx;
    padding: 3rpx 0;
}

</style>