<template>
    <view class="container-little-cat flex-vertical"
        :style="{
            '--border-color': flag || unselectedOnly ? color['main-green-light'] : 'transparent'
        }"
        @click="click"
    >
        <view class="relative">
            <view v-if="flag || unselectedOnly" class="absolute" style="top: 5px; right: 5px;">
                <h-icon name="status-select_full"/>
            </view>
            <up-image 
                :src="nginx.catsAvatar(props.url)" 
                height="230rpx" width="230rpx" mode="aspectFill" radius="10"
                error-icon="/static/error.svg"
            />  <!--INFO 素材来源于网络-->
        </view>
        <view class="flex-horizontal gap-5">
            <view class="name">{{ props.name }}</view>
            <h-icon v-show="bookStore.gender" :name="genderSvg" size="15"/>
            <view class="shrink"/>
            <department-status mode="ellipsis" :type="props.department" />
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";

    import color from "@/css/theme/index.module.scss";
    import nginx from "../../request/nginx";
    import { Gender_EN, getFrontIndex } from "../../common/consts";
    // com
    import departmentStatus from "./sub-cat/departmentStatus.vue";
    // store
    import book from "../../store/book";
    const bookStore = book();
// DATA
    const props = defineProps({
        id: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "毛茸茸"
        },
        schoolStatus: {
            type: [String, Number],
            default: "inschool"
        },
        gender: {
            type: [String, Number],
            default: "boy"
        },
        department: {
            type: [String, Number],
            default: "other"
        },
        // sterilizationStatus: {
        //     type: [String, Number],
        //     default: "unknown"
        // },
        url: {
            type: String,
            default: "/static/err.svg"
        },
        mode: {
            type: String,
            default: "default" // INFO || select || select-only || select-un-only
        }
    });
    const emits = defineEmits(['select', 'unselect']);

    // Mode
    const unselectedOnly = computed(() => {
        return props.mode === 'select-un-only'
    })

    const flag = ref(unselectedOnly);
// FUNC
    // STYLE
    const genderSvg = computed(() => {
        if(typeof props.gender === 'string')
            return `gender-${props.gender}`;
        else {
            const name = `gender-${Gender_EN[getFrontIndex(props.gender, Gender_EN.length)]}`;
            return name;
        }
    })

    // 
    function click() {
        if (!props.mode.startsWith('select')) return;

        emits(!flag.value ? 'select' : 'unselect', props.id);
        if(props.mode !== 'select-only')
            flag.value = !flag.value;
    }

</script>

<style scoped>

.container-little-cat {
    border-radius: 10px;
    overflow: hidden;

    border-top: 4px solid var(--border-color);
    border-bottom: 4px solid var(--border-color);
    box-sizing: border-box; /* 确保边框计入高度和宽度 */
}

.name {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 16px;
}

</style>        