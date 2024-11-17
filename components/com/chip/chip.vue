<!--INFO 因为暂时用不到 原项目 chip 的长按功能，就先使用一个简化的版本就好。-->
<template>
    <view class="flex-center-both basic"
        :class="{
            ['style-' + props.styleMode]: true,
            ['shape-' + props.shape]: true,
            'default': selectFlag
        }"
        :style="{
            '--bg-color': selectFlag ? props.bgColor : 'transparent',
            '--font-color': selectFlag ? props.color : '#ccc',
            'opacity': props.hidden ? .3 : 1,
            'font-weight': !props.light ? '' : 'bold',
        }"
        @click="clickEntrance"
        @long-press="longpress"
        @touchend="touchend"
    >
        <slot> <!--放一个 slot，增加灵活性-->
            {{ props.text }}
        </slot>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import color from "@/css/theme/index.module.scss";
    // store
// DATA
    const props = defineProps({
        styleMode: {
            type: String,
            default: 'full'  // INFO hollow、topic
            // INFO hollow 模式下，border 和 font 采取同一个颜色。
        },
        text: {
            type: [String, Number],
            default: "日常"
        },
        bgColor: {
            type: String,
            default: color['main-light']
        },
        color: {
            type: String,
            default: "#000"
        },
        shape: {
            type: String,
            default: "rectangle"
        },
        // TAG Light
        light: {  // 是否保持常亮 light-hold
            type: Boolean,
            default: false
        },
        lightStart: {   // lightFlag 的初始值； // info 优先级 light > lightSrart
            type: Boolean,
            default: false
        },
        // TAG hidden
        hidden: Boolean,
    });
    const emits = defineEmits(['click', 'select', 'unselect', 'longPress', 'doubleClick']);

    const selectFlag = ref(props.light | props.lightStart);
    
    let clickNum = 0;
    let islongPress = false;

// FUNC
    function clickEntrance() {
        if (clickNum == 0) {
            setTimeout(() => {
                if(clickNum == 1) {
                    emits('click');
                    click();
                } else if(clickNum >= 2) {
                    emits('doubleClick', props.text);
                }
                clickNum = 0;
            }, 250);
        }
        clickNum += 1;
    }
    
    function click() {
        if(props.light || islongPress)  // 保持常亮
            return;
        
        console.debug('click');
        selectFlag.value = !selectFlag.value;
        
        if (selectFlag.value) {
            emits('select', props.text);
        } else {
            emits('unselect', props.text);
        }
    }

    function longpress(e) {
        // console.debug('longpress', e);
        islongPress = true;
        emits('longPress', e['type']);
        // TODO  如果有使用者同时长按多个... 如何屏蔽？
        // e.changedTouches 是一个 Array[]，其中包括 
    }

    function touchend() {
        // 避免随后就触发 click 事件。 // UPDATE what's better ?
        setTimeout(() => {
            islongPress = false;
        }, 200);
    }
    

</script>

<style scoped>

.basic {
    padding: 10px;
    height: 30px;

    border-radius: 10rpx;

    color: var(--font-color);
    letter-spacing: 1px;    /* 字间距 */
    font-size: 14px;
    line-height: 13px;
    font-family: Alimama ShuHeiTi;

    flex-shrink: 0;
    flex-basis: auto;
    white-space: nowrap;
}

.style-full {
    background-color: var(--bg-color);
}

.style-hollow {
    background-color: var(--bg-color);
    border: solid 1px var(--font-color); /* 边框 采用 Font 的颜色。 */
}

.style-topic {
  color: #009ace;
  font-style: italic; /* 斜体 */
}

.shape-rectangle {
    padding: 10px;
}

.shape-square {
    padding: 10px 5px;
}

.defualt {
    border: solid 1px #CCC; /* 边框 采用 Font 的颜色。 */
}


</style>        