<!--复刻一下 vuetify-btn-->
<template>
    <view 
        class="container-btn flex-center-horizontal gap-5" 
        :class="classObject" 
        :style="getOutsideStyle"
        @touchstart="handleTouchStart" @touchend="handleTouchEnd" 
        @click="click"
    >
        <slot name="prefix">
            <h-icon v-if="props.preIcon" :name="props.preIcon" :size="props.iconSize"/>
        </slot>
        <!-- <slot name="topfix">
            <h-icon v-if="props.icon || props.topIcon" 
                :name="props.icon || props.topIcon" 
                :size="props.iconSize"
            />
        </slot> -->
        <view class="flex-center-vertical shrink">
            <slot>
                <h-icon v-if="props.icon" :name="props.icon" :size="props.iconSize"/>
                <view v-else>{{ props.text }}</view>
            </slot>
            <slot name="absolute"></slot>
        </view>
        <slot name="suffix">
            <h-icon v-if="props.sufIcon" :name="props.sufIcon" :size="props.iconSize"/>
        </slot>
    </view>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';

    const props = defineProps({
        variant: {
            type: String,
            default: "default" // INFO default、outlined、text、tonal
        },
        text: {
            type: String,
            default: "Button"
        },
        // TAG Icon Name
        icon: {  // icon 模式，设定为只有一个 icon 的特化展示；如果需要 icon + text，请使用其他插槽。
            type: String,
            default: null     // 没有值，那么就会无效
        },
        preIcon: {
            type: String,
            default: null
        },
        // topIcon: {
        //     type: String,
        //     default: null
        // },
        sufIcon: {
            type: String,
            default: null
        },
        iconSize: {
            type: [String, Number],
            default: "16"
        },
        // TAG Btn Style
        btnSizeWhenCircle: {  // circle 状态下有效
            type: String,
            default: "28"
        },
        btnWidthWhenCircle: { // INFO 由于 RAG-TABBAR 宽度过大而特殊设定的。
            type: String,
            default: null
        },
        // TAG Animation 动画
        animationClose: {  // 是否关闭动画
            type: Boolean,
            default: false
        },
        activeColor: {  // 动画激活时，显示的颜色。
            type: String,
            default: "#dddddd"
        },
        // TAG bigger Style
        customStyle: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        },
        // 下面两个都是对 Radius 的设定。
        shape: {
            type: String,
            default: "default", // INFO circle || default; #1 当 icon 有效时，自动设置为 circle。
        },
        radius: {
            type: [String, Number],
            default: 15
        },
    });
    const emits = defineEmits(['click']);


    const isFadingOut = ref(false); // UPDATE 换成一般的 let/var 性能方面的提升？
    const radius = ref(15);
// FUNC
    // TAG Animation：一个【渐显渐隐】的效果
    function handleTouchStart() {
        isFadingOut.value = true;
    }
    function handleTouchEnd() {
        // Set a timeout to match the CSS transition duration
        setTimeout(() => {
            isFadingOut.value = false;
        }, 200);
    }

    // TAG Style
    onMounted(() => {
        if(props.shape === "circle" || props.icon)
            radius.value = 9999;
    })
    // classObject
    const classObject = computed(() => {
        // TODO 要是之后能直接获取外部的 class 就好了。
        const shape = props.icon ? "circle" : props.shape;
        return {
            'btn': !props.animationClose,
            'fade-out': isFadingOut.value && !props.animationClose,
            'disabled': props.disabled,
            // Style
            ["variant-" + props.variant]: true,
            ["shape-" + shape]: true
        };
    });
    // 外部容器的样式
    const getOutsideStyle = computed(() => {
        const style = {
            '--border-radius': radius.value.toString() + 'px',
            '--active-color': props.activeColor,
            // 外部优先级高，覆盖前者。
            ...props.customStyle,
        };

        if (props.shape === 'circle' || props.icon) {
            style['--width'] = (props.btnWidthWhenCircle || props.btnSizeWhenCircle) + 'px';
            style['--height'] = props.btnSizeWhenCircle + 'px';
        }

        return style;
    })

    // TAG Function-Emits
    function click() {
        if(!props.disabled) emits('click');
    }

</script>

<style scoped>

.container-btn {
    background-color: #fff;
    border-radius: var(--border-radius);

    transition: background-color 0.2s ease;
}

/* TAG Shape Style */
.shape-default {
    padding: 4px;
}

.shape-circle {
    width: var(--width);
    height: var(--height);
}

.btn:active, .btn.fade-out {
    background-color: var(--active-color);
    box-shadow: 0px 0px 10px var(--active-color);
}

/* TAG 基本 variant变体 的样式设计 */
.variant-default {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, .3);
}

.variant-outlined {
    background-color: transparent;
    border: 1px solid black;
}

.variant-text {
    background-color: transparent;
}

.variant-tonal {
    background-color: #f9f9f9;
}

.disabled {
    opacity: .6;
}

</style>