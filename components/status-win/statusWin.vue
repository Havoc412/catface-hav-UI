<template>
    <view class="container-loadding flex-center-both">
        <loaddingCat v-if="flag.loadding" loadding size="300rpx"/>
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
      }  
    })
    
    const flag = reactive({
        loadding: false,
        err: false
    })

// FUNC
    onMounted(() => { // TIP 初始化 依靠 onMouted；后续变动 依靠 watch
        checkStatus();
    }),
    watch(() => props.status, checkStatus)

    function checkStatus() {
        // TODO 如果样式过多，可以先全部设为 false，然后 case 改其中一个为 true
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
                flag.loadding = false;
                flag.err = false;
                break;
        }
    }

</script>

<style scoped>

.container-loadding {
    position: fixed;
    left: 0;
    top:  0;
    height: 100%;
    width: 100%;
    user-select:none;
    z-index: 1000;
    overflow:hidden
}

</style>        