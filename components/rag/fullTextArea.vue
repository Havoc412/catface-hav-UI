<template>
    <view>
        <view class="container-textarea flex-vertical z-9" :style="{
            '--top': state.top + 'px',
            '--height': state.areaHeight + 'px',
        }" @touchmove.prevent>
            <view class="flex-center-horizontal container-top-tools">
                <view>
                    {{ inputValue.length }}/{{ CONSTS.MAX_LENGTH }}
                </view>
                <view class="shrink"/>
                <h-btn variant="tonal" icon="arrow-down_thin_x" @click="emits('close')"/>
            </view>
            <up-textarea
                v-model="inputValue"
                focus
                fixed
                :height="state.areaHeight"
                :adjustPosition="false"
                :show-confirm-bar="false"
                :maxlength="CONSTS.MAX_LENGTH"
                holdKeyboard
                count
                border="none"
                @keyboardheightchange="keyboardChange2"
            />
        </view>
        <tabberBase zIndex="9" position="fixed" padding="2px 10px 2px 0" animationFadeInFromHalf
            :bgColor="color['main-deep']" :bottom="state.keyboardHeight">
            <template #prefix>
                <view class="flex-center-horizontal">
                    <h-btn 
                        variant="text" 
                        icon="com-more" 
                        :iconSize="CONSTS.ICONSIZE"
                        activeColor="transparent"
                        btnSizeWhenCircle="40"
                    />
                    <h-btn 
                        variant="text" 
                        icon="com-add" 
                        :iconSize="CONSTS.ICONSIZE"
                        activeColor="transparent"
                        btnSizeWhenCircle="40"
                    />
                </view>
            </template>
            <template #suffix>
                <view class="send-container" @click="emits('sendMessage')"><text>发送</text></view>
            </template>
        </tabberBase>
    </view>
</template>

<script setup>
    import { reactive, ref, onMounted } from "vue";

    import color from "@/css/theme/index.module.scss";
    // com
    import tabberBase from "../com/substrate/tabberBase.vue";
    // store
	import usePhoneInforStore from "@/store/phoneInfor";
	const phoneInforStore = usePhoneInforStore();
// DATA
    const inputValue = defineModel('input');  // TIP
    const props = defineProps({
    });
    const emits = defineEmits(['close', 'sendMessage']);

    const CONSTS = {
        ICONSIZE: 20,
        MAX_LENGTH: 100,
    }

    const state = reactive({
        top: phoneInforStore.phoneHeight,
        keyboardHeight: 0,
        areaHeight: phoneInforStore.phoneHeight,
    })

// FUNC
    onMounted(() => {
        state.top =  0;
    })
    
    // keyboard
    function keyboardChange2(event) {  // 依旧在触发外部的 keycoard ？！
        console.info("keyboardHeightChange - 2!!!", event)
        state.keyboardHeight = event.detail.height;
        state.areaHeight = phoneInforStore.phoneHeight - state.keyboardHeight;
    }

</script>

<style scoped>

.container-textarea {
    position: fixed;
    top: var(--top);
    
    height: var(--height);
    width: 100%;
    padding: 0 10px;

    background-color: #fff;
    border-radius: 20px 20px 0 0;

    transition: top 0.5s ease;
}

.container-top-tools {
    padding-top: 10px;
}

.send-container {
    border-radius: 10px;
    background-color: #7eb6ad;
    padding:  5px 7px;
    margin-bottom: 6px; /* 手动调整高度。 */

    color: #fff;
    font-size: 15px;
    font-weight: bold;
    font-family: Alimama ShuHeiTi;
}


</style>        