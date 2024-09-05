<template>
    <view class="flex-vertical gap-10 bg-img container">
        <!-- null 值处理 -->
        <view v-if="catInforList.length == 0" class="error-container flex-center-both gap-10">
            <view class="flex-vertical">
                <view class="flex-center-both gap-10">
                    <fr-icon-error theme="filled" :size="30" :fill="['#E77A7F']" />
                    数据库为空 or 连接失败。
                </view>
                <up-image src="/static/error.png"/>
            </view>
        </view>
        <!-- info core code-->
        <template v-for="(item, id) in catInforList" :index="cat-id">
            <cat-item :infor="item"/>
        </template>
    </view>
</template>

<script setup> 
    import { ref, onMounted } from "vue";

    import api from "../../request/file";
    // com
    import catItem from "../../components/catface/catItem.vue";
    // store

// DATA
    const catInforList = ref([]);

// FUNC
    onMounted(async() => {
        catInforList.value = await api.searchSQL();
    })


</script>

<style scoped>

.container {
    font-family: Alimama ShuHeiTi;
    min-height: 100vh;

    padding: 20rpx;
}

.error-container {
    height: 80vh;

    font-size: 40rpx;
}

</style>        