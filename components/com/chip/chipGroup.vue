<template>
    <view class="container-chip-group" :class="{'scroll': props.scroll}" :style="{
        '--container-width': props.containerWidthPrecent + '%',
    }">
        <chipEditable v-if="editableMode && data.length < props.maxNum && props.ediPosMode == 'prefix'" 
            light 
            :mode="props.ediMode"
            :styleMode="props.ediStyleMode" 
            :placeholder="props.placeholder"
            :focus="props.ediFocus"
            :pretext="ediChipPreText"
            @textFinish="addText"
            @focus="emits('focus')"
            @blur="emits('blur')"
        />
        <template v-for="(item, index) in data" :key="index">
            <view class="item">
                <h-chip
                    :text="item" 
                    :light="editableMode" 
                    :hidden="index == longPressIndex"
                    :styleMode="props.styleMode"
                    @select="" 
                    @unselect=""
                    @doubleClick="deleteText"
                    @longpress="(touched) => longpress(touched, item, index)"
                />
            </view>
        </template>
        <chipEditable v-if="editableMode && data.length < props.maxNum && props.ediPosMode == 'suffix'" 
            light 
            :mode="props.ediMode"
            :styleMode="props.ediStyleMode" 
            :placeholder="props.placeholder"
            :focus="props.ediFocus"
            :pretext="ediChipPreText"
            @textFinish="addText"
            @focus="emits('focus')"
            @blur="emits('blur')"
        />
        <view v-if="infoIcon" class="flex-center-both" @click="clickInfo">
            <h-icon name="tool-info" size="17"/>
        </view>
    </view>
    <up-overlay opacity=".1" :show="flag.info" @click="flag.info = false">
        <blockBase>
            <slot name="info">
                这里输出 INFO 信息。
            </slot>
        </blockBase>
    </up-overlay>
</template>

<script setup>
    import { ref, onMounted, computed, reactive, watch } from "vue";

    import { TOAST } from "../../../utils/notice";
    // com
    import chipEditable from "./variant/chip-editable.vue";
    import blockBase from "../substrate/blockBase.vue";
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: "default" // default || editable
        },
        ediPosMode: {
            type: String,
            default: "suffix" // prefix 放置在前或者后
        },
        ediMode: {
            type: String,
            default: 'icon'
        },
        placeholder: {
            type: String,
            default: "输入"
        },
        // TAG group 属性；
        list: {
            type: Array,
            default: () => []
        },
        scroll: {   // 是否启用长轴滚动。
            type: Boolean,
            default: false
        },
        maxNum: {  // 超过就不会展示 editChip 这个组件；
            type: Number,
            default: 3
        },
        maxSingleLen: { // 每个标签的最大长度；由 addText(text) 判断 text 的长度；
            type: Number,
            default: 10
        },
        containerWidthPrecent: {  // 由于自动换行的效果需要限定宽度，但是直接设为 100% 不适配所有情况，
            type: [String, Number],
            default: "100"
        },
        // TAG 前后两种 chip 的样式风格，
        ediStyleMode: {
            type: String,
            default: "full"
        },
        styleMode: {
            type: String,
            default: "full"
        },
        ediFocus: {
            type: Boolean,
            default: true
        },
        // TAG special
        infoIcon: Boolean, // 是否显示 INFO icon
        topicMode: Boolean,  // 控制 edi addText 之后，增加一个  [# ] 的前缀；同时改变 ediChip 的样式。
    });
    const emits = defineEmits(['info', 'change', 'longpress', 'focus', 'blur']);
    
    const data = ref([]);
    const longPressIndex = ref(-1); // INFO 因为一次只允许拖动一个，所以用一个 id 来标记目标就比较方便。

    const flag = reactive({
        info: false,
    })

// FUNC
    onMounted(() => {
        setDataFromList();
    })
    watch(() => props.list, setDataFromList);  // UPDATE 这两个函数如何结合一下？

    // 根据 【props.topicMode】来控制文本的前缀。
    function setDataFromList() {
        if (props.topicMode) {
            data.value = props.list.map((item) => '# ' + item);
        } else {
            data.value = props.list;            
        }
    }

    const editableMode = computed(() => {
        return props.mode === 'editable';
    });

    function addText(text) {
        if (!props.topicMode && data.value.includes(text) 
            || props.topicMode && data.value.includes('# ' + item)) {
            TOAST('标签重复', 'none', 2000);
            return;
        }
        else if (text.length > props.maxSingleLen) {
            TOAST('标签长度超出限制', 'none', 2000);
            return;            
        }
        if (props.topicMode)
            text = '# ' + text;
        data.value.push(text);
        // Send to Top
        emits('change', data.value);
    }

    function deleteText(text) {
        if (props.mode != 'editable') return;
        data.value = data.value.filter((item) => item != text);
        emits('change', data.value);
    }

    function longpress(touched, text, index) {
        longPressIndex.value = index;
        emits('longpress', touched, text);
    }

    function clickInfo() {
        flag.info = true;
        emits('info');
    }

    // Style
    const ediChipPreText = computed(() => {
        return props.topicMode ? '# ' : ''
    })

</script>

<style scoped>

.container-chip-group {
    width: var(--container-width);
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

.scroll {
    flex-wrap: nowrap;
    overflow-x: auto;
}

.item {
    flex-shrink: 0; /* 防止子控件缩放 */
}

</style>        