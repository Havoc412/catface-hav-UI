<template>
    <placeHolder :height="placeHolderHeight.toString()"/> <!--下面 fixed，所以这里占位用。-->
    <tabberBase z-index="7" position="fixed" padding="2px 10px" :bgColor="color['main-deep']" :bottom="moveHeight">
        <template #prefix>
            <!--TODO 之后扩展为更丰富的菜单-->
            <h-btn 
                variant="text" 
                icon="com-more" 
                :iconSize="CONSTS.ICONSIZE"
                activeColor="transparent"
                btnSizeWhenCircle="40"
                btnWidthWhenCircle="25"
                @click="goto"
            />
        </template>
        <template #midfix>
            <!--update delete focus-->
            <view class="input-container">
                <up-textarea 
                    v-model="inputContent"
                    fixed
                    :height="inputHeight"
                    :show-confirm-bar="false"
                    :adjustPosition="false"
                    :cursorSpacing="20"
                    :maxlength="100"
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
            <view class="flex-center-horizontal">
                <h-btn 
                    variant="text" 
                    icon="com-add" 
                    :iconSize="CONSTS.ICONSIZE"
                    activeColor="transparent"
                    btnSizeWhenCircle="40"
                    btnWidthWhenCircle="40"
                />
                <view v-if="inputContent !== '' || talkStore.loadding" class="send-container flex-horizontal gap-5" @touchend.prevent="sendUserMessage">
                    <view v-if="talkStore.loadding" class="loader"/>
                    <text>{{ talkStore.loadding ? "停止" : "发送" }}</text>
                </view>
                <!--右上角的扩展按钮-->
                <view v-if="inputHeight >= CONSTS.InputMaxHeight" class="absolute z-9" style="right: 10px; top: 0;">
                    <h-btn variant="text" activeColor="#ffffff10" icon="arrow-up_light" @click="flag.fullTextArea = true"/>
                </view>
            </view>
        </template>
    </tabberBase>
    <!--INFO 全屏 键盘弹出，底部固定。-->
    <fullTextArea v-if="flag.fullTextArea"
        v-model:input="inputContent"
        @close="flag.fullTextArea = false"
        @sendMessage="sendUserMessageFromFullTextArea"
    />
</template>

<script setup>
    import { ref, reactive, computed, watch, onMounted } from "vue";

    import color from "@/css/theme/index.module.scss";
    // com
    import tabberBase from "../com/substrate/tabberBase.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import fullTextArea from "./fullTextArea.vue";
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
        InputLineHeight: 20,
        InputMaxHeight: 90
    }

    const flag = reactive({
        fullTextArea: false,
    })

    const inputContent = ref("在此输入"); // 随便写一些；// UPDATE 临时解决方案。或许改他源码，调它函数会更好。
    const inputHeight = ref(CONSTS.InputLineHeight);
    const moveHeight = ref(0);  // info 监听键盘事件

// FUNC
    onMounted(() => {
        inputContent.value = "";  // TIP wx 实机中 textarea 组件有bug，靠这句实现清空，然后就正常了；// INFO 错误的，需要前后配合，触发他的 watch。
    })

    const sendUserMessage = () => {
        // info 根据 talkStore.loading 的状态来判断不同的操作
        if(talkStore.loadding) {
            talkStore.stopAiTalk();
        } else {
            emits('sendMessage', inputContent.value);
            inputContent.value = "";
        }
    }

    function sendUserMessageFromFullTextArea() {
        flag.fullTextArea = false;
        sendUserMessage();
    }

    // Style && keyboard

    const keyboardChange = (infor) => {
        console.info("键盘变化", infor); // info
        // emits("keyBoardChange", infor.detail);
        moveHeight.value = infor.detail.height;
    }
    
    const changeInputHeight = (infor) => {
        inputHeight.value = Math.min(CONSTS.InputLineHeight * infor.detail.lineCount, CONSTS.InputMaxHeight);
    }

    watch(() => inputHeight.value, (newVal, oldVal) => {
        if (newVal > oldVal) {
            emits("keyBoardChange");
        }
    });

    const placeHolderHeight = computed(() => {
        return 40 + moveHeight.value + inputHeight.value;
    })

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

    transition: width 0.5s; /** BUG 好像无效。 */
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