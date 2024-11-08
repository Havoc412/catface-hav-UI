<template>
    <view class="container-little-cat flex-vertical"
        :style="{
            '--border-color': flag || unselectedOnly ? color['main-green-light'] : 'transparent'
        }"
        @click="click"
    >
        <view class="relative">
            <view v-if="flag || unselectedOnly" class="absolute" style="top: 5px; left: 5px;">
                <h-icon name="status-select_full"/>
            </view>
            <up-image 
                :src="nginx.catsAvatar(props.url)" 
                height="230rpx" width="230rpx" mode="aspectFill" radius="10"
                error-icon="/static/error.svg"
            />  <!--INFO 素材来源于网络-->
            <view v-if="selectMode" class="absolute" style="top: 2px; right: 5px;" @click.stop="showNickNames">
                <h-icon name="com-more" size="14"/>
            </view>
            <view v-show="nickNamesShow" class="absolute nick-names">
                {{ props.nickNames }}
            </view>
        </view>
        <view class="flex-horizontal gap-5 mt-2">
            <view class="name">{{ props.name }}</view>
            <h-icon v-show="bookStore.gender" :name="genderSvg" size="15"/>
            <view class="shrink"/>
            <department-status mode="ellipsis" :type="props.department" />
        </view>
    </view>
</template>

<script setup>
    import { ref, computed, watch } from "vue";

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
        nickNames: {
            type: String,
            default: "NoName"
        },
        nickNamesHit: Boolean, // 是否通过 nickName 命中目标？
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
    const selectMode = computed(() => {
        return props.mode.startsWith('select')
    })

    const flag = ref(unselectedOnly);
    
    const nickNamesShow = ref(false);
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

    function showNickNames() {
        nickNamesShow.value = true;
        setTimeout(() => {
            nickNamesShow.value = false;
        }, 3000);
    }

    watch(() => props.nickNamesHit, (newVal) => {
        if(newVal) showNickNames();
    })

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

.nick-names {
    position: absolute;
    left: 0;
    bottom: 0;

    width: 100%;

    font-size: 14px;
    padding: 2px 5px;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .3) 30%, rgba(0, 0, 0, 0.6) 100%);
    color: #fff;
    border-radius: 0 0 5px 5px;
}

</style>        