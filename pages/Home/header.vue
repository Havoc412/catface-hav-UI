<template>
    <headerBase :opacity="props.opacity" :bgColor="color['main-light']" position="fixed">
        <template #prefix>
            <view class="flex-horizontal gap-10 container-tool z-9">
                <h-btn text="发布路遇" :customStyle="{
                    'background-color': color['main-deep'],
                    color: color['main-light'],
                    'font-weight': 'bold',
                    'padding': '3px 10px',
                }" @click="gotoAddEncounter"/>
                <h-icon name="tool-filter" @click="flag.filter = true"/>
                <h-icon :name="flexSvg" @click="changeFlexMode"/>
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
        #TODO
    </u-popup>
</template>

<script setup>
    import { reactive, computed } from "vue";
    // com
    import color from "@/css/theme/index.module.scss";

    import headerBase from "../../components/com/substrate/headerBase.vue";
    // store
// DATA
    const props = defineProps({
        opacity: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits(['changeFlexMode']);

    const flag = reactive({
        filter: false,
        flexMode: false, // fa: waterfall; tr: line
    })

// FUNC
    const flexSvg = computed(() => {
        return `flex-${flag.flexMode ? 'line' : 'waterfall'}`;
    })

    function changeFlexMode() {
        flag.flexMode = !flag.flexMode;
        emits('changeFlexMode', flag.flexMode);
    }

    // router
    function gotoAddEncounter() {
        uni.navigateTo({
            url: "/pages/AddEncounter/index"
        })
    }

</script>

<style scoped>

.container-tool {
    padding: 10px;
    padding-bottom: 5px;
}

</style>        