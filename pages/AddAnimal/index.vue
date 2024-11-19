<template>
    <view class="container-top flex-center-vertical">
        <vearCarousel :img-list="dataShow.photos" mode="add" @addImage="addImage" @delete="deleteImage" @setFront="setFront"/>
        <view class="photo-text">
            挑选一些精美的照片作为展示（数量：1~5）
        </view>
        <!--TAG Drag Area-->
        <dragBase :closeTopHeightFir="1100" start-mode="close" :run-full="flag.runFull">
            <view class="ali">
                <!-- TAG Main Form-->
                <up-form
                    labelPosition="left"
                    :model="data"
                    :rules="rules"
                    :labelStyle="{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                    }"
                >
                    <!-- Name -->
                    <up-form-item
                        label="名字*"
                        prop="data.name"
                    >
                        <name
                            @nickNames="flag.nickNames = true"
                            @name="(name) => { data.name = name; }"
                        />
                    </up-form-item>
                    <!--Nick Name--> <!--TODO 如何不那么显眼？-->
                    <up-form-item
                        v-if="flag.nickNames"
                        label="别称"
                        prop="data.nick_names"
                    >
                        <nick-names @change="(nickNames) => { data.extra.nick_names = nickNames; }"/>
                    </up-form-item>
                    <!-- Breed -->
                    <up-form-item
                        label="花色*"
                        prop="data.breed"
                        @click="flag.breed = true"
                    >
                        <view class="block relative">
                            <up-input
                                v-model="dataShow.breed"
                                readonly
                                placeholder="请选择 ta 的花色"
                                placeholderStyle="color: #888888"
                            >
                                <template #suffix v-if="!flag.breedHumanChange">
                                    <!--TODO 等 full body 的模型做好后再修改。-->
                                    <view class="warn-breed">模型根据面部推断，有误请改</view>
                                </template>
                            </up-input>
                            <!--tip 因为 up-input disabled 之后会阻断 click，所以在上层覆盖一个透明的按钮作为遮罩-->
                            <h-btn 
                                text="" variant="text" radius="5" activeColor="transparent"
                                :customStyle="{
                                    position: 'absolute', 
                                    top: 0, left: 0,
                                    width: '100%',
                                    height: '100%', 
                                    background: 'transparent', 
                                    border: 'none'
                                }" @click="flag.breed = true"
                            ></h-btn>
                        </view>
                    </up-form-item>
                    <!-- Status -->
                    <up-form-item
                        label="学业"
                        prop="data.status"
                    >
                        <up-radio-group v-model="dataShow.status">
                            <up-radio
                                :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                                v-for="(item, index) in SchoolStatus"
                                :key="index"
                                :activeColor="item.color"
                                :label="item.zh"
                                :name="item.zh"
                            ></up-radio>
                        </up-radio-group>
                    </up-form-item>
                    <!-- Department -->
                    <up-form-item
                        label="就读*"
                        prop="data.department"
                    >
                        <view class="block relative">
                            <up-input
                                v-model="dataShow.department"
                                readonly
                                placeholder="请选择出没区域"
                                placeholderStyle="color: #888888"
                            >
                            </up-input>
                            <!--tip 因为 up-input disabled 之后会阻断 click，所以在上层覆盖一个透明的按钮作为遮罩-->
                            <h-btn 
                                text="" variant="text" radius="5" activeColor="transparent"
                                :customStyle="{
                                    position: 'absolute', 
                                    top: 0, left: 0,
                                    width: '100%',
                                    height: '100%', 
                                    background: 'transparent', 
                                    border: 'none'
                                }" @click="flag.department = true"
                            ></h-btn>
                        </view>
                        <!-- <up-radio-group v-model="dataShow.department">
                            <up-radio
                                :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                                v-for="(item, index) in Department"
                                :key="index"
                                :activeColor="item.color"
                                :label="item.zh"
                                :name="item.zh"
                            ></up-radio>
                        </up-radio-group> -->
                    </up-form-item>
                    <!-- Gender -->
                    <up-form-item
                        label="性别"
                        prop="data.gender"
                    >
                        <up-radio-group v-model="dataShow.gender">
                            <up-radio
                                :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                                v-for="(item, index) in Gender"
                                :key="index"
                                :activeColor="item.color"
                                :label="item.zh"
                                :name="item.zh"
                            ></up-radio>
                        </up-radio-group>
                    </up-form-item>
                    <!-- Age -->
                    <up-form-item
                        label="年龄"
                        prop="data.age"
                        @click="flag.age = true"
                    >
                        <view class="block relative">
                            <up-input
                                v-model="dataShow.ageLinkShow"
                                readonly
                                placeholder="估计一下 ta 的年龄"
                                placeholderStyle="color: #888888"
                            ></up-input>
                            <!--tip 因为 up-input disabled 之后会阻断 click，所以在上层覆盖一个透明的按钮作为遮罩-->
                            <h-btn 
                                text="" variant="text" radius="5" activeColor="transparent"
                                :customStyle="{
                                    position: 'absolute', 
                                    top: 0, left: 0,
                                    width: '100%',
                                    height: '100%', 
                                    background: 'transparent', 
                                    border: 'none'
                                }" @click="flag.age = true"
                            ></h-btn>
                        </view>
                    </up-form-item>
                    <!-- Des -->
                    <up-divider :hairline="false" :dot="true" lineColor="#888888"></up-divider>
                    <up-form-item
                        label="描述"
                        prop="data.description"
                        labelPosition="top"
                    >
                        <up-textarea
                            v-model="data.description"
                            placeholder="简单介绍一下 ta 吧！"
                            placeholderStyle="color: #888888"
                            fixed
                            count
                            :maxlength="255"
                            clearable
                            :show-confirm-bar="false"
                            @focus="flag.runFull = !flag.runFull"
                        ></up-textarea>
                        <!--TODO Tags 相关的内容放到这里。-->
                    </up-form-item>
                
                </up-form>
                <!-- TAG Health ；大多数情况下这些信息并不知道，这个表单可收缩才好 -->
                <up-form
                    labelPosition="left"
                    :model="data"
                    :labelStyle="{
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }"
                >
                    <up-divider :hairline="false" text="健康状态信息" lineColor="#888888"
                        @click="flag.healthInfor = !flag.healthInfor">
                        <template #suffix>
                            <view style="margin-right: 15px;">
                                <h-icon :name="flag.healthInfor ? 'arrow-down_thin_x' : 'arrow-up_thin_x'" size="14"/>
                            </view>
                        </template>
                    </up-divider>
                    <!-- Other body information -->
                    <!-- Sterilized -->
                    <view class="animation-height"
                    :style="{
                        'height': flag.healthInfor ? '400rpx' : '0'
                    }">
                        <up-form-item
                            label="绝育状态"
                            prop="data.sterilization"
                        >
                            <up-radio-group v-model="dataShow.sterilization">
                                <up-radio
                                    :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                                    v-for="(item, index) in SterilizationStatus"
                                    :key="index"
                                    :activeColor="item.color"
                                    :label="item.zh"
                                    :name="item.zh"
                                ></up-radio>
                            </up-radio-group>
                        </up-form-item>
                        <!-- Vaccine -->
                        <up-form-item
                            label="疫苗情况"
                            prop="data.vaccination"
                        >
                            <up-radio-group v-model="dataShow.vaccination">
                                <up-radio
                                    :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                                    v-for="(item, index) in VaccinationStatus"
                                    :key="index"
                                    :activeColor="item.color"
                                    :label="item.zh"
                                    :name="item.zh"
                                ></up-radio>
                            </up-radio-group>
                        </up-form-item>
                        <!-- deworming -->
                        <up-form-item
                            label="驱虫情况"
                            prop="data.deworming"
                        >
                            <up-radio-group v-model="dataShow.deworming">
                                <up-radio
                                    :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                                    v-for="(item, index) in DewormingStatus"
                                    :key="index"
                                    :activeColor="item.color"
                                    :label="item.zh"
                                    :name="item.zh"
                                ></up-radio>
                            </up-radio-group>
                        </up-form-item>
                    </view>
                    <up-divider :hairline="false" :dot="true" lineColor="#888888"></up-divider>
                </up-form>
            </view>
            <!-- INFO Func-->
            <bottomFunc poi catface @getPoi="getPoi"/>
            <placeHolder height="200" type="rpx"/>
            <view class="shrink"/>
            <!--Tag 业务逻辑 UI -->
            <bottomSubmit 
                :submitAbled="submitAbled"
                :customStyle="{
                }"
                @storeData="storeData"
                @submitData="submitData"
            /> 
            <placeHolder height="25" type="rpx"/>
        </dragBase>
        <pickerGroup
            :breedShow="flag.breed"
            :ageShow="flag.age"
            :departmentShow="flag.department"
            
            @close-breed="flag.breed = false"
            @close-age="flag.age = false"
            @close-department="flag.department = false"

            @select-breed="selectBreed"
            @select-age="selectAge"
            @select-department="selectDepartment"
        />
        <!--状态加载-->
        <statusWin v-if="flag.status.show" :status="flag.status.type"/>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    import { 
        getAttrIndex, 
        Gender, Department, SchoolStatus, SterilizationStatus, VaccinationStatus, DewormingStatus,
        Gender_ZH, Departments_ZH, SchoolStatus_ZH, SterilizationStatus_ZH, VaccinationStatus_ZH, DewormingStatus_ZH, Breed_ZH
    } from "../../common/consts";
    import { extractIntFromSize } from "../../utils/string";
    import { calculateBirthday } from "../../utils/date";

    import nginx from "../../request/nginx";
    import api from "../../request/animal";
    // com
    import vearCarousel from "../../components/vear-carousel/vearCarousel.vue";
    import dragBase from "../../components/com/substrate/dragBase.vue";
    
    import name from "../../components/add-animal/name.vue";
    import nickNames from "../../components/add-animal/nick-names.vue";
    import pickerGroup from "./sub-index/pickerGroup.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import statusWin from "../../components/status-win/statusWin.vue";

    import bottomFunc from "../../components/bottomFunc/bottomFunc.vue";
    import bottomSubmit from "../../components/bottomFunc/bottomSubmit.vue";
    // store

