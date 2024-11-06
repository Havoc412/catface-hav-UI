<template>
    <view class="container-list flex-vertical">
        <view class="bold" style="font-family: Alimama ShuHeiTi;">
            # 组件显示
            <h-tip>
                仅【双列大图】模式下有效<br />
                为了更好的展示效果，选择<span style="color: red; font-size: 14px;">至多3个</span>。
            </h-tip>
        </view>
        <template v-for="(item, index) in CompomentItems">
            <view class="flex-center-horizontal">
                <view>{{ item }}</view>
                <up-switch v-model="compomentFlag[index]" size="28" :activeColor="color['main-deep']"
                    @change="reverseCompSwitch(index)" />
            </view>
        </template>
        <view class="bold" style="font-family: Alimama ShuHeiTi;">
            # 布局
            <h-tip>默认为【双列大图】</h-tip>
        </view>
        <template v-for="(item, index) in FlexItems">
            <view class="flex-center-horizontal">
                <view>{{ item }}</view>
                <up-switch v-model="flexFlag[index]" size="28" :activeColor="color['main-deep']"
                    @change="reverseFlexSwitch(index)" />
            </view>
        </template>
        <up-divider :hairline="false" lineColor="#888888" marginTD="0" />
        <!-- Example Show; 根据不同的控制区域，展示不同的显示效果 -->
        <view class="flex-center-both">
            <singleCat v-if="flag.changeAreaTag === consts.COMPOMENT" ctlMode="props"
                :compomentStatus="compomentFlag" />
            <view v-if="flag.changeAreaTag === consts.FLEX" class="block flex-center-horizontal gap-5">
                <!--INFO 由于转换时， skeleton 宽度无法自适应，所以采取两个大组件。-->
                <template v-if="!flexFlag[0]" v-for="item in 2">
                    <up-skeleton :title="false" :loading="true" :animate="true" :rows="4"
                        :rowsWidth="['100%', '100%', '100%', '100%']" :rowsHeight="['150px', '20px', '150px', '20px']">
                    </up-skeleton>
                </template>
                <template v-else v-for="item in 3">
                    <up-skeleton :title="false" :loading="true" :animate="true" :rows="3"
                        :rowsWidth="['100%', '100%', '100%']" :rowsHeight="flexFlag[0] ? '80px' : '160px'">
                    </up-skeleton>
                </template>
            </view>
        </view>
        <!--底部按钮-->
        <view class="flex-center-horizontal btn-group">
            <u-button :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                border: 'solid 1px #666666'
            }" @click="reset"><span>重置</span></u-button>
            <u-button :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                fontWeight: 'bold',
                height: '40px',
                backgroundColor: color['main-deep'],
                color: '#ffffff'
            }" @click="confirm"><span>完成</span></u-button>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";

    import color from "../../../css/theme/index.module.scss";
    import { TOAST } from "../../../utils/notice.js";
    // com
    import singleCat from "../../../components/book/singleCat.vue";
    // store
    import book from "../../../store/book";  // INFO 这里的状态管理，是依靠 pinia 的全局变量。
    const bookStore = book();

// DATA
    const consts = {
        COMPOMENT: 'compoment',
        FLEX: 'flex'
    }

    const props = defineProps({
    });
    const emits = defineEmits(['close']);
    
    // INFO 需要和 bookStore 中的状态保持一致。
    const CompomentItems = bookStore.CompomentItems; 
    const compomentFlag = ref([]);  // TIP u-switch v-model 配合 ref 更稳定一些。

    const FlexItems = bookStore.FlexItems;
    const flexFlag = ref([]);

    const flag = reactive({
        changeAreaTag: consts.COMPOMENT,  // 当改动 不同区域 内容时，展示 Flex 不同的效果。
    })

// FUNC
    onMounted(() => {
        compomentFlag.value = bookStore.getSchoolStatus();
        flexFlag.value = bookStore.getFlex();
    })

    function reverseCompSwitch(index) {
        // BUG 组件内部通过绑定的方式，已经进行了一次修改，这里没必要动。 // compomentFlag.value[index] = !compomentFlag.value[index];
        flag.changeAreaTag = consts.COMPOMENT;  //

        // check
        if (compomentFlag.value.filter(Boolean).length > 3) {
            compomentFlag.value[index] = false;
            TOAST("最多选择3项。", "none", 1500);
        }
    }

    function reverseFlexSwitch(index) {
        flag.changeAreaTag = consts.FLEX;
    }

    // TAG BTN * 2
    function reset() { // BUG 和 filter 重置的功能并不同，如何设计？
        bookStore.reset();
        compomentFlag.value = bookStore.getSchoolStatus();
        flexFlag.value = bookStore.getFlex();
    }

    function confirm() {
        bookStore.setSchoolStatus(compomentFlag.value);
        bookStore.setFlex(flexFlag.value);
        emits('close');
    }

</script>

<style scoped>

.container-list {
    padding: 20px;

    width: 70vw;
    height: 100%;

    gap: 25px;
    
    background-color: #fff;
    border-bottom-left-radius: 20px;
    
    /* transition: width 0.5s ease-in-out; */
}

.btn-group {
    position: absolute;
    bottom: 15px;
    width: 88%;

    gap: 20px;
    
    line-height: 18.5px;
    
    background-color: #ffffff;
    padding: 10px 0;
}

span {
    font-size: 16px;    
}

</style>