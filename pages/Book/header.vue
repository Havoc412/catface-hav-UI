<!--INFO 实际还是 Toolsbar，放置到 Header 的空间位置。-->
<template>
    <headerBase :bgColor="color['main-light']">
        <template #prefix>
            <view class="flex-horizontal gap-10 container-tool z-9">
                <h-icon name="tool-list" @click="flag.list = true"/>
                <h-icon name="tool-filter" @click="flag.filter = true"/>
                <h-icon name="tool-add" @click="emits('add')"/>
                <view class="shrink"/>
            </view>
        </template>
    </headerBase>
    <u-popup 
        :show="flag.list" 
        mode="right" 
        overlayOpacity="0.3"
        safeAreaInsetTop
        :customStyle="{
            borderBottomLeftRadius: '20px'
        }" 
        @close="flag.list = false"
    >
        <list/>
    </u-popup>
    <!--UPDATE u-popup 的状态会直接销毁，所以里面的选项需要外部来管理一下。
    https://uiadmin.net/uview-plus/components/popup.html：官方看起来是没有对应的接口，我就先外部实现一下。
    -->
    <u-popup 
        :show="flag.filter" 
        mode="right" 
        overlayOpacity="0.3" 
        safeAreaInsetTop
        :customStyle="{
            borderBottomLeftRadius: '20px'
        }" 
        @close="flag.filter = false"
    >
        <Filter :statusCache="data.filterConditions" @close="flag.filter = false" @getFilterConditions="filterConditionsChange"/>
    </u-popup>
</template>

<script setup>
    import { ref, reactive, onMounted, watch } from "vue";
    // com
    import color from "@/css/theme/index.module.scss";

    import headerBase from "../../components/com/substrate/headerBase.vue";
    import list from "./sub-toolbar/list.vue";
    import Filter from "./sub-toolbar/filter.vue";
    // store
// DATA
    const props = defineProps({
        toggleFilter: Boolean
    });
    const emits = defineEmits(['filterConditionsChange', 'add']);

    const flag = reactive({
        list: false,
        filter: false,
        toggleFilter: false,
    })

    const data = reactive({
        filterConditions: { // INFO 状态缓存。
            status: "1,2",
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
    padding: 10px;
    padding-bottom: 0;
}

</style>        