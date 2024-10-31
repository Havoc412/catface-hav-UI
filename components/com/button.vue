<!--复刻一下 vuetify-btn-->
<template>
    <!-- <Ripple> -->
        <view class="container-btn flex-center-horizontal" :class="classObject" :style="getOutsideStyle"
            @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="click">
            <slot name="prefix">
                <h-icon v-if="props.preIcon" :name="props.preIcon" :size="props.iconSize"/>
            </slot>
            <view class="flex-center-both">
                <slot name="topfix">
                    <h-icon v-if="props.icon" :name="props.icon" :size="props.iconSize"/>
                    <h-icon v-if="props.topIcon" :name="props.topIcon" :size="props.iconSize"/>
                </slot>
                <slot>
                    <!--选中icon属性时，默认只有icon-->
                    <!--todo 丰富文本内容的样式-->
                    <view v-if="!props.icon">{{ props.text }}</view>   
                </slot>
            </view>
            <slot name="suffix">
                <h-icon v-if="props.sufIcon" :name="props.sufIcon" :size="props.iconSize"/>
            </slot>
        </view>
    <!-- </Ripple> -->
</template>

<script setup>
    // import Ripple from "@/components/animation/Ripple.vue";
    import { ref, computed, onMounted } from 'vue';

    const props = defineProps({
        variant: {
            type: String,
            default: "default" // outlined text tonal
        },
        text: {
            type: String,
            default: "Button"
        },
        icon: {
            type: String,
            default: null     // 没有值，那么就会无效？
        },
        preIcon: {
            type: String,
            default: null
        },
        topIcon: {
            type: String,
            default: null
        },
        sufIcon: {
            type: String,
            default: null
        },
        iconSize: {
            type: String,
            default: "16"
        },
        btnSize: {
            type: String,
            default: "28"
        },
        animationClose: {
            type: Boolean,
            default: false
        },
        activeColor: {  // 动画激活时，显示的颜色。
            type: String,
            default: "#dddddd"
        },
        radius: {
            type: [String, Number],
            default: 15
        },
        // bigger Style
        customStyle: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        },
        shape: {
            type: String,
            default: "default", // circle || default
        }
    });
    const emits = defineEmits(['click']);


    const isFadingOut = ref(false);
    const shape = ref(15);
// FUNC
    onMounted(() => {
        if(props.shape === "circle")
            shape.value = 9999;
    })
    // animation
    function handleTouchStart() {
        isFadingOut.value = true;
    }
    function handleTouchEnd() {
        // Set a timeout to match the CSS transition duration
        setTimeout(() => {
            isFadingOut.value = false;
        }, 200);
    }
    // classObject
    const classObject = computed(() => {
        // TODO 要是之后能直接获取外部的 class 就好了。
        return {
            'btn': !props.animationClose,
            'fade-out': isFadingOut.value && !props.animationClose,
            [props.variant]: true,
            'disabled': props.disabled,
            ["shape-" + props.shape]: true
        };
    });
    // tag 外部容器的样式
    const getOutsideStyle = computed(() => {
        return {
            '--border-radius': props.radius.toString() + 'px',
            '--active-color': props.activeColor,
            '--width': props.btnSize + 'px', // 在 shape-circle 下有效。
            '--height': props.btnSize + 'px',
            ...props.customStyle,   // 外部优先级高，覆盖前者。
        }
    })

    // Emits
    function click() {
        if(!props.disabled) emits('click');
    }

</script>

<style scoped>

.container-btn {
    gap: 5px;
    background-color: #fff;
    border-radius: var(--border-radius);

    transition: background-color 0.2s ease;
}

.shape-default {
    padding: 6px;
}

.shape-circle {
    padding: 6px;
    width: var(--width);
    height: var(--height);
}

.btn:active, .btn.fade-out {
    background-color: var(--active-color);
    box-shadow: 0px 0px 10px var(--active-color);
}

.default {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, .3);
}

.outlined {
    background-color: transparent;
    border: 1px solid black;
}

.text {
    background-color: transparent;
}

.tonal {
    background-color: #f9f9f9;
}

.disabled {
    opacity: .6;
}

</style>