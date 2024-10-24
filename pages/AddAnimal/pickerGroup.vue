<template>
    <up-picker
        :show="flag.breed"
        :columns="[Breed_ZH]"
        title="请选择猫猫花色"
        :closeOnClickOverlay="true"
        @cancel="emits('closeBreed')"
        @confirm="(e) => emits('selectBreed', e)"
    ><!--改了官方的源码，加了一个插槽-->
        <template #top>
            <view class="warn-breed-choose flex-center-both">暂时只支持以下花色</view>
        </template>
    </up-picker>
    <up-picker
        :show="flag.age"
        :columns="Age"
        title="请估计毛茸茸的年龄"
        :closeOnClickOverlay="true"
        @cancel="emits('closeAge')"
        @confirm="(e) => emits('selectAge', e)"
    >
        <template #top>
            <!--TODO 不到一个月，3个月左右，不到一岁，1岁多-->
            <view class="warn-breed-choose flex-center-both">TODO 一些常见值</view>
        </template>
    </up-picker>
</template>

<script setup>
    import { watch, reactive } from "vue";

    import { Breed_ZH, Age } from "../../common/consts";
    // store
// DATA
    const props = defineProps({
        breedShow: Boolean,
        ageShow: Boolean
    });
    const emits = defineEmits(['closeBreed', 'selectBreed', 'closeAge', 'selectAge']);

    const flag = reactive({
        breed: false,
        age: false
    })
// FUNC
    watch(() => props.breedShow, (value) => {
        flag.breed = value;
    })
    watch(() => props.ageShow, (value) => {
        flag.age = value;
    })

</script>

<style scoped>

</style>        