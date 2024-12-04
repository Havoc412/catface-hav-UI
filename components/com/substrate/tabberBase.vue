<template>
    <!--UPDATE 之后处理为外部样式或许会更好，提供更高的自由度。-->
    <view class="container flex-vertical"
        :class="{
            [setZIndex]: true,
            'fade-in-from-half': props.animationFadeInFromHalf
        }"
        :style="getOutSideStyle"
        @click.stop>
        <!--INFO 放置到顶部-->
        <slot name="topfix"></slot>
        <view class="flex-bottom-horizontal">
            <!--INFO 简单的分为了 前-中-后-->
            <view class="flex-center-horizontal">
                <slot name="prefix"></slot>
            </view>
            <view class="shrink">
                <slot name="midfix"></slot>
            </view>
            <view class="flex-center-horizontal"> 
                <slot name="suffix"></slot>
            </view>
        </view>
        <!--INFO 支持 Fixed 自定义固定一些组件 -->
		
		<!--BUG wx 中不好用。-->
        <slot name="fixed">
            <!-- <view style="position: absolute; right: 0; top:0">TEST</view> -->
        </slot>
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
        },
        padding: {
            type: String,
            default: "0"
        },
        bgColor: {
            type: String,
            default: "transparent"
        },
        animationFadeInFromHalf: Boolean,
        customStyle: {
            type: Object,
            default: () => ({})
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

    const getOutSideStyle = computed(() => {
        return {
            '--bottom': setBottom.value,
            '--position': props.position,
            '--padding': props.padding,
            '--bg-color': props.bgColor,
            ...props.customStyle,
        };
    })

</script>

<style scoped>

.container {
    width: 100vw;
    position: var(--position);   /* QUESTION 为何不用 fixed 来着？ */
    bottom: var(--bottom);
    padding: var(--padding);

    background-color: var(--bg-color);
    transition: bottom .1s;
}

</style>