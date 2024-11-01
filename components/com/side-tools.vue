<!--目前来看还是比较专用。 By Book/index -->
<template>
    <view v-show="flag" class="container-btn flex-center-both" :style="{
        '--bg-color': props.bgColor,
        '--right': props.right + 'rpx',
        '--bottom': props.bottom + 'rpx',
    }" @click="emits('add')">
        <h-icon name="com-plus_m" size="20"/>
    </view>
</template>

<script setup>
    import { ref, computed, watch } from "vue";
	import { onPageScroll } from '@dcloudio/uni-app'

    // store
    
// DATA
    const props = defineProps({
        // func
        loadStatus: {  // 外部数据加载状态。
            type: String,
            default: 'loading'
        },
        mustReadAll: Boolean, // 要求阅读全部，然后才显示。
        // Style
        right: {
            type: [String, Number],
            default: 20
        },
        bottom: {
            type: [String, Number],
            default: 180
        },
        bgColor: {
            type: String,
            default: '#30444E'
        }
    });
    const emits = defineEmits(['add']);

    const flag = ref(false);
// FUNC
    const nomore = computed(() => { // INFO 配合 Book 实现添加前需要看完已有的条件。
        return props.loadStatus === 'nomore';
    })

    onPageScroll((e) => {
        // TIP 【触发时机】当向下翻动了很多，然后又向上移动的时候。
        if (e.scrollTop > flag.scrollTop || (props.mustReadAll && !nomore))
            flag.value = false;
        else
            flag.value = true;
        // reload
        flag.scrollTop = e.scrollTop;
    });

</script>

<style scoped>

.container-btn {
    position: fixed;
    right: var(--right);
    bottom: var(--bottom);
    
    padding: 15px;
    width: 50px;
    height: 50px;

    background-color: var(--bg-color);
    border-radius:  50%;
    box-shadow: 0px 0px 5px 3px #3333337f;

    animation: fadeIn .3s ease-in-out;
    /** 或许也用不到淡出，反而不需要使用的时候，还是直接消失会比较好 */
}

</style>        