<!--目前来看还是比较专用。 By Book/index -->
<template>
    <view v-show="flag" class="container-btn flex-center-both" :style="{
        '--bg-color': props.bgColor,
        '--right': props.right + 'rpx',
        '--bottom': props.bottom + 'rpx'
    }" @click="emits('add')">
        <h-icon name="com-plus_m" size="20"/>
    </view>
</template>

<script setup>
    import { ref, computed, watch } from "vue";
    // store
    
// DATA
    const props = defineProps({
        // func
        scrollTop: {
            type: Number,
            default: 0
        },
        loadStatus: {
            type: String,
            default: 'loading'
        },
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
    const nomore = computed(() => {
        return props.loadStatus === 'nomore';
    })
    
    watch(() => props.scrollTop, (newVal, oldVal) => {
        // TIP 【触发时机】当向下翻动了很多，然后又向上移动的时候。
        if(newVal > oldVal || !nomore)
            flag.value = false;
        else
            flag.value = true;
    })

</script>

<style scoped>

.container-btn {
    position: fixed;
    right: var(--right);
    bottom: var(--bottom);
    
    padding: 15px;

    background-color: var(--bg-color);
    border-radius:  50%;
    box-shadow: 0px 0px 5px 3px #3333337f;

    animation: fadeIn .3s ease-in-out;
    /** 或许也用不到淡出，反而不需要使用的时候，还是直接消失会比较好 */
}

</style>        