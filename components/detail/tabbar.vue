<template>
    <tabberBase position="fixed" padding="10rpx" :bg-color="color['main-light']">
        <template #prefix>
            <funcGroup/>
        </template>
        <template #fixed>
            <view class="contanier-heart flex-center-vertical absolute z-0">
                <h-icon :name="heartSvg" @click="flag.heart = !flag.heart"/>
            </view>
        </template>
    </tabberBase>
</template>

<script setup>
    import { reactive, computed } from "vue";

    import color from "@/css/theme/index.module.scss";
    console.info(color);
    import tabberBase from "../com/substrate/tabberBase.vue";

    import funcGroup from "./sub-tabbar/funcGroup.vue";
    // store
// DATA
    const props = defineProps({
        like: {
            type: Boolean,
            default: false
        }
    });
    const emits = defineEmits([]);
    
    const flag = reactive({
        heart: props.like
    });
// FUNC
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })

</script>

<style scoped>

.contanier-heart {
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    
    height: 45px;
    width: 45px;

    right: 15px;
    top: -15px;
    box-shadow: 0px 0px 5px 1px #ccc;
}

</style>        