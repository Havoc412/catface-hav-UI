<template>
    <headerBase :bgColor="color['main-light']">
        <template #prefix>
            <view class="flex-horizontal gap-10 container-tool z-9">
                <h-icon name="tool-filter" @click="flag.filter = true"/>
                <view class="shrink"/>
            </view>
        </template>
    </headerBase>
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
    import { ref, reactive } from "vue";
    import color from "@/css/theme/index.module.scss";
    // com
    import headerBase from "../../../components/com/substrate/headerBase.vue";
    import Filter from "../../Book/sub-toolbar/filter.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['filterConditionsChange']);

    const flag = reactive({
        filter: false,
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

</style>        