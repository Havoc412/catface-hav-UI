<template>
    <view v-show="!flag.hide" class="container-loadding flex-center-both" :class="props.mode">
        <loaddingCat 
            v-if="flag.loadding" 
            :textMode="props.loaddingTextMode" 
            :loaddingText="props.loaddingText"
            :imgMode="props.loaddingImgMode"
            :size="props.loaddingImgSize"
        />
        <err v-if="flag.err" @click="emits('reload')"/>
    </view>
</template>

<script setup>
    import { reactive, watch, onMounted } from "vue";
    // com
    import loaddingCat from "./loadding.vue";
    import err from "./err.vue";
    // store

// DATA
    const props = defineProps({
        // Top
        status: {
            type: String,
            default: "loadding"
        },
        mode: {
            type: String,
            default: "full" // block // INFO full 全屏； block 区块  // TODO block 暂时没有设定特殊点。
        },
        // TAG loadding
        loaddingTextMode: {
            type: String,
            default: "text" // knowledge
        },
        loaddingText: {
            type: String,
            default: "Loading"
        },
        loaddingImgMode: {
            type: String,
            default: "single"
        },
        loaddingImgSize: {
            type: String,
            default: "300rpx"
        },
        // TAG err
    });
    const emits = defineEmits(['reload']);
    
    const flag = reactive({
        loadding: false,
        err: false,
        
        hide: false,
    })

// FUNC
    onMounted(() => { // TIP 初始化 依靠 onMouted；后续变动 依靠 watch
        checkStatus();
    }),
    watch(() => props.status, checkStatus)

    function checkStatus() {
        // TODO 如果样式过多，可以先全部设为 false，然后 case 改其中一个为 true
        flag.hide = false;
        switch (props.status) {
            case "loadding":  // TODO 尽量避免硬编码
                flag.loadding = true;
                flag.err = false;
                break;
            case "error":
                flag.loadding = false;
                flag.err = true;
                break;
            default:
                flag.hide = true;
                break;
        }
    }

</script>

<style scoped>

.container-loadding {
    width: 100%;
    user-select:none;
    z-index: 2000;
    overflow:hidden
}

.full {
    position: fixed;
    left: 0;
    top:  0;
    height: 100%;
}

</style>        