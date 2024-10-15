<template>
    <view class="flex-vertical container gap-20">
        <view class="title flex-horizontal">
            <!-- <fr-icon-dog theme="outline" :size="40" :fill="['#000000']" />： -->
            {{ props.detectError ? "感谢": "没有查询到目标猫猫，可以" }}补充信息。
        </view>
        <!-- form -->
        <up-form
            labelPosition="left"
            :model="catInfor"
            :rules="rules"
		>
			<up-form-item
                label="名字"
                prop="catInfo.name"
			>
				<up-input
                    v-model="catInfor.name"
                    placeholder="为 ta 起一个好听的名字"
                    placeholderStyle="color: #888888"
                    clearable
				></up-input>
			</up-form-item>
			<up-form-item
                label="性别"
                prop="catInfo.gender"
			>
				<up-radio-group v-model="catInfor.gender" @change="groupChange">
                    <up-radio
                        :customStyle="{marginBottom: '8px', marginRight: '20px'}"
                        v-for="(item, index) in genderList"
                        :key="index"
                        :activeColor="item.color"
                        :label="item.name"
                        :name="item.name"
                    ></up-radio>
                </up-radio-group>
			</up-form-item>
            <up-form-item
                label="种类"
                prop="catInfor.breed"
                @click="flag.breed = true"
            >
                <view class="block relative">
                    <up-input
                        v-model="catInfor.breed"
                        placeholder="请选择 ta 的花色"
                        placeholderStyle="color: #888888"
                        disabled
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
		</up-form>
        <h-btn text="提交" radius="5" :customStyle="{
                backgroundColor: '#C4E9E4'
            }"
            :disabled="!formFinished"
            @click="submit"
        />
        <up-picker
            :show="flag.breed"
            :columns="breedList"
            title="请选择猫猫种类"
            :closeOnClickOverlay="true"
            @cancel="flag.breed=false"
            @confirm="selectBreed"
        ><!--info 改了官方的源码，加了一个插槽-->
            <template #top>
                <view class="warn-breed-choose flex-center-both">暂时只支持以下种类</view>
            </template>
        </up-picker>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        breedFromModel: {
            type: String,
            default: ""
        },
        detectError: {
            type: Boolean,
            default: false
        }
    });
    const emits = defineEmits(['submit']);

    const catInfor = reactive({
        name: '',
        gender: '',
        breed: '', // todo 之后可以由 Yolo 识别。
    })
    const rules = reactive({
        'catInfo.name': {
            type: 'string',
            required: true,
            message: "请起一个名字吧。"
        },
        'catInfo.gender': {
            type: 'string',
            required: true,
            message: "请选择一个性别。"
        },
        'catInfor.breed': {
            type: 'string',
            required: true,
            message: "请选择一个花色。"
        }
    })

    // flag
    const flag = reactive({
        breed: false,
        breedHumanChange: false,
    })

    // style && db
    const genderList = reactive([
        { name: "公", color: "#8bc0c6" },
        { name: "母", color: "#ce86ab" },
        { name: "不明", color: "#988fd0" },
    ])
    const breedList = reactive([
        ["橘猫", "橘白猫", "狸花猫", "狸白猫", "奶牛猫", "三花猫", "黑猫", "白猫"] // todo , "特殊品种"]
    ])

// FUNC
    onMounted(() => {
        catInfor.breed = props.breedFromModel;
        console.info(catInfor, props.breedFromModel);
    });

    const groupChange = (n) => {
        console.log('groupChange', n, catInfor.gender);
    };

    const selectBreed = (e) => {
        catInfor.breed = e.value[0];
        flag.breed = false;
        flag.breedHumanChange = true;
        // console.info(e, catInfor.breed);
    }

    const submit = () => {
        emits('submit', catInfor);
    }

    // style

    const formFinished = computed(() => {
        return catInfor.name != '' && catInfor.sex != '' && catInfor.breed != '';
    })

</script>

<style scoped>
    .container {
        font-family: Alimama ShuHeiTi;
        margin: 0 20rpx;
    }

    .title {
        font-size: 35rpx;
        min-width: 600rpx;
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

</style>