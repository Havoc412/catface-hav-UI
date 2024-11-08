<!--目前来看还是比较专用。 By Book/index -->
<template>
    <view v-show="flag || checkStatus" class="container-btn flex-center-both" :style="{
        '--bg-color': props.bgColor,
        '--right': props.right + 'rpx',
        '--bottom': props.bottom + 'rpx',
    }" @click="emits('add')">
        <h-icon name="com-plus_m" size="20"/>
    </view>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from "vue";
	import { onPageScroll } from '@dcloudio/uni-app'

    // store
    
// DATA
    const props = defineProps({
        // data
        scrollTop: { // Used by scrollView, not Page
            type: Number,
            default: 0
        },
        // func
        status: [String, Number, Boolean], // 外部的某种状态 // INFO 但是自然要求类型相同。
        mustStatus: [String, Number, Boolean], // 要求的值
        // Style
        right: {
            type: [String, Number],
            default: 20
        },
        bottom: {
            type: [String, Number],
            default: 180
        },
        bgColor: {
            type: String,
            default: '#30444E'
        }
    });
    const emits = defineEmits(['add']);

    const flag = ref(false);
    const scrollTop = ref(0);
// FUNC
    onMounted(() => {
        if (typeof props.status != typeof props.mustStatus)
            return console.error('[Book] add-btn: status 和 mustStatus 类型不一致。'); 
    });

    const checkStatus = computed(() => {
        return props.status == props.mustStatus;
    })

    watch(() => props.scrollTop, (newVal) => {
        checkShow(newVal);
    })

    onPageScroll((e) => {
        checkShow(e.scrollTop);
    });

    function checkShow(newVal) {
        // TIP 【触发时机】当向下翻动了很多，然后又向上移动的时候
        if (newVal > scrollTop.value)
            flag.value = false;
        else
            flag.value = true;
        // reload
        scrollTop.value = newVal;
    }

</script>

<style scoped>

.container-btn {
    position: fixed;
    right: var(--right);
    bottom: var(--bottom);
    
    padding: 15px;
    width: 50px;
    height: 50px;

    background-color: var(--bg-color);
    border-radius:  50%;
    box-shadow: 0px 0px 5px 3px #3333337f;

    animation: fadeIn .3s ease-in-out;
    /** 或许也用不到淡出，反而不需要使用的时候，还是直接消失会比较好 */
}

</style>        