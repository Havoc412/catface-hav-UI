<template>
    <view v-show="!flag.hide" class="container-loadding flex-center-both" :class="props.mode">
        <loaddingCat v-if="flag.loadding" 
            loadding 
            :loaddingText="props.loaddingText"
            size="300rpx"
        />
        <err v-if="flag.err"/>
    </view>
</template>

<script setup>
    import { reactive, watch, onMounted } from "vue";
    // com
    import loaddingCat from "./loaddingCat.vue";
    import err from "./err.vue";
    // store

// DATA
    const props = defineProps({
      status: {
        type: String,
        default: "loadding"
      },
      loaddingText: {
        type: String,
        default: "Loading"
      },
      mode: {
        type: String,
        default: "full" // block // INFO full 全屏； block 区块  // TODO block 暂时没有设定特殊点。
      }
    })
    
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