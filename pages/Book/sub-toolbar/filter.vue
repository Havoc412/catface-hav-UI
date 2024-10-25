<template>
    <view class="container-filter flex-vertical">
        <view class="flex-center-vertical gap-5">
            <view class="ali"># 条件过滤</view>
            <tip>选择后点击下方【完成】</tip>
        </view>
        <tagBox ref="statusRef"
            title='学业状态' :tag-list="SchoolStatus_ZH" 
            :startMode="true" 
            :startUnselectedList="stringToNumberArray(props.statusCache.status)"
            :refresh="refreshFlag"
        />
        <tagBox ref="genderRef"
            title='性别' :tag-list="Gender_ZH" 
            :startMode="true"
            :startUnselectedList="stringToNumberArray(props.statusCache.gender)"
            :refresh="refreshFlag"
        />
        <tagBox ref="sterilizationRef"
            title='绝育状态' :tag-list="SterilizationStatus_ZH" 
            :startMode="true"
            :startUnselectedList="stringToNumberArray(props.statusCache.sterilization)"
            :refresh="refreshFlag"
        />
        <tagBox ref="breedRef"
            title='花色' :tag-list="Breed_ZH" 
            :startMode="true" 
            :startUnselectedList="stringToNumberArray(props.statusCache.breed)"
            :refresh="refreshFlag"
        />

        <!--FUNC-->
        <view class="flex-center-horizontal btn-group ali">
            <u-button
                @click="refreshFlag = !refreshFlag"
                :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                border: 'solid 1px #666666'
            }"><span>重置</span></u-button>
            <u-button 
                @click="getFilterConditions"
                :customStyle="{
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

    import { stringToNumberArray } from "../../../utils/string";
    import { SchoolStatus_ZH, SterilizationStatus_ZH, Gender_ZH, Breed_ZH } from "../../../common/consts";
    // store
    import tip from "../../../components/com/tip.vue";
    import tagBox from "../../../components/tag/group/tagBox.vue";


// DATA
    const props = defineProps({
        statusCache: {
            type: Object,
            default: () => ({
                status: "0,1,2",
                gender: "",
                breed: "",
                sterilization: ""
            })
        }
    });
    const emits = defineEmits(['close', 'getFilterConditions']);
    
    const statusRef = ref(null);
    const genderRef = ref(null);
    const sterilizationRef = ref(null);
    const breedRef = ref(null);

    const refreshFlag = ref(false);
// FUNC
    function getFilterConditions() {
        const conditions = {
            status: statusRef.value.getSelectedList(),
            gender: genderRef.value.getSelectedList(),
            sterilization: sterilizationRef.value.getSelectedList(),
            breed: breedRef.value.getSelectedList()
        };
        emits('getFilterConditions', conditions);
        
        emits('close')
    }

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