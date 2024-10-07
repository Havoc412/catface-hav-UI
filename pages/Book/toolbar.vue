<template>
    <view class="flex-horizontal block gap-10 mr-10 container-tool z-9">
        <view class="shrink"/>
        <h-icon name="com-list" @click="flag.list = true"/>
        <h-icon name="com-filter"/>
    </view>
    <!--TODO 这里触发一些悬浮框-->
    <u-popup :show="flag.list" mode="right" overlayOpacity="0.3" safeAreaInsetTop :customStyle="{
        borderBottomLeftRadius: '20px'
    }" @close="flag.list = false">
        <list/>
    </u-popup>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    // com
    import list from "./sub-toolbar/list.vue";
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
    position: sticky;
    top: 45px;

    padding: 5px 10px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #ffffff0F, #ffffff);
}

</style>        