<template>
    <up-picker
        :show="flag.breed"
        :columns="[Breed_ZH]"
        title="请选择猫猫花色"
        :closeOnClickOverlay="true"
        @close="emits('closeBreed')"
        @cancel="emits('closeBreed')"
        @confirm="(e) => emits('selectBreed', e)"
    ><!--改了官方的源码，加了一个插槽-->
        <template #top>
            <view class="warn-breed-choose flex-center-both">暂时只支持以下花色</view>
        </template>

        <template #tools>
            <view class="flex-center-vertical gap-10" style="padding: 10px;">
                <view class="shrink"/>
                <h-btn icon="tool-question_thin" shape="circle" @click="flag.breedExample = true"/>
            </view>
        </template>
    </up-picker>
    <!--BUG :defaultIndex="flag.ageDetail ? [0, 0, 0, 0] : [0, 0]" 会导致每一次都得重新选-->
    <up-picker
        ref="agePickerRef"
        :show="flag.age"
        :columns="AgeChoosedShow"
        title="请估计毛茸茸的年龄"
        :closeOnClickOverlay="true"
        :toolbarRightSlot="true"
        @close="emits('closeAge')"
        @cancel="emits('closeAge')"
        @confirm="(e) => emits('selectAge', e, flag.dateChooseMode)"
        @change="changeHandler"
    >
        <template #top>
            <!--TODO 不到一个月，3个月左右，不到一岁，1岁多-->
            <view class="flex-center-horizontal" style="padding: 0 20px;">
                <!--UPDATE 虽然现在这里只有一个选择，偏移导致看起来怪怪的，
                但是之后添加狗狗，所以倒也无妨。-->
                <template v-for="(item, index) in commonAge" :key="index">
                    <h-btn variant="outlined" :text="item.text" @click="emits('selectAge', item)"/>
                </template>
            </view>
        </template>

        <template #tools>
            <view class="flex-center-vertical gap-10" style="padding: 10px;">
                <view class="shrink"/>
                <h-btn 
                    :icon="!flag.ageDetail ? 'tool-choose_more_thin' : 'tool-choose_less_thin'"
                    :disabled="flag.dateChooseMode"
                    shape="circle"
                    @click="flag.ageDetail = !flag.ageDetail"
                />
                <!--UPDATE 暂时想不到合适的变化 ICON-->
                <h-btn
                    icon="tool-date"
                    shape="circle"
                    @click="flag.dateChooseMode = !flag.dateChooseMode"
                />
            </view>
        </template>
    </up-picker>
    <breedExample v-if="flag.breedExample" @close="flag.breedExample = false"/>
</template>

<script setup>
    import { watch, reactive, ref, computed, onMounted } from "vue";

    import { Breed_ZH, Age } from "../../../common/consts";
    import { DateChooseInit, MouthChooseInit, DayChooseInit } from "../../../utils/date";

    // com
    import breedExample from "./sub-picker/breed-example.vue";
    // store
// DATA
    const props = defineProps({
        breedShow: Boolean,
        ageShow: Boolean
    });
    const emits = defineEmits(['closeBreed', 'selectBreed', 'closeAge', 'selectAge']);

    const flag = reactive({
        breed: false,
        age: false,
        ageDetail: false, // 年龄栏是否显示详细？
        dateChooseMode: false, // 启用，日期选择方式。
        breedExample: false, // 启用，花色介绍窗口
    })

    const commonAge = [  // 给一些简单常见的年龄，方便用户选择
        { text: '不到1个月', value: ["0", "0", "0", '3周'] },
        { text: '1个月', value: ["0", "0", '1个月', "0"] },
        { text: '3个月', value: ["0", "0", '3个月', "0"] },
        { text: '1岁', value: ["0", '1岁', "0", "0"] },
        { text: '1岁半', value: ["0", '1岁', '6个月', "0"] },
    ]

    const agePickerRef = ref(null);
    const AgeChoosedShow = ref(Age.slice(0, 2));  // TIP up-picker 不兼容 null 处理。

// FUNC
    // onMounted(() => {  // Init
    //     AgeChoosedShow.value = Age.slice(0, 2);  // 初始，放置最简单的选择。
    //     flag.breed = false;
    //     flag.age = false;
    //     flag.ageDetail = false;
    //     flag.dateChooseMode = false;
    // })

    watch(() => props.breedShow, (value) => {
        flag.breed = value;
    })
    watch(() => props.ageShow, (value) => {
        flag.age = value;
    })
    watch(() => flag.ageDetail, AgeDetailChange)
    watch(() => flag.dateChooseMode, () => {
        if (agePickerRef.value) // onMounted 时， Ref 还没有准备好。
            agePickerRef.value.setIndexs([0, 0, 0, 0], false); // 全部恢复为 0 状态，前者优先，多余无效。
        if (!flag.dateChooseMode) {
            AgeDetailChange();
        } else {
            AgeChoosedShow.value = DateChooseInit();
        }
    })

    function AgeDetailChange() {
        // 由于 dateChoose Mode 下，ageDetail 不会改变，由此简化。
        AgeChoosedShow.value = flag.ageDetail ? Age : Age.slice(0, 2);
    }

    const changeHandler = (e) => {
        // INFO 年月日的自适应变动。
        if(!flag.dateChooseMode) return;
        const {
            columnIndex,
            value,
            values,
            index,
            indexs,
        } = e;
        switch(columnIndex) { // UPDATE 或许可以优化一下重复的部分。
            case 0: {
                // Mouth
                AgeChoosedShow.value[1] = MouthChooseInit(value[0]);
                AgeChoosedShow.value[2] = DayChooseInit(value[0], value[1]);
                const newMouthIndex = AgeChoosedShow.value[1].indexOf(value[1]);
                let newDayIndex = AgeChoosedShow.value[2].indexOf(value[2]);
                if (newDayIndex < 0) newDayIndex = 0;
                agePickerRef.value.setIndexs([indexs[0], newMouthIndex, newDayIndex], true);
                break;
            }
            case 1: {
                AgeChoosedShow.value[2] = DayChooseInit(value[0], value[1]);
                let newDayIndex = AgeChoosedShow.value[2].indexOf(value[2]);
                if (newDayIndex < 0) newDayIndex = 0;
                agePickerRef.value.setIndexs([indexs[0], indexs[1], newDayIndex], true);
                break;
            }
            case 2: {};                
            default: break;
        }
    }

</script>

<style scoped>

.warn-breed-choose {
    color: #777;
    font-size: 25rpx;
}

</style>        