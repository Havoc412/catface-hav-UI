<template>
    <view class="container-filter flex-vertical">
        <view class="flex-vertical gap-5 container-top z-9">
            <view class="ali bold"># 条件过滤</view>
            <tip>选择后点击下方【完成】</tip>
        </view>

        <!-- <view class="flex-vertical container-context shrink"> -->
            <tagBox ref="statusRef" title='学业状态' :tag-list="SchoolStatus_ZH" :startMode="true"
                :startUnselectedList="stringToNumberArray(props.statusCache.status)" :refresh="refreshFlag" />
            <tagBox ref="departmentRef" title='就读学部' :tag-list="Departments_ZH" :startMode="true"
                :startUnselectedList="stringToNumberArray(props.statusCache.department)" :refresh="refreshFlag" />
            <tagBox ref="breedRef" title='花色' :tag-list="Breed_ZH" :startMode="true"
                :startUnselectedList="stringToNumberArray(props.statusCache.breed)" :refresh="refreshFlag" />
            <tagBox ref="genderRef" title='性别' :tag-list="Gender_ZH" :startMode="false"
                :startUnselectedList="stringToNumberArray(props.statusCache.gender)" :refresh="refreshFlag" />
            <tagBox ref="sterilizationRef" title='绝育状态' :tag-list="SterilizationStatus_ZH" :startMode="false"
                :startUnselectedList="stringToNumberArray(props.statusCache.sterilization)" :refresh="refreshFlag" />
        <!-- </view> -->

        <view class="shrink"/>
        <!--FUNC-->
        <view class="flex-center-horizontal btn-group ali">
            <u-button @click="reset" :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                border: 'solid 1px #666666'
            }"><span>重置</span></u-button>
            <u-button @click="getFilterConditions" :customStyle="{
                padding: '10px 0',
                fontWeight: 'bold',
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

    import { BookFilterConditions } from "../../../common/consts-style";
    import color from "@/css/theme/index.module.scss";

    import { stringToNumberArray } from "../../../utils/string";
    import { SchoolStatus_ZH, SterilizationStatus_ZH, Gender_ZH, Breed_ZH, Departments_ZH } from "../../../common/consts";
    // store
    import tip from "../../../components/com/tip.vue";
    import tagBox from "../../../components/tag/group/tagBox.vue";

// DATA
    const props = defineProps({
        statusCache: {
            type: Object,
            default: () => ({
                status: "2,3",
                gender: "",
                breed: "",
                sterilization: "",
                department: ""
            })
        }
    });
    const emits = defineEmits(['close', 'getFilterConditions']);
    
    const statusRef = ref(null);
    const genderRef = ref(null);
    const sterilizationRef = ref(null);
    const breedRef = ref(null);
    const departmentRef = ref(null);

    const refreshFlag = ref(false);
// FUNC
    function reset() {
        statusRef.value.init(stringToNumberArray(BookFilterConditions.status));
        genderRef.value.init(stringToNumberArray(BookFilterConditions.gender));
        sterilizationRef.value.init(stringToNumberArray(BookFilterConditions.sterilization));
        breedRef.value.init(stringToNumberArray(BookFilterConditions.breed));
        departmentRef.value.init(stringToNumberArray(BookFilterConditions.department));
    }

    function getFilterConditions() {
        const conditions = {
            status: statusRef.value.getSelectedList(),
            gender: genderRef.value.getSelectedList(),
            sterilization: sterilizationRef.value.getSelectedList(),
            breed: breedRef.value.getSelectedList(),
            department: departmentRef.value.getSelectedList(),
        };
        console.info(conditions);
        emits('getFilterConditions', conditions);
        
        emits('close')
    }

</script>

<style scoped>

.container-top {
    position: sticky;
    top: 0;

    padding-top: 20px;
    padding-bottom: 10px;

    background-color: #ffffff;
}

.container-filter {
    padding: 0 15px;

    width: 70vw;
    height: 100%;

    overflow-y: scroll;
    gap: 10px;
    
    background-color: #fff;
    border-bottom-left-radius: 20px;

    /* transition: width 0.5s ease-in-out; */
}

.btn-group {
    position: fixed;
    bottom: 0px;
    width: 63vw;

    gap: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
    
    line-height: 18.5px;

    background-color: #ffffff;
}

span {
    font-size: 16px;    
}

</style>