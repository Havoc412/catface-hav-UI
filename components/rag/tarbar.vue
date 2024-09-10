<template>
    <view class="flex-center-both block tarbar-contain gap-5">
        <fr-icon-voice theme="outline" :size="consts.iconSize" :fill="['#000000']" />
        <view class="input-container shrink">
            <u--textarea 
                v-model="inputContent" auto-height
                :confirmType="null"
                :cursorSpacing="20"
                border="none" fontSize="14"
                :style="{
                    // padding: '3px 7px',
                    backgroundColor: 'transparent',
                    // info 限制最大高度
                    maxHeight: '65px',
                    overflowY: 'scroll'
                }"
            />
            <!--
                
                @keyboardheightchange="keyboardChange"
            -->
        </view>
        <fr-icon-tips theme="outline" :size="consts.iconSize" :fill="['#000000']" />
        <view v-if="inputContent !== ''" class="send-container flex-horizontal gap-5" @touchend.prevent="sendUserMessage">
            <view v-if="talkStore.loading" class="loader"/>
            <text>{{ talkStore.loading ? "停止" : "发送" }}</text>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

    const consts = reactive({
        'iconSize': 40
    })

    const inputContent = ref('');

// FUNC
    const sendUserMessage = () => {
        // info 根据 talkStore.loading 的状态来判断不同的操作
        if(talkStore.loading) {
            talkStore.stopAiTalk();
        } else {
            talkStore.sendUserMsg(inputContent.value);
            inputContent.value = "";
        }
    }


</script>

<style scoped>
.tarbar-contain {
    position: fixed;
    bottom: 60rpx;

    background-color: #e8f3f1;
    padding:5rpx 10rpx;
}

.input-container {
    width: 100%;
    margin: 3px;

    border-radius: 15px;
    background-color: #f9f9f9;

    max-height: 65px;
    overflow-y: hidden;
}

.loader {
  border: 3px solid #ffffff6b; /* 浅灰色背景 */
  border-top: 3px solid #ffffff; /* 蓝色 */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.send-container {
    border-radius: 10px;
    background-color: #7eb6ad;
    padding:  5px 7px;

    color: #fff;
    font-size: 15px;
    font-family: Alimama ShuHeiTi;
}

</style>