<!--INFO 选择关联毛茸茸的方式，感觉，可以类似 原神的选角色。-->
<template>
    <view class="flex-horizontal gap-10 block container-animal" @click="emits('click')">
        <view class="title">路遇毛茸茸*</view>
        <tip v-if="!animal_list.length" fontSize="15">点击这里添加你所遇到的毛茸茸！</tip>
        <view>
            <template v-for="(item, index) in animal_list" :key="index">
                <!--TODO-->
            </template>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import tip from "../../../components/com/tip.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['click']);

    const animal_list = ref([]);
// FUNC



</script>

<style scoped>

.container-animal {
    padding: 10px;
    padding-bottom: 0;
}

.title {
    font-size: 18px;
    font-weight: bold;
}

</style>        