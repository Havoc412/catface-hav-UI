<template>
    <!--TAG Breed 部分-->
    <!--TODO 之后加入狗狗の品种-->
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
            <!--UPDATE 虽然现在这里只有一个选择，偏移导致看起来怪怪的，但是之后添加狗狗，所以倒也无妨。-->
            <view class="flex-center-vertical gap-10" style="padding: 10px;">
                <view class="shrink"/>
                <h-btn icon="tool-question_thin" shape="circle" @click="flag.breedExample = true"/>
            </view>
        </template>
    </up-picker>
    <!--TAG Department 部分-->
    <up-picker
        :show="flag.department"
        :columns="[Departments_ZH]"
        title="请选择猫猫最常出没地区"
        :closeOnClickOverlay="true"
        @close="emits('closeDepartment')"
        @cancel="emits('closeDepartment')"
        @confirm="(e) => emits('selectDepartment', e)"
    >
    </up-picker>
    <!--TAG Age 部分-->
    <!--BUG 会导致每一次都得重新选 :defaultIndex="flag.ageDetail ? [0, 0, 0, 0] : [0, 0]" -->
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
            <view class="flex-center-horizontal" style="padding: 0 20px;">
                <template v-for="(item, index) in CommonAge" :key="index">
                    <h-btn variant="outlined" :text="item.text" @click="emits('selectAge', item)"/>
                </template>
            </view>
        </template>

        <template #tools>
            <view class="flex-center-vertical gap-10" style="padding: 10px;">
                <view class="shrink"/>
                <!--切换【年龄模式】的详细程度。-->
                <h-btn
                    :icon="!flag.ageDetail ? 'tool-choose_more_thin' : 'tool-choose_less_thin'"
                    :disabled="flag.dateChooseMode"
                    @click="changeAgeDetail"
                />
                <!--切换为【生日模式】-->
                <h-btn
                    icon="tool-date"
                    @click="modeChange"
                />
            </view>
        </template>
    </up-picker>
    <!--浮窗提示部分-->
    <breedExample v-if="flag.breedExample" @close="flag.breedExample = false"/>
</template>

<script setup>
    import { watch, reactive, ref } from "vue";
	// import { onLaunch } from '@dcloudio/uni-app'

    import { Breed_ZH, Departments_ZH, Age } from "../../../common/consts";
    import { DateChooseInit, MouthChooseInit, DayChooseInit } from "../../../utils/date";

    // com
    import breedExample from "./sub-picker/breed-example.vue";
    // store
// DATA
    const props = defineProps({
        breedShow: Boolean,
        ageShow: Boolean,
        departmentShow: Boolean,
    });
    const emits = defineEmits(['closeBreed', 'selectBreed', 'closeAge', 'selectAge', 'closeDepartment', 'selectDepartment']);

    const flag = reactive({
        breed: false,
        department: false,
        age: false,
        ageDetail: false, // 年龄栏是否显示详细？
        dateChooseMode: false, // 启用，日期选择方式。
        breedExample: false, // 启用，花色介绍窗口
    })

    const state = reactive({
        ageIndexs: [0, 0],  // 辅助 Age-Detail 的变换：状态记录
    })

    const CommonAge = [  // 给一些简单常见的年龄，方便用户选择
        { text: '不到1个月', value: ["0", "0", '3周', "0"] },
        { text: '1个月', value: ["0", '1个月', "0", "0"] },
        { text: '3个月', value: ["0", '3个月', "0", "0"] },
        { text: '1岁', value: ['1岁', "0", "0", "0"] },
        { text: '1岁半', value: ['1岁', '6个月', "0", "0"] },
    ]

    const agePickerRef = ref(null);  // ref 操作的钩子。
    const AgeChoosedShow = ref(Age.slice(0, 2));  // TIP up-picker 不兼容 null 处理。

// FUNC
    // onLaunch(() => {  // Init
    //     flag.breed = false;
    //     flag.age = false;
    //     flag.ageDetail = false;
    //     flag.dateChooseMode = false;
    // })
    
    // TAG 两个 popup 层弹出的监听
    watch(() => props.breedShow, (value) => {
        flag.breed = value;
    })
    watch(() => props.ageShow, (value) => {
        flag.age = value;
    })
    watch(() => props.departmentShow, (value) => {
        flag.department = value;
    })
    
    // TAG age Mode Setting
    watch(() => flag.ageDetail, AgeDetailChange)
    function modeChange() {
        flag.dateChooseMode = !flag.dateChooseMode
        // 由于两种模式差异较大，直接重置。
        if (agePickerRef.value) // onMounted 时， Ref 还没有准备好。
            agePickerRef.value.setIndexs([0, 0, 0, 0], false); // 全部恢复为 0 状态，前者优先，多余无效。
        // 改变 colnum 的选项。
        if (!flag.dateChooseMode) {
            AgeDetailChange();
        } else {
            AgeChoosedShow.value = DateChooseInit();
        }
    }
    
    // Age 切换详细程度。
    function changeAgeDetail() {
        if (agePickerRef.value) {
            // @brief 记录 年-月 的记录，重置 周-日 的设定。
            const indexs = state.ageIndexs;
            while(indexs.length < 4)  // 受到 picker 的影响，state.ageIndexs 不一定有 4 个元素。
                indexs.push(0);
            indexs[2] = 0;
            indexs[3] = 0;
            agePickerRef.value.setIndexs(indexs, false); // 全部恢复为 0 状态，前者优先，多余无效。            
        }
        flag.ageDetail = !flag.ageDetail
    }

    function AgeDetailChange() {
        // 由于 dateChoose Mode 下，ageDetail 不会改变，由此简化。
        AgeChoosedShow.value = flag.ageDetail ? Age : Age.slice(0, 2);
    }

    // INFO 年月日的自适应变动。
    const changeHandler = (e) => {
        console.debug(e);
        if(!flag.dateChooseMode) {
            state.ageIndexs = e.indexs;
            return;
        };
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