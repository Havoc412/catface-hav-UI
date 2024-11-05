<template>
    <h-chip 
        :light="props.light" 
        :styleMode="props.styleMode"
        @click="inputFlag = true"
    >
        <view class="flex-center-both container"
            :style="{
                '--width': inputWidth,
                '--min-width': minWidth
            }"
        >
            <h-icon v-if="!inputFlag && props.mode=='icon'" name="com-plus_thin" size="16"/>
            <view v-else class="block flex-center-both">
                <span v-if="props.pretext" class="pretext">{{props.pretext}}</span>
                <input
                    class="input"
                    :focus="props.focus"
                    :value="inputValue"
                    :placeholder="props.mode == 'text' ? props.placeholder : ''"
                    @input="handleInput"
                    @blur="handleBlur"
                />
            </view>
        </view>
    </h-chip>
</template>

<script setup>
    import { ref, computed, watch } from "vue";

    // store
// DATA
    const props = defineProps({
        light: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: 'icon' // text ;
        },
        placeholder: {
            type: String,
            default: "输入"
        },
        styleMode: {
            type: String,
            default: "full"
        },
        clearTrigger: { // info 通过反转来触发 clear；
            type: Boolean,
            default: false
        },
        uneditable: {
            type: Boolean
        },
        inputValue: String,  // question ?
        focus: {
            type: Boolean,
            default: true
        },
        pretext: {  // 固定在输入框前面的文本；
            type: String,
            default: ""
        }
    });
    const emits = defineEmits(['textFinish']);
    const inputValue = ref("");

    // flag
    const inputFlag = ref(false);
    
// FUNC
    const inputWidth = computed(() => {
        return ((props.pretext.length + inputValue.value.length) * 15).toString() + 'px';
    })

    watch(() => props.clearTrigger, clear);

    // info 配合单选 从外部设定 input-value
    watch(() => props.inputValue, () => {
        inputFlag.value = true;
        inputValue.value = props.inputValue;    // info 防止触发失焦清空
    })

    function clear() {
        inputValue.value = "";
        inputFlag.value = false;
    }

    // tag real
    const handleInput = (event) => {
        inputValue.value = event.detail.value;
    }
    const handleBlur = () => {
        if(inputValue.value == "")
            inputFlag.value = false;  // INFO 原本 ICON 模式的自消除实现方式，就是简单的直接依靠 两个组件的替换渲染。
        else {
            emits("textFinish", inputValue.value);
            clear();
        }
    }

    // Style
    const minWidth = computed(() => {  // TIP 使用最小宽度来适配 placeholder 的长度。
        return ((props.pretext.length + props.placeholder.length) * 12).toString() + 'px';
    })

</script>

<style scoped>

.container {
    min-width: var(--min-width);
    width: var(--width);
    transition: width .2s ease; /* bug 输入时有一定的抖动，em... */
}

.input {
    font-size: 14px;
}

.pretext {
    white-space: pre;
}

</style>        