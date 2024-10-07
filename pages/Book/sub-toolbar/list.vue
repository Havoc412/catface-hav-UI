<template>
    <view class="container flex-vertical">
        <!--TODO 之后换个提示效果-->
        <view style="font-family: Alimama ShuHeiTi;">显示与否</view>
        <template v-for="(item, index) in ITEMS">
            <view class="flex-center-horizontal">
                <view>{{ item }}</view>
                <up-switch v-model="flag[index]"
                    size="28" :activeColor="color['main-deep']"
                    @change="bookStore.setSchoolStatus(index)"
                />
            </view>
        </template>
        <view class="flex-center-horizontal btn-group">
            <u-button :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                border: 'solid 1px #666666'
            }"><span>重置</span></u-button>
            <u-button :customStyle="{
                padding: '10px 0',
                borderRadius: '15px',
                height: '40px',
                backgroundColor: color['main-deep'],
                color: '#ffffff'
            }"><span>完成</span></u-button>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import color from "../../../css/theme/index.module.scss";
    // store
    import book from "../../../store/book";
    const bookStore = book();

// DATA
    const props = defineProps({
    });
    const emits = defineEmits(['close']);
    
    // INFO 需要和 bookStore 中的状态保持一致。
    const ITEMS = ['性别', '在校状态', '绝育状态'];
    const flag = reactive(bookStore.getSchoolStatus);  // TIP 简化写法。

// FUNC

</script>

<style scoped>

.container {
    padding: 20px;

    width: 70vw;
    height: 100%;

    gap: 25px;
    
    background-color: #fff;
    border-bottom-left-radius: 20px;
    
    font-weight: bold;

    /* transition: width 0.5s ease-in-out; */
}

.btn-group {
    position: absolute;
    bottom: 15px;
    width: 88%;

    gap: 20px;
    
    line-height: 18.5px;
    
    background-color: #ffffff;
    padding: 10px 0;
}

span {
    font-size: 16px;    
}
</style>