// DATA
    const consts = {
        subFontSize: 14,
    }

    const data = reactive({  // 用于访问 API 的格式化后的数据
        // user_id 由 API 补充；
        name: '',
        breed: 0,
        gender: 0,
        status: 0,
        department: 0,
        
        birthday: '',  // eg. 2024-10-05
        description: '',
        healthy: {
            sterilization: 0,
            vaccination: 0,
            deworming: 0,
        },

        photos: [],
                
        poi: {},
        
        extra: {
            nick_names: [],
            tags: []
        }
    })
    const dataShow = reactive({  // 前端展示用的数据。
        // 直到最后访问 API 的时候，处理为 uint8 等数据。
        ageLinkShow: "",
        gender: '不明',
        breed: '',
        status: '在校',
        department: '',

        photos: [],
        
        sterilization: '不明',
        vaccination: '不明',
        deworming: '不明',
    })
    
    const rules = reactive({ // TODO 暂时没有用到。
        'data.name': {
            type: 'string',
            required: true,
            message: "请起一个名字吧。"
        },
        'data.gender': {
            type: 'string',
            required: true,
            message: "请选择一个性别。"
        },
        'data.breed': {
            type: 'string',
            required: true,
            message: "请选择一个花色。"
        },
        'data.department': {
            type: 'string',
            required: true,
            message: "请选择一个部门。"
        }
    })

    // flag
    const flag = reactive({
        breed: false,
        breedHumanChange: true,
        age: false,
        department: false,
        
        healthInfor: false,
        runFull: false,
        nickNames: false,
        
        status: {
            show: false,
            type: "loadding"
        },
    })

// FUNC
    const selectBreed = (e) => {
        dataShow.breed = e.value[0];
        flag.breed = false;
        flag.breedHumanChange = true;
    }
    function selectDepartment(e) {
        dataShow.department = e.value[0];
        flag.department = false;
    }
    const selectAge = (e, dateModeFlag) => {
        if (!dateModeFlag) {
            // show
            const parts = [];
            const intAge = [];  // 只保留 int 的数组；
            for(let i = 0; i < e.value.length; i++) {
                const item = extractIntFromSize(e.value[i]);
                intAge.push(item);
                if(item > 0)
                    parts.push(e.value[i]);
            }
            dataShow.ageLinkShow = parts.join('-');
        
            // format
            const [year, month, week = 0, day = 0] = intAge;
            data.birthday = calculateBirthday(year, month, week, day);
        } else {
            // show
            dataShow.ageLinkShow = e.value.join('-')

            // format
            let [year, month, day] = e.value;
            year = extractIntFromSize(year);
            month = extractIntFromSize(month).toString().padStart(2, '0');  // TIP fix 1 -> 01 这样的作用
            day = extractIntFromSize(day).toString().padStart(2, '0');
            data.birthday = `${year}-${month}-${day}`;
        }
        console.debug(data.birthday);

        flag.age = false;
    }

    // TAG rules
    const submitAbled = computed(() => {
        // INFO 必须手填的信息：Name、Breed、Description、
        return data.name !== ''
            && dataShow.breed !== ''
            && dataShow.department !== ''
            // && data.photos.length !== 0;
    })


    // TAG Images；Photos
    function addImage(paths) {
        if(!paths)  return;
        data.photos = data.photos.concat(paths);
        
        // 展示用临时路径。
        const newFullPath = paths.map(path => {
            return nginx.catsPhotosTemp(path)
        })
        
        dataShow.photos = dataShow.photos.concat(newFullPath);
        console.debug(dataShow.photos, data.photos);
    }

    function deleteImage(index) {
        data.photos.splice(index, 1);
        dataShow.photos.splice(index, 1);
    }

    function setFront(index) {
        if (index !== -1) {
            const [item] = data.photos.splice(index, 1);
            data.photos.unshift(item);
            dataShow.photos.unshift(dataShow.photos.splice(index, 1)[0]);
        }
    }

    // TAG additional functions
    function getPoi(poi) {
        data.poi = poi;  // 接受一个 { latitude: xx, longitude: xx};
        console.debug(data.poi);
    }

    function catFace() {
        
    }
    
    // TAG 业务
    function storeData() {
        // TODO 缓存本地？但是有效性如何？会不会被清理，何时被清理。
    }

    async function submitData() {
        // STAGE-1 Format
        data.breed = getAttrIndex(dataShow.breed, Breed_ZH);
        data.gender = getAttrIndex(dataShow.gender, Gender_ZH);
        data.department = getAttrIndex(dataShow.department, Departments_ZH);
        data.status = getAttrIndex(dataShow.status, SchoolStatus_ZH);
        data.healthy.sterilization = getAttrIndex(dataShow.sterilization, SterilizationStatus_ZH);
        data.healthy.vaccination = getAttrIndex(dataShow.vaccination, VaccinationStatus_ZH);
        data.healthy.deworming = getAttrIndex(dataShow.deworming, DewormingStatus_ZH);
        console.info(data);
        // STAGE-2 提交
        flag.status = 'loadding';
        flag.show = true;
        // TEST *2
        // console.debug(data);
        // return;
        const [res, err] = await api.addAnimal(data);
        if (err) {
            flag.status = 'err';
            // TODO 错误处理
        } else {
            flag.show = false;
            // 然后跳转进详细页。
            uni.redirectTo({
                url: `/pages/Detail/index?id=${res.anm_id}`
            })
        }
    }

</script>

<style scoped>

.container-top {
    margin: 0 10rpx;
}

.warn-breed {
    position: absolute;
    right: 10rpx;

    font-size: 25rpx;
    color: #777;
}

.photo-text {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    color: #888;
}

</style>