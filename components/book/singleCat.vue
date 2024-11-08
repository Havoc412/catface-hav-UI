<template>
    <view class="flex-vertical gap-10" @click="emits('click', props.id)">
        <view class="container-img relative">
            <up-image :src="propsMode ? props.url : nginx.catsAvatar(props.url)" height="250" width="350rpx"
                mode="aspectFill" radius="25" error-icon="/static/error.svg" /> <!--INFO 素材来源于网络-->
            <view class="contanier-heart flex-center-both absolute z-0" @click.stop>
                <h-icon :name="heartSvg" size="18" @click="like" />
            </view>
        </view>
        <view class="flex-center-horizontal gap-5">
            <view class="name">{{ props.name }}</view>
            <!--INFO 不同显示的样式-->
            <h-icon v-show="propsMode ? props.compomentStatus[0] : bookStore.gender" :name="genderSvg" size="18" />
            <view class="shrink" />
            <school-status v-show="propsMode ? props.compomentStatus[1] : bookStore.school"
                :type="props.schoolStatus" />
            <!--TODO props 模式下还是有bug。-->
            <department-status v-show="propsMode ? props.compomentStatus[2] : bookStore.department" :mode="propsMode ? departmentMode : bookStore.departmentMode"
                :type="props.department" />
            <sterilization-status v-show="propsMode ? props.compomentStatus[3] : bookStore.sterilization"
                :type="props.sterilizationStatus" />
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed, watch } from "vue";

    import api from "../../request/animal";

    import { Gender_EN, GetFrontIndex } from "../../common/consts";
    // com
    import schoolStatus from "./sub-cat/schoolStatus.vue";
    import sterilizationStatus from "./sub-cat/sterilizationStatus.vue";
    import departmentStatus from "./sub-cat/departmentStatus.vue";
    import nginx from "../../request/nginx";
    // store
    import book from "../../store/book";
    const bookStore = book();
// DATA
    const props = defineProps({
        ctlMode: {
            type: String,
            default: "default" // INFO 默认采取 Book 的状态控制，获取启用 props 的控制。
        },
        id: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "毛茸茸"
        },
        gender: {
            type: [String, Number],
            default: "boy"
        },
        schoolStatus: {
            type: [String, Number],
            default: "inschool"
        },
        sterilizationStatus: {
            type: [String, Number],
            default: "unknown"
        },
        department: {
            type: [String, Number],
            default: "other"
        },
        url: {
            type: String,
            default: "/static/err.svg"
        },
        like: {
            type: Boolean,
            default: false
        },
        // TAG ctl by props
        compomentStatus: Array,  // 一个 []Boolean; ctlMode = 'props' 下有效。
    });
    const emits = defineEmits(['click']);

    const flag = reactive({
        heart: props.like,
        departmentMode: 'default',
    })

// FUNC
    // STYLE
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })
    const genderSvg = computed(() => {
        if(typeof props.gender === 'string')
            return `gender-${props.gender}`;
        else {
            const name = `gender-${Gender_EN[GetFrontIndex(props.gender, Gender_EN.length)]}`;
            return name;
        }
    })

    // Mode
    const propsMode = computed(() => {
        return props.ctlMode === 'props';
    })

    // Flag
    async function like() {
        flag.heart = !flag.heart;

        if (propsMode.value)
            return;
        api.clickLike(props.id, flag.heart);
    }

    const departmentMode = computed(() => {
        return (props.compomentStatus[1] && props.compomentStatus[2] && props.compomentStatus[3] ) ? 'ellipsis' : 'default';
    })

</script>

<style scoped>

.container-img {
    border-radius: 25px;
}

.contanier-heart {
    background-color: #fff;
    border-radius: 50%;
    
    height: 45px;
    width: 45px;

    left: 15px;
    bottom: 25px;
    box-shadow: 0px 0px 5px 1px #ccc;
}

.name {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 17px;
    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    /* 隐藏超出部分 */
    text-overflow: ellipsis;
    /* 显示省略号 */
}
</style>