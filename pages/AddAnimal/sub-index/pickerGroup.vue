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
    </up-picker>
    <!--TIP ref="agePickerRef"-->
    <!--BUG :defaultIndex="flag.ageDetail ? [0, 0, 0, 0] : [0, 0]" 会导致每一次都得重新选-->
    <up-picker
        :show="flag.age"
        :columns="AgeChoosedShow"
        title="请估计毛茸茸的年龄"
        :closeOnClickOverlay="true"
        :toolbarRightSlot="true"
        @close="emits('closeAge')"
        @cancel="emits('closeAge')"
        @confirm="(e) => emits('selectAge', e)"
    >
        <template #top>
            <!--TODO 不到一个月，3个月左右，不到一岁，1岁多-->
            <view class="flex-center-horizontal" style="padding: 0 20px;">
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
                    @click="flag.ageDetail = !flag.ageDetail"
                />
                <h-btn icon="tool-date"/>
            </view>
        </template>

    </up-picker>
</template>

<script setup>
    import { watch, reactive, ref, computed } from "vue";

    import { Breed_ZH, Age } from "../../../common/consts";
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
    })

    const commonAge = [  // 给一些简单常见的年龄，方便用户选择
        { text: '不到1个月', value: ["0", "0", "0", '3周'] },
        { text: '1个月', value: ["0", "0", '1个月', "0"] },
        { text: '3个月', value: ["0", "0", '3个月', "0"] },
        { text: '1岁', value: ["0", '1岁', "0", "0"] },
        { text: '1岁半', value: ["0", '1岁', '6个月', "0"] },
    ]

// FUNC
    watch(() => props.breedShow, (value) => {
        flag.breed = value;
    })
    watch(() => props.ageShow, (value) => {
        flag.age = value;
    })

    const AgeChoosedShow = computed(() => {
        return flag.ageDetail ? Age : Age.slice(0, 2);
    })

    // TIP 通过这种方式可以外部调用 Picker 的状态。
    // const agePickerRef = ref(null);
    // onMounted(() => {
    //     console.log("pickerGroup mounted");
    //     agePickerRef.value.setIndexs([1, 1, 1, 1], false);
    // })

</script>

<style scoped>

.warn-breed-choose {
    color: #777;
    font-size: 25rpx;
}

</style>        