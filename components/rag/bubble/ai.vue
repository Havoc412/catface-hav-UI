<template>
    <view class="flex-top-horizontal container gap-10">
        <view class="relative">
            <up-image :src="props.avatar" height="40px" width="40px" radius="35px"/>
            <view v-if="props.wordByWord" class="loader"/>
        </view>
        <view class="talk-container wrap">
            <template v-for="(item, index) in props.content" :key="index">
                <span v-if="item.type == 'text'">
                    <span v-if="!props.wordByWord" :class="item.type">{{ item.text }}</span>
                    <word-by-word v-else :classCustom="item.type" :text="item.text"/>
                </span>
                <view v-else-if="item.type == 'doc'">
                    <doc :nodes="item.nodes"/>
                </view>
            </template>
            <!--表示加载中的 ... -->
            <span v-if="props.wordByWord">...</span>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // com
    import wordByWord from "./wbw.vue";
    import doc from "../doc/doc.vue";
    // store
// DATA
    const props = defineProps({
        avatar: {
            type: String,
            default: "/static/dog.jpg"
        },
        content: {
            type: Array,
            default: () => [
                { type: "text", text: "你好呀，两脚兽，有什么我能效劳的吗？" }
            ]
        },
        time: String,
        wordByWord: Boolean
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>
.container {
    justify-content: flex-start;
    padding: 0 10rpx;
}

.text {
    font-weight: 300;
}

.talk-container {
    max-width: calc(100% - 100px);

    padding: 10px 12px;
    background-color: #fff;
    border-radius: 5px 15px 15px 15px;

    font-size: 16px;
    font-family: SourceHanSansCN;
}

/* animation */
.loader {
    position: absolute;
    right: -5px;
    bottom: -5px;

    border: 2px solid #DAE2E6;
    border-top: 3px solid #3DD598;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    animation: spin 2s linear infinite;

    background-color: #fff;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>        