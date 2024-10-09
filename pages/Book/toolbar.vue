<template>
    <view class="flex-horizontal gap-10 container-tool z-9">
        <view class="shrink"/>
        <h-icon name="com-list" @click="flag.list = true"/>
        <h-icon name="com-filter" @click="flag.filter = true"/>
    </view>
    <placeHolder height="35"/>  <!--INFO sticky 在 wx 中失效，用这种方式手动 fixed 模拟了一下-->
    <!--TODO 这里触发一些悬浮框-->
    <!--INFO safeAreaInsetTop 在 wx 中不需要-->
    <u-popup :show="flag.list" mode="right" overlayOpacity="0.3" :customStyle="{
        borderBottomLeftRadius: '20px'
    }" @close="flag.list = false">
        <list/>
    </u-popup>
    <u-popup :show="flag.filter" mode="right" overlayOpacity="0.3" :customStyle="{
        borderBottomLeftRadius: '20px'
    }" @close="flag.filter = false">
        <Filter/>
    </u-popup>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    // com
    import list from "./sub-toolbar/list.vue";
    import Filter from "./sub-toolbar/filter.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    // store
// DATA
    const props = defineProps({
        
    });
    const emits = defineEmits([]);

    const flag = reactive({
        list: false,
        filter: false
    })

    onMounted(() => {
        flag.list = false;
        flag.filter = false;
    })

// FUNC


</script>

<style scoped>

.container-tool {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    padding: 5px 10px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #ffffff0F, #ffffff);
}

</style>        