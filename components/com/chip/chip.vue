<!--INFO 因为暂时用不到 原项目 chip 的长按功能，就先使用一个简化的版本就好。-->
<template>
    <view class="flex-center-both basic default"
        @click="click"
        :class="[props.shape]"
        :style="{
            '--bg-color': selectFlag ? props.bgColor : 'transparent',
            '--font-color': selectFlag ? props.color : '#ccc'
    }">
        <slot> <!--放一个 slot，增加灵活性-->
            {{ props.text }}
        </slot>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: [String, Number],
            default: "日常"
        },
        bgColor: {
            type: String,
            default: "#DAE2E6"
        },
        color: {
            type: String,
            default: "#000"
        },
        shape: {
            type: String,
            default: "rectangle"
        },
        // TAG Light
        light: {  // 是否保持常亮 light-hold
            type: Boolean,
            default: false
        },
        lightStart: {   // lightFlag 的初始值； // info 优先级 light > lightSrart
            type: Boolean,
            default: false
        },
    });
    const emits = defineEmits(['select', 'unselect']);

    const selectFlag = ref(props.light | props.lightStart);

// FUNC
    function click() {
        if(props.light)  // 保持常亮
            return;
        
        selectFlag.value = !selectFlag.value;
        
        if (selectFlag.value) {
            emits('select', props.text);
        } else {
            emits('unselect', props.text);
        }
    }

</script>

<style scoped>

.basic {
    padding: 10px;
    height: 30px;

    background-color: var(--bg-color);
    border-radius: 10rpx;

    color: var(--font-color);
    letter-spacing: 1px;    /* 字间距 */
    font-size: 14px;
    line-height: 13px;
    font-family: Alimama ShuHeiTi;

    flex-shrink: 0;
    flex-basis: auto;
    white-space: nowrap;
}

.rectangle {
    padding: 10px;
}

.square {
    padding: 10px 5px;
}

.default {
    border: solid 1px #cccccc;
}


</style>        