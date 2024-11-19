<template>
    <placeHolder height="60"/> <!--下面 fixed，所以这里占位用。-->
    <tabberBase z-index="8" position="fixed" padding="5" :bgColor="color['main-deep']" :bottom="moveHeight">
        <template #prefix>
            <!--TODO 之后扩展为更丰富的菜单-->
            <h-btn 
                variant="text" 
                icon="com-more" 
                :iconSize="CONSTS.ICONSIZE"
                activeColor="transparent"
                btnSizeWhenCircle="40"
                btnWidthWhenCircle="30"
                @click="goto"
            />
        </template>
        <template #midfix>
            <!--update delete focus-->
            <view class="input-container shrink">
                <up-textarea 
                    v-model="inputContent"  
                    :confirmType="null"
                    :show-confirm-bar="false"
                    :adjustPosition="false"
                    :height="inputHeight"
                    :cursorSpacing="20"
                    border="none"
                    fontSize="14"
                    :style="{
                        padding: '3px 7px',
                        backgroundColor: 'transparent',
                        // info 限制最大高度
                        maxHeight: '65px',
                        overflowY: 'scroll'
                    }"
                    @linechange="changeInputHeight"
                    @keyboardheightchange="keyboardChange"
                />
            </view>
        </template>
        <template #suffix>
            <view class="flex-center-horizontal gap-5">
                <h-btn 
                    variant="text" 
                    icon="com-add" 
                    :iconSize="CONSTS.ICONSIZE"
                    activeColor="transparent"
                    btnSizeWhenCircle="40"
                    btnWidthWhenCircle="30"
                />
                <view v-if="inputContent !== ''" class="send-container flex-horizontal gap-5" @touchend.prevent="sendUserMessage">
                    <view v-if="talkStore.loadding" class="loader"/>
                    <text>{{ talkStore.loadding ? "停止" : "发送" }}</text>
                </view>
            </view>
        </template>
    </tabberBase>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import color from "@/css/theme/index.module.scss";
    // com
    import tabberBase from "../com/substrate/tabberBase.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    // store
    import { aiTalk } from "../../store/aiTalk";
    const talkStore = aiTalk();
    // import phoneInfor from "../../store/phoneInfor";
    // const phoneStore = phoneInfor();
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(["sendMessage", "keyBoardChange"]);

    const CONSTS = {
        ICONSIZE: 20,
        InputLineHeight: 25
    }

    const inputContent = ref('');
    const inputHeight = ref(CONSTS.InputLineHeight);
    const moveHeight = ref(0);  // info 监听键盘事件

// FUNC
    const sendUserMessage = () => {
        // info 根据 talkStore.loading 的状态来判断不同的操作
        if(talkStore.loadding) {
            talkStore.stopAiTalk();
        } else {
            emits('sendMessage', inputContent.value);
            inputContent.value = "";
        }
    }

    const keyboardChange = (infor) => {
        console.info("键盘变化", infor); // info
        // emits("keyBoardChange", infor.detail);
        moveHeight.value = infor.detail.height;
    }
    
    const changeInputHeight = (infor) => {
        inputHeight.value = CONSTS.InputLineHeight * infor.detail.lineCount;
    }

    // Router
    function goto() {
        const pageUrl = '/pages/Rag/history';
        uni.navigateTo({ url: pageUrl });
    }

</script>

<style scoped>

.input-container {
    margin: 5px;
    width: 100%;
    
    border-radius: 5px;
    background-color: #f9f9f9;
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
    font-weight: bold;
    font-family: Alimama ShuHeiTi;
}

</style>