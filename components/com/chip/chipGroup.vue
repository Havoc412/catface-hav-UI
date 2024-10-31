<template>
    <view class="container-chip-group" :class="{'scroll': props.scroll}">
        <template v-for="(item, index) in data" :key="index">
            <view class="item">
                <h-chip
                    :text="item" :light="editableMode" :hidden="index == longPressIndex"
                    @select="" 
                    @unselect=""
                    @doubleClick="deleteText"
                    @longpress="(touched) => longpress(touched, item, index)"
                />
            </view>
        </template>
        <chipEditable v-if="editableMode && data.length < props.maxNum" light @textFinish="addText"/>
        <view v-if="infoIcon" class="flex-center-both" @click="emits('info')">
            <h-icon name="tool-info" size="17"/>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";

    import chipEditable from "./variant/chip-editable.vue";
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: "default" // default || editable
        },
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
        infoIcon: Boolean
    });
    const emits = defineEmits(['info', 'change', 'longpress']);

    const data = ref(props.list);
    const longPressIndex = ref(-1); // INFO 因为一次只允许拖动一个，所以用一个 id 来标记目标就比较方便。

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
        data.value.push(text);
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