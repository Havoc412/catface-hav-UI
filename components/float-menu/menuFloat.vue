<template>
    <view v-show="functionFlag" 
        class="flex-vertical container-float" 
        :animation="animation"
        :style="{
            '--right': props.right + 'px',
            '--top': props.top + 'px'
    }">
        <template v-for="(item, index) in props.list" :key="index">
            <view class="flex-horizontal func-row block-width" @click="emits('choose', index)">
                <h-icon v-if="!textMode" :name="item.icon" :size="props.iconSize"></h-icon>
                <text>{{ item.text }}</text>
            </view>
        </template>
    </view>
</template>

<script setup>
    import { ref, computed, watch, nextTick } from "vue";
    // store

// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: "default" // text || icon  // TODO Icon mode 的设计待定
        },
        list: {
            type: Array,
            default: () => []
            // INFO { icon: .. , text: .. }
        },
        iconSize: {
            type: Number,
            default: 16,
        },
        right: {
            type: Number,
            default: 25
        },
        top: {
            type: Number,
            default: 10
        },
        show: {
            type: Boolean,
            default: false
        }
    })
    const emits = defineEmits(['choose']);

    // Run
    watch(() => props.show, (newVlaue, oldValue) => {
        toggleFloatWin(newVlaue);    
    })

    // Animation
    const TIME_ANIMATION = 200;

    const functionFlag = ref(false);
    let clickOnceFlag = false;
    const animation = ref(null);

// FUNC
    const textMode = computed(() => {
        return props.mode === 'text';
    })
    const toggleFloatWin = (show) => { 
        if(show) {
            functionFlag.value = true;

            nextTick(() => {
                animation.value = uni.createAnimation({
                    duration: TIME_ANIMATION,
                    timingFunction: 'ease'
                });
                animation.value.opacity(1).step();
            });
        } else {
            setTimeout(() => {
                functionFlag.value = false;
            }, TIME_ANIMATION);

            animation.value = uni.createAnimation({
                duration: TIME_ANIMATION,
                timingFunction: "ease"
            });
            animation.value.opacity(0).step();
        }
    }
    const openFunction = () => {
        if(functionFlag.value) // info 在动画生效期间，如果点击过快，就会bug，flag反转，无法正常工作；所以直接打断。
            return;
        console.info("openFunction", functionFlag.value);
        if(!clickOnceFlag) {
            toggleFloatWin(!functionFlag.value);
        } else {
            clickOnceFlag = false;
        }
        if(functionFlag.value) {
            clickOnceFlag = true;
            uni.$once("baseClick", () => {
                clickOnceFlag = false;
                console.info("baseClick-open", functionFlag.value); // info stop 好像成功阻止
                toggleFloatWin(false);
            });
        }
        else {
            uni.$off("baseClick");
            console.info("baseClick-close");
        }
    }

</script>

<style scoped>

.container-float {
    position: absolute;
    right: var(--right);
    top: var(--top);
    
    border-radius: 10px;
    
    background-color: #f9f9f9;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    z-index: 9999;  /* mark 很神奇的BUG，在没有zIndex的时候，无法点击 */
}

.func-row {
    height: 40px;
    width: auto;
    padding: 10px;
    box-sizing: border-box;
    gap: 15px;

    font-size: 14px;
    font-family: SourceHanSansCN;
    line-height: 13px;
    font-weight: 300;
    color: #000000;
    
    background-color: transparent;
    border-radius: 10px;
    
    transition: background-color 0.3s ease;
}

.func-row:active {
    background-color: #0000000d;
    border-radius: 10px;
}

</style>