<template>
    <view class="flex-center-horizontal gap-5 block" :style="props.customStyle">
        <!-- <view class="flex-center-horizontal gap-5 container-btn-left" :style="{
            '--bg-color-left': props.bgColorLeft
        }"
            @click="emits('storeData')"
        >
            <h-icon name="post-store" size="21"/>
            <view>保存草稿</view>
        </view> -->
        <h-btn
            variant="text"
            preIcon="post-store"
            text="保存草稿"
            :customStyle="{
                color: '#333',
                'font-size': '13px',
                'background-color': props.bgColorLeft,
                'padding': '10px 15px',
                'height': '40px',
            }"
        >    
        </h-btn>
        <view class="shrink">
            <!--wx 中放到 btn 中的 flex：1 无效，故外套-->
            <h-btn
                text="提交信息"
                :customStyle="{
                    'background-color': '#374957',
                    'font-family': 'Alimama ShuHeiTi',
                    'font-weight': 'bold',
                    'color': '#fff',
                    'font-size': '20px',
                    'height': '40px',
                    'border-radius': '20px',
                }"
                :disabled="!props.submitAbled"
                @click="emits('submitData')"
            />
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        submitAbled: {
            type: Boolean,
            default: false
        },
        bgColorLeft: {
            type: String,
            default: '#DAE2E6'
        },
        customStyle: {
            type: Object,
            default: () => ({})
        }
    });
    const emits = defineEmits(['submitData', 'storeData']);

// FUNC

</script>

<style scoped>

.container-btn-left {
    background-color: var(--bg-color-left);
    
    color: #333;
    font-size: 13px;
    
    padding: 10px 15px;
    height: 40px;
    border-radius: 20px;
}


</style>        