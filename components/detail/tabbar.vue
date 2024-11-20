<template>
    <tabberBase position="fixed" padding="10rpx" :bg-color="color['main-light']"
        :customStyle="{
            'box-shadow': '0px 0px 5px 1px #888'
        }">
        <template #prefix>
            <view class="flex-center-horizontal gap-10">
                <h-btn preIcon="detail-write" iconSize="25" :customStyle="{
                    fontWeight: 'bold',
                    padding: '20rpx'
                }" @click="emits('gotoEnc')">
                    路遇上传
                </h-btn>
                <h-btn preIcon="detail-paw" iconSize="25" :customStyle="{
                    fontWeight: 'bold',
                    padding: '20rpx'
                }" @click="emits('gotoRag')">
                    小护日记
                </h-btn>
                <h-btn
                    :icon="flag.menu ? 'com-close' : 'com-more_deep'"
                    iconSize="25"
                    btnSizeWhenCircle="40"
                    @click="flag.menu = !flag.menu"
                >
                    <template #absolute>
                        <menuFloat mode="text" 
                            :list="CONSTS.FUNC_LIST"
                            :show="flag.menu"
                            :customStyle="{
                                bottom: '65px',
                            }"
                            @choose="(id) => funcGoto(id)"
                        />
                    </template>
                </h-btn>
            </view>
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
    import tabberBase from "../com/substrate/tabberBase.vue";
    import menuFloat from "../float-menu/menuFloat.vue";

    // store
// DATA
    const props = defineProps({
        like: {
            type: Boolean,
            default: false
        }
    });
    const emits = defineEmits(['gotoEnc', 'gotoRag']);
    
    const flag = reactive({
        heart: props.like,
        menu: false,
    });

    const CONSTS = {
        FUNC_LIST: [{ text: '领养申请' }, { text: '领养推荐' }],
    }
// FUNC
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })

    // Router
    function funcGoto(id) {
        flag.menu = false;
    }

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