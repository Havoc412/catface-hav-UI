<template>
    <tabberBase :bottom="props.bottom" position="fixed">
        <template #midfix>
            <view class="flex-center-horizontal container-main">
                <template v-for="(item, index) in PAGES" :key="index">
                    <h-icon :name="iconName(index)" @click="goto(index)"/>
                </template>
            </view>
        </template>
    </tabberBase>
</template>

<script setup>
    import { ref, computed } from "vue";
    import tabberBase from "./substrate/tabberBase.vue";
    // store
    import tabbar from "../../store/tabbar";
    const tabbatStore = tabbar();

// DATA
    const props = defineProps({
        bottom: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits([]);
    
    const PAGES = ["Book", "Home", "User"];

// FUNC
    const iconName = computed(() => {
        return (pageIndex) => {
            return `tabbar-${PAGES[pageIndex].toLowerCase()}` + (tabbatStore.curPageIndex === pageIndex ? "_active" : "");
        }
    })

    function goto(index) {
        const pagePath = `/pages/${PAGES[index]}/index`;
        console.debug(pagePath);
        uni.switchTab({ url: pagePath });
        // uni.navigateTo({ url: pagePath });
        tabbatStore.setPageID(index);
    }

</script>

<style scoped>

.container-main {
    width: 100%;
    height: 60px;
    padding: 0 120rpx;
    background-color: #30444E;
    border-radius: 10rpx 10rpx 0 0;
    box-shadow: 0px 1px 14px #000000;
}

</style>        