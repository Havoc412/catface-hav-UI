<!--INFO 选择关联毛茸茸的方式，感觉，可以类似 原神的选角色。-->
<template>
    <view class="flex-horizontal gap-10 block container-animal" @click="emits('click')">
        <view class="title">路遇毛茸茸*</view>
        <tip v-if="!props.animalList.length" fontSize="15">点击这里添加你所遇到的毛茸茸！</tip>
        <view class="flex-center-horizontal gap-5">
            <template v-for="(item, index) in props.animalList" :key="index">
                <pair :avatar="nginx.catsAvatar(item.animal.avatar)" :name="item.animal.name"/>
            </template>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import tip from "../../../components/com/tip.vue";
    import pair from "../../../components/encounter/pair.vue";
    import nginx from "../../../request/nginx";
    // store
// DATA
    const props = defineProps({
        animalList: Array
    });
    const emits = defineEmits(['click']);

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