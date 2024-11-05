<template>
    <view class="container-chip-group" :class="{'scroll': props.scroll}">
        <chipEditable v-if="editableMode && data.length < props.maxNum && props.ediPosMode == 'prefix'" 
            light 
            :mode="props.ediMode"
            :styleMode="props.ediStyleMode" 
            :placeholder="props.placeholder"
            :focus="props.ediFocus"
            :pretext="ediChipPreText"
            @textFinish="addText"
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
        />
        <view v-if="infoIcon" class="flex-center-both" @click="clickInfo">
            <h-icon name="tool-info" size="17"/>
        </view>
    </view>
    <up-overlay opacity=".1" :show="flag.info" @click="flag.info = false">
        <blockBase>
            <slot name="info">
                别名最多3个，每个别名最多10个字。<br/>
                双击标签即可删除。
            </slot>
        </blockBase>
    </up-overlay>
</template>

<script setup>
    import { ref, computed, reactive } from "vue";

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
    const emits = defineEmits(['info', 'change', 'longpress']);

    const data = ref(props.list);
    const longPressIndex = ref(-1); // INFO 因为一次只允许拖动一个，所以用一个 id 来标记目标就比较方便。

    const flag = reactive({
        info: false,
    })

// FUNC
    const editableMode = computed(() => {
        return props.mode === 'editable';
    });

    function addText(text) {
        if (data.value.includes(text))
            return;
        else if (text.length >= props.maxSingleLen) {
            // TODO 前端展示“超过10字，无效”
            return;            
        }
        data.value.push((props.topicMode ? '# ' : '') + text);
        // Send to Top
        emits('change', data.value);
    }

    function deleteText(text) {
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
    width: 100%;    /* mark 块级元素 */
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