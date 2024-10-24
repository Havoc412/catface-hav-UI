<template>
    <view class="container-filter flex-vertical">
        <tagBox title='在校状态' :tag-list="GetZhFields(SchoolStatus)" :closeFlag="true"/>
        <tagBox title='性别' :tag-list="GetZhFields(Gender)" :closeFlag="true"/>
        <tagBox title='绝育状态' :tag-list="GetZhFields(SterilizationStatus)" :closeFlag="true"/>
        <tagBox title='花色' :tag-list="Breed_ZH" :closeFlag="true"/>
        <view class="flex-center-horizontal btn-group">
            <u-button :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                border: 'solid 1px #666666'
            }"><span>重置</span></u-button>
            <u-button :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                backgroundColor: color['main-deep'],
                color: '#ffffff'
            }"><span>完成</span></u-button>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    import color from "@/css/theme/index.module.scss";
    import { GetZhFields, SchoolStatus, Gender, SterilizationStatus, Breed_ZH } from "../../../common/consts";
    // store
    import tagBox from "../../../components/com/tag-second/tagBox.vue";

// DATA
    const props = defineProps({
    });
    const emits = defineEmits(['close']);

// FUNC

</script>

<style scoped>

.container-filter {
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