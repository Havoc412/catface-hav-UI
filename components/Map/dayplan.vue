<template>
    <view class="float-container">
        <view class="flex-center-horizontal">
            <view class="time-container flex-horizontal gap-10">
                <text>DAY {{ props.day }}</text>
                <text class="spot-font">{{ props.spot }}</text>
            </view>
            <view class="flex-horizontal gap-20">
                <u-icon :name="iconPath.detail" size="24"></u-icon>
                <u-icon :name="iconPath.LOGO" size="20"></u-icon>
            </view>
        </view>
        <chipGroupPath class="chips-container" :path="props.path"/>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    import floatBase from "../Com/floatBase.vue";
    import chipGroupPath from "../AiTalk/chipGroupPath.vue";
    // store
    import { useAiIconPath } from "@/store/dataBase";
    const iconPath = useAiIconPath();
// DATA
    const props = defineProps({
        day: {
            type: [Number, String],
            default: 1
        },
        spot: {
            type: String,
            default: "默认地点"
        },
        path: {
            type: Array,
            default: [{
                spot: "暂无规划"
            }]
        },
        moveHeight: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.float-container {
    padding: 5px 15px 15px;
}

.time-container {
    padding: 0 20px;
    background-color: #ffc300;
    border-radius: 15px;
    height: 40px;

    font-family: Alimama ShuHeiTi;
    font-size: 20px;
}

.spot-font {
    color: #FFF;
}

.chips-container {
    padding: 15px 0px 0;
}

</style>        