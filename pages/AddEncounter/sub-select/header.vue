<template>
    <headerBase :bgColor="color['main-light']">
        <template #prefix>
            <view class="flex-horizontal gap-10 container-tool">
                <h-icon name="tool-filter" @click="flag.filter = true"/>
                <h-icon name="tool-photo_thin" @click=""/>
                <h-icon name="tool-location_thin" @click=""/>
            </view>
        </template>

        <template #midfix>
            <up-input
                v-model="data.name"
                placeholder="输入名字/昵称"
                shape="circle"
                clearable
                :customStyle="{
                    boxShadow: 'inset 0 0 1px #000',
                    border: '5px solid #000',
                    margin: '0 10px'
                }"
                @confirm="confirmName"
            >
                <template #prefix>
                    <h-icon name="tool-search_thin" size="14"/>
                </template>
                <template #suffix>
                    <btnBlueTheme v-show="flag.name" text="取消" fontSize="12" @click="nameCancel"/>
                </template>
            </up-input>
        </template>

        <template #suffix>
            <btnBlueTheme text="完成" @click="emits('finish')"/>
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
    import btnBlueTheme from "../../../components/com/button/variant/btn-blue-theme.vue";
    import Filter from "../../Book/sub-toolbar/filter.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['filterConditionsChange', 'name', 'nameCancel', 'finish']);

    const flag = reactive({
        filter: false,
        name: false,
    })
    const data = reactive({
        filterConditions: { // INFO 状态缓存。
            status: "1,2",
            gender: "",
            breed: "",
            sterilization: "",
            department: "",
        },
        name: ""
    })

// FUNC
    function filterConditionsChange(filterConditions) {
        data.filterConditions = filterConditions;
        emits('filterConditionsChange');
    }

    // TAG NAME
    function confirmName() {
        flag.name = true;
        emits('name', data.name);
    }

    function nameCancel() {
        flag.name = false;
        emits('nameCancel');
    }

    function getFilterConditions() {
        return data.filterConditions;
    }

    defineExpose({ getFilterConditions });

</script>

<style scoped>

</style>        