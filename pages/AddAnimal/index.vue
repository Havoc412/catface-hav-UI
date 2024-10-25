<template>
    <view class="container-top flex-center-vertical">
        <vearCarousel :img-list="data.photos" mode="add" @addImage="addImage" @delete="deleteImage" @setFront="setFront"/>
        <view class="photo-text">
            挑选一些精美的照片作为展示（数量：1~5）
        </view>
        <!--TAG Drag Area-->
        <dragBase :drag-height="200" start-mode="close" :run-full="flag.runFull">
            <view class="ali">
                <!-- TAG Main Form-->
                <up-form
                    labelPosition="left"
                    :model="data"
                    :rules="rules"
                    :labelStyle="{
                        fontSize: '20px',
                        whiteSpace: 'nowrap',
                    }"
                >
                    <!-- Name -->
                    <up-form-item
                        label="名字"
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
                        <nick-names/>
                    </up-form-item>
                    <!-- Gender -->
                    <up-form-item
                        label="性别"
                        prop="data.gender"
                    >
                        <up-radio-group v-model="data.gender">
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
                    <!-- Breed -->
                    <up-form-item
                        label="花色"
                        prop="data.breed"
                        @click="flag.breed = true"
                    >
                        <view class="block relative">
                            <up-input
                                v-model="data.breed"
                                placeholder="请选择 ta 的花色"
                                placeholderStyle="color: #888888"
                                disabledColor="transparent"
                            >
                                <template #suffix v-if="!flag.breedHumanChange">
                                    <!--TODO 等 full body 的模型做好后再修改。-->
                                    <view class="warn-breed">模型根据面部推断，有误请改</view>
                                </template>
                            </up-input>
                            <!--tip 因为 up-input disabled 之后会阻断 click，所以在上层覆盖一个透明的按钮作为遮罩-->
                            <h-btn text="" variant="text"
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
                        <up-radio-group v-model="data.status">
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
                    <!-- Age -->
                    <up-form-item
                        label="年龄"
                        prop="data.age"
                        @click="flag.age = true"
                    >
                        <up-input
                            v-model="ageLinkShow"
                            placeholder="估计一下 ta 的年龄"
                            placeholderStyle="color: #888888"
                            clearable
                        ></up-input>
                        
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
                            placeholder="简单介绍介绍 ta 吧！"
                            placeholderStyle="color: #888888"
                            fixed
                            count
                            :maxlength="255"
                            clearable

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
                    }"
                >
                    <up-divider :hairline="false" text="健康状态信息" lineColor="#888888"
                        @click="flag.healthInfor = !flag.healthInfor">
                        <template #suffix>
                            <h-icon :name="flag.healthInfor ? 'arrow-down' : 'arrow-up'" size="14"/>
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
                            <up-radio-group v-model="data.sterilization">
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
                            <up-radio-group v-model="data.vaccination">
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
                            <up-radio-group v-model="data.deworming">
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
            <bottomFunc/>
            <placeHolder height="190" type="rpx"/>
            <!--Tag 业务逻辑 UI -->
            <view class="flex-center-horizontal gap-5 block mt-10">
                <view class="flex-center-horizontal gap-5 container-btn-left"
                    @click="storeData"
                >
                    <h-icon name="post-store" size="21"/>
                    <view>保存草稿</view>
                </view>
                <view class="flex-center-both container-btn-right shrink"
                    :class="{
                        'disabled': true
                    }"
                    @click="submitData"
                >
                    提交信息
                </view>
            </view>
        </dragBase>
        <pickerGroup
            :breedShow="flag.breed"
            :ageShow="flag.age"
            
            @close-breed="flag.breed = false"
            @close-age="flag.age = false"

            @select-breed="selectBreed"
            @select-age="selectAge"
        />
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    import { Gender, SchoolStatus, SterilizationStatus, VaccinationStatus, DewormingStatus } from "../../common/consts";
    import { extractIntFromSize } from "../../utils/string";

    import nginx from "../../request/nginx";
    // com
    import vearCarousel from "../../components/vear-carousel/vear-carousel.vue";
    import dragBase from "../../components/com/substrate/dragBase.vue";
    
    import name from "../../components/add-animal/name.vue";
    import nickNames from "../../components/add-animal/nick-names.vue";
    import pickerGroup from "./sub-index/pickerGroup.vue";
    import bottomFunc from "./sub-index/bottomFunc.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    // store

// DATA
    const consts = {
        subFontSize: 14,
    }

    const data = reactive({
        photos: [],
        
        name: '',
        gender: '不明',
        breed: '', 
        age: {
            year: '0',
            month: '0',
            week: '0',
            day: '0',
        },
        status: '在校',
        description: '',
        
        sterilization: '不明',
        vaccination: '不明',
        deworming: '不明',
        nick_names: [],
    })
    const rules = reactive({
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
        }
    })

    // flag
    const flag = reactive({
        breed: false,
        breedHumanChange: true,
        age: false,
        healthInfor: false,
        runFull: false,
        nickNames: false,
    })

// FUNC
    const ageLinkShow = computed(() => {
        const fullAge = [data.age.year, data.age.month, data.age.week, data.age.day];
        const parts = [];
        for(let i = 0; i < fullAge.length; i++) {
            if(extractIntFromSize(fullAge[i]) > 0)
                parts.push(fullAge[i]);
        }
        return parts.join('-');
    })
    const selectBreed = (e) => {
        data.breed = e.value[0];
        flag.breed = false;
        flag.breedHumanChange = true;
    }
    const selectAge = (e) => {
        data.age.year = e.value[0];
        data.age.month = e.value[1];
        data.age.week = e.value[2];
        data.age.day = e.value[3];
        flag.age = false;
    }

    function addImage(paths) {
        if(!paths)  return;
        const newFullPath = paths.map(path => {
            return nginx.catsPhotosTemp(path)
        })
        
        data.photos = data.photos.concat(newFullPath);
        console.debug(data.photos);
    }

    function deleteImage(index) {
        data.photos.splice(index, 1)
    }

    function setFront(index) {
        if (index !== -1) {
            const [item] = data.photos.splice(index, 1);
             data.photos.unshift(item);
        }
    }
    
    // TAG 业务
    function storeData() {
        // TODO 保存到数据库
    }

    function submitData() {
        // TODO 提交到数据库
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

.warn-breed-choose {
    color: #777;
    font-size: 25rpx;
}

.container-btn-left {
    background-color: #DAE2E6;
    
    color: #333;
    font-size: 13px;
    
    padding: 10px 15px;
    height: 40px;
    border-radius: 20px;
}

.container-btn-right {
    background-color: #374957;

    font-family: Alimama ShuHeiTi;
    color: #fff;
    font-size: 20px;

    height: 40px;
    border-radius: 20px;
}

.disabled {
    color: #aaa;
}

.photo-text {
    font-family: Alimama ShuHeiTi;
    color: #888;
}

</style>