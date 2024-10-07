<template>
    <view class="container-block relative" :style="{
        '--bgc': props.bgc,
        '--height': props.height + 'vh',
        // '--width': props.width + 'vw',
        '--radius': props.radius + 'px',
        '--padding': props.padding + 'px'
    }">
        <slot>
            <view class="text">{{ text }}</view>
        </slot>
        <view class="img-cat-head" :style="getStyle">
            <image :src="props.url" class="img" :style="{
                '--size': props.catSize + 'rpx'
            }"/>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        bgc: {
            type: String,
            default: "#fff"
        },
        height: {
            type: [Number, String],
            default: 20
        },
        width: {
            type: [Number, String],
            default: 45
        },
        radius: {
            type: [Number, String],
            default: 25
        },
        padding: {
            type: [Number, String],
            default: 20
        },
        // INFO cat 定位方式
        url: {
            type: String,
            default: "/static/cats/head/10.png"
        },
        bottom: {
            type: [Number, String],
            default: -35
        
        },
        positionType: {
            type: String,
            default: 'left' // INFO left | right | mid
        },
        left: {
            type: [Number, String],
            default: -20
        },
        right: {
            type: [Number, String],
            default: -20  // INFO px
        },
        catSize: {
            type: [Number, String],
            default: 250  // INFO rpx
        },
        // TAG 不使用 slot 时的内容
        text: String
    });
    const emits = defineEmits([]);
// FUNC
    const getStyle = computed(() => {
        let style;
        switch (props.positionType) {
            case 'left':
                style = {
                    '--left': props.left + 'px'
                }; break;
            case 'right':
                style = {
                    '--right': props.right + 'px'
                }; break;
            case 'mid':
                style = {
                    // '--right': 0,
                    // '--left': 0,
                }; break;
            default:
                style = {
                    '--left': props.left + 'px'
                }
        }
        return {
            '--bottom': props.bottom + 'px',
            ...style
        }
    })

</script>

<style scoped>

.container-block {
    width: 100%;
    height: var(--height);
    /* width: var(--width); */

    padding: var(--padding);
        
    background-color: var(--bgc);
    border-radius: var(--radius);

    overflow: hidden;
}

.img-cat-head {
    position: absolute;
    bottom: var(--bottom);

    right: var(--right);
    left: var(--left);

    margin: auto;
}

.img {
    height: var(--size);
    width: var(--size);
}

.text {
    font-family: Alimama ShuHeiTi;
    color: #FFF;
    font-size: large;
}

</style>        