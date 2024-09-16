<template>
    <up-overlay :show="flag" opacity=".2" @click="flag = false">
        <view class="container-notice flex-center-vertical z-9">
        <view class="title">!!猫猫の近况提醒!!</view>
        <view class="container flex-vertical gap-10">
            <template v-for="(item, index) in props.notices" :key="index">
                <item :notice="item"/>
            </template>
        </view>
    </view>
    </up-overlay>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    // com
    import item from "../../../components/catface/notice/item.vue";
    // store

// DATA
    const props = defineProps({
        notices: {
            type: Object,
            default: () => [{
                "id": 0,
                "content": "测试通知内容。",
                "human": "小护",
                "time": "2024-9-15",
                "name": "Hu"
            }]
        }
    });
    const emits = defineEmits([]);

    const flag = ref(true);

// FUNC
    onMounted(() => {
        flag.value = true;
    })

</script>

<style scoped>

.container {
    width: 90%;
}

.container-notice {
    margin: auto;
    min-height: 50%;
    max-height: 80%;
    width: 90%;
    padding: 10rpx;

    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
}

.title {
    color: #fc4b4b;
    font-family: Alimama ShuHeiTi;
    font-size: 40rpx;

    margin-bottom: 30rpx;
}

</style>        