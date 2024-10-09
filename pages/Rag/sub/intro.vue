<template>
    <view class="flex-center-vertical gap-10">
        <up-image src="/static/dog.jpg" 
            :height="consts.size" :width="consts.size" shape="circle"
        />
        <view class="flex-center-vertical container-intro gap-5">
            <span>Hello，我是小护！</span>
            <span>一只建立于大模型的对话型机器人。</span>
            <placeHolder height="10"/>
            <span>我的职责就是辅助两脚兽翻阅整理各种猫狗相关的科普，以及校内猫猫前辈的资料。</span>
        </view>
        <placeHolder height="10"/>
        <view class="flex-top-vertical gap-10 container-recommand shrink">
            <template v-for="(item, index) in data.question">
                <!--TODO 点击后进入对话，发送消息。-->
                <view class="block-recommand" @click="emits('send', item.text)">
                    {{ item.text }}
                </view>
            </template>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import placeHolder from "../../../components/com/sub-tabbar/placeHolder.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['send']);

    const consts = reactive({
        size: '300rpx'
    })

    const data = reactive({  // TODO 通过 API 调取
        question: [
            { text: '校内遇到幼猫该怎么办？' },
            { text: '猫猫有哪些不能食用的人类食物？' },
            { text: '猫藓是什么，需要注意哪些问题？' },
            { text: '简单说明一下猫猫口炎的问题。' },
        ]
    })

// FUNC

</script>

<style scoped>

.container-intro {
    margin: 0 80rpx;
    font-family: Alimama ShuHeiTi;
}

.container-recommand {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    margin: 0 80rpx;
}

.block-recommand {
    height: 250rpx;
    padding: 15px;

    background-color: #FFFFFFA0;
    border-radius: 10px;
}

</style>        