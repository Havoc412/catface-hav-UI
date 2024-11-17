<!--目前来看还是比较专用。 By Book/index -->
<template>
    <view v-show="show" class="flex-vertical gap-10 container-top" :style="{
        '--right': props.right + 'rpx',
        '--bottom': props.bottom + 'rpx',
    }">
        <template v-for="(item, index) in DATA" :key="index">
            <!--这里没用 h-btn 是因为自定义了【渐入】的动画。-->
            <view v-if="props.show[index]" 
                class="container-btn flex-center-both" 
                :style="{
                    '--bg-color': color['main-deep'],
                }"
                @click="chickto(index)"
            >
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
        showMode: {
            type: String,
            default: "only-stauts" // both
        },
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
        show: {  // INFO 和下方 DATA 对应，按钮的是否显示。
            type: Array,
            default: [false, true]
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
            console.error('[Book] add-btn: status 和 mustStatus 类型不一致。'); 
    });

    const show = computed(() => {
        if (props.showMode == 'only-stauts')
            return checkStatus.value;
        else
            return flag.value && checkStatus.value;
    })

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
            case 0:
                emits('reload');
                break;
            case 1:
                emits('add');
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
    width: 50px;
    height: 50px;
    border-radius:  25px;

    background-color: var(--bg-color);
    box-shadow: 0px 0px 10px 2px #3333337f;

    animation: fadeIn .3s ease-in-out;
    /** 或许也用不到淡出，反而不需要使用的时候，还是直接消失会比较好 */
}

</style>        