<!--INFO 实际还是 Toolsbar，放置到 Header 的空间位置。-->
<template>
    <view class="flex-horizontal gap-10 container-tool z-9">
        <h-icon name="com-list" @click="flag.list = true"/>
        <h-icon name="com-filter" @click="flag.filter = true"/>
        <view class="shrink"/>
    </view>
    <placeHolder height="40"/>  <!--INFO sticky 在 wx 中失效，用这种方式手动 fixed 模拟了一下-->
    <!--INFO safeAreaInsetTop 在 wx 中不需要-->
    <u-popup :show="flag.list" mode="right" overlayOpacity="0.3" :customStyle="{
        borderBottomLeftRadius: '20px'
    }" @close="flag.list = false">
        <list/>
    </u-popup>
    <!--UPDATE u-popup 的状态会直接销毁，所以里面的选项需要外部来管理一下。
    https://uiadmin.net/uview-plus/components/popup.html：官方看起来是没有对应的接口，我就先外部实现一下。
    -->
    <u-popup :show="flag.filter" mode="right" overlayOpacity="0.3" :customStyle="{
        borderBottomLeftRadius: '20px'
    }" @close="flag.filter = false">
        <Filter :statusCache="data.filterConditions" @close="flag.filter = false" @getFilterConditions="filterConditionsChange"/>
    </u-popup>
</template>

<script setup>
    import { ref, reactive, onMounted, watch } from "vue";
    // com
    import list from "./sub-toolbar/list.vue";
    import Filter from "./sub-toolbar/filter.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    // store
// DATA
    const props = defineProps({
        toggleFilter: Boolean
    });
    const emits = defineEmits(['filterConditionsChange']);

    const flag = reactive({
        list: false,
        filter: false,
        toggleFilter: false,
    })

    const data = reactive({
        filterConditions: { // INFO 状态缓存。
            status: "0,1,2",
            gender: "",
            breed: "",
            sterilization: ""
        }
    })

// FUNC
    onMounted(() => {
        flag.list = false;
        flag.filter = false;
    })

    watch(() => props.toggleFilter, () => {
        flag.toggleFilter = !flag.toggleFilter;
    })

    function filterConditionsChange(filterConditions) {
        data.filterConditions = filterConditions;
        emits('filterConditionsChange');
    }

    function getFilterConditions() {
        return data.filterConditions;
    }

    defineExpose({ getFilterConditions });

</script>

<style scoped>

.container-tool {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    padding: 10px;
    background-color: #DAE2E6;
}

</style>        