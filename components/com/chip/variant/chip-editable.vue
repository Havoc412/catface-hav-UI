<template>
    <h-chip 
        :light="props.light" 
        :styleMode="props.styleMode"
        @click="inputFlag = true"
    >
        <view class="flex-center-both container"
            :style="{
                '--width': inputWidth
            }"
        >
            <h-icon v-if="!inputFlag && props.mode=='icon'" name="com-plus_thin" size="16"/>
            <input v-else 
                class="input"
                :focus="props.focus"
                :value="props.inputValue"
                :placeholder="props.mode == 'text' ? props.placeholder : ''"
                @input="handleInput"
                @blur="handleBlur"
            />
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
        clearTrigger: { // info 通过反转来触发 clear
            type: Boolean,
            default: false
        },
        uneditable: {
            type: Boolean
        },
        inputValue: String,
        focus: {
            type: Boolean,
            default: true
        },
    });
    const emits = defineEmits(['textFinish']);
    const inputValue = ref("");

    // flag
    const inputFlag = ref(false);
    
// FUNC
    const inputWidth = computed(() => {
        // console.info(inputValue.value.length * 15);
        return (inputValue.value.length * 15).toString() + 'px';
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
            inputFlag.value = false;
        else {
            emits("textFinish", inputValue.value);
            clear();
        }
            
    }

</script>

<style scoped>

.container {
    min-width: 30px;
    width: var(--width);
    transition: width .2s ease; /* bug 输入时有一定的抖动，em... */
}

.input {
    font-size: 14px;
}

</style>        