<template>
    <view class="container-little-cat flex-vertical gap-5 relative">
        <up-image 
            :src="nginx.catsAvatar(props.url)" 
            height="220rpx" width="220rpx" mode="aspectFill" radius="10"
            error-icon="/static/error.svg"
        />  <!--INFO 素材来源于网络-->
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
    });
    const emits = defineEmits([]);

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

</script>

<style scoped>

.container-little-cat {
    border-radius: 10px;
    overflow: hidden;
}

.name {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 16px;
}

</style>        