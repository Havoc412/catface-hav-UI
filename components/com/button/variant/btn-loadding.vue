<template>
    <h-btn :customStyle="props.customStyle" @click="click">
        <view class="flex-center-horizontal gap-5">
            <view v-if="flag" class="loader"/>
            <text>{{ flag ? props.textStop : props.text }}</text>
        </view>
    </h-btn>
</template>

<script setup>
    import { ref, watch } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "默认文本"
        },
        textStop: {
            type: String,
            default: "停止"
        },
        customStyle: {
            type: Object,
            default: () => ({})
        },
        trigger: Boolean,
    });
    const emits = defineEmits(['click', 'cencel']);

    const flag = ref(false); // 状态控制由外部 API 状态来做。
// FUNC
    watch(() => props.trigger, (newVal) => {
        flag.value = newVal;
    })

    function click() {
        if (flag.value) {
            emits('cencel');
        } else {
            emits('click');
        }
    }

</script>

<style scoped>

.loader {
  border: 3px solid #ffffff6b; /* 浅灰色背景 */
  border-top: 3px solid #ffffff; /* 蓝色 */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>        