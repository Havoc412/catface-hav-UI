<template>
    <view class="container flex-vertical"
    :style="{
        '--bottom': setBottom,
        '--position': props.position
    }"
    :class="{
        [setZIndex]: true
    }"
    @click.stop>
        <!--INFO 放置到顶部-->
        <slot name="topfix"></slot>
        <view class="flex-bottom-horizontal bottom-container">
            <!--INFO 简单的分为了 前-中-后-->
            <view class="flex-center-horizontal">
                <slot name="prefix"></slot>
            </view>
            <view class="flex-center-horizontal shrink">
                <slot name="midfix"></slot>
            </view>
            <view class="flex-center-horizontal"> 
                <slot name="suffix"></slot>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
// DATA
    const props = defineProps({
        zIndex: {
            type: String,
            default: "8"
        },
        bottom: {
            type: Number,
            default: 0
        },
        position: {
            type: String,
            default: 'sticky'
         }
    });
    const emits = defineEmits([]);

// FUNC
    // style
    const setZIndex = computed(() => {
        return "z-" + props.zIndex;
    })
    const setBottom = computed(() => {
        return props.bottom.toString() + 'px';
    })
    const setWidth = computed(() => {

    })

</script>

<style scoped>

.container {
    width: 100vw;
    position: var(--position);   /* QUESTION 为何不用 fixed 来着？ */
    bottom: var(--bottom);

    background-color: transparent;
    transition: bottom .1s;
}

.bottom-container {
    /* background-color: #ffffff; */
    /* padding: 2px; */
}

</style>        