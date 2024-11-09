<!--目前来看还是比较专用。 By Book/index -->
<template>
    <view v-show="flag || checkStatus" class="flex-vertical gap-10 container-top" :style="{
        '--right': props.right + 'rpx',
        '--bottom': props.bottom + 'rpx',
    }">
        <template v-for="(item, index) in DATA" :key="index">
            <view class="container-btn flex-center-both" :style="{
                '--bg-color': color['main-deep'],
            }" @click="chickto(index)">
                <h-icon :name="item.name" size="20"/>
            </view>
        </template>
    </view>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from "vue";
	import { onPageScroll } from '@dcloudio/uni-app'

    import color from "@/css/theme/index.module.scss";
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
        }
    });
    const emits = defineEmits(['add', 'reload']);

    const DATA = [
        { name: "sidetool-reload" },
        { name: "sidetool-add" },
    ]


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

    watch(() => props.scrollTop, (newVal) => { // UPDATE 这里或许依靠 onMouted 根据 mode 设置 watch 的加载，效果会更好一些。
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

    // FUNCTION
    function chickto(index) {
        switch (index) {
            case 1:
                emits('add');
                break;
            case 0:
                emits('reload');
                break;
        }
    }

</script>

<style scoped>

.container-top {
    position: fixed;
    right: var(--right);
    bottom: var(--bottom);
}

.container-btn {
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