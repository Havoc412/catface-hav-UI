<template>
    <view class="container-chip-group" :class="{'scroll': props.scroll}">
        <template v-for="(item, index) in data" :key="index">
            <view class="item">
                <h-chip :text="item" :light="editableMode" @select="" @unselect=""/>
            </view>
        </template>
        <chipEditable v-if="editableMode && data.length < props.maxNum" light @textFinish="addText"/>
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
        maxNum: {
            type: Number,
            default: 3
        }
    });
    const emits = defineEmits([]);

    const data = ref(props.list);

// FUNC
    const editableMode = computed(() => {
        return props.mode === 'editable';
    });

    function addText(text) {
        if (data.value.includes(text))
            return;
        data.value.push(text);
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