<template>
    <view class="flex-center-both block tarbar-contain gap-10" :style="{
        '--bottom': vars.bottom + 'px'
    }">
        <h-icon name="com-more" :size="consts.iconSize" @click="goto"/> <!--TODO 之后扩展为更丰富的菜单-->
        <view class="input-container shrink">
            <u--textarea 
                v-model="inputContent" auto-height
                :confirmType="null"
                :cursorSpacing="20"
                :showConfirmBar="false"
                border="none" fontSize="14"
                :style="{
                    // padding: '3px 7px',
                    backgroundColor: 'transparent',
                    // info 限制最大高度
                    maxHeight: '65px',
                    overflowY: 'scroll'
                }"
            />
            <!--todo
                :adjustPosition="false"
                wx 好像不兼容，可能是 name 的问题。
                @keyboardheightchange="keyboardChange"
            -->
        </view>
        <h-icon name="com-add" :size="consts.iconSize"/>
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
    // import phoneInfor from "../../store/phoneInfor";
    // const phoneStore = phoneInfor();
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

    const consts = reactive({
        iconSize: 22,
        bottom: 30
    })

    const inputContent = ref('');
    const vars = reactive({
        bottom: 0
    })

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

    const keyboardChange = (infor) => {
        console.info("键盘变化", infor); // info
        // emits("keyBoardChange", infor.detail);
        // moveHeight.value = infor.detail.height;
        if(vars.bottom > consts.bottom)
            vars.bottom = consts.bottom;
        else
            vars.bottom = infor.detail.height; // * phoneStore.singlePx;
        console.debug(vars.bottom);
    }

    function goto() {
        const pageUrl = '/pages/Rag/history';
        uni.navigateTo({ url: pageUrl });
    }

    

</script>

<style lang="scss" scoped>
@import "/css/theme/index.module.scss";

.tarbar-contain {
    position: fixed;
    bottom: var(--bottom);
    transition: bottom .1s;


    background-color: $h-bg-deep;
    border-radius: 10px 10px 0 0;
    padding: 5px 15px;
}

.input-container {
    width: 100%;
    margin: 5px;

    border-radius: 5px;
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