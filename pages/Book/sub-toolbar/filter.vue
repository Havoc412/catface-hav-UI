<template>
    <view class="container-filter flex-vertical">
        <tagBox title='学业状态' :tag-list="SchoolStatus_ZH" 
            :startMode="true" :startUnselectedList="[2, 3]"
        />
        <tagBox title='性别' :tag-list="Gender_ZH" 
            :startMode="true" 
        />
        <tagBox title='绝育状态' :tag-list="SterilizationStatus_ZH" 
            :startMode="true" 
        />
        <tagBox title='花色' :tag-list="Breed_ZH" 
            :startMode="true" 
        />

        <!--FUNC-->
        <view class="flex-center-horizontal btn-group ali">
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
    import { SchoolStatus_ZH, SterilizationStatus_ZH, Gender_ZH, Breed_ZH } from "../../../common/consts";
    // store
    import tagBox from "../../../components/tag/group/tagBox.vue";

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