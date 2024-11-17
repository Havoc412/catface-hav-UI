<!--INFO 一个 Avatar + Name 的小组件；适用 User && Animal-->
<template>
    <view class="flex-center-horizontal gap-5">
        <up-image :src="props.avatar" :height="props.imgSize" :width="props.imgSize" shape="circle"/>
        <view class="no-shrink">{{ props.name }}</view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        avatar: {
            type: String,
            default: "/static/icon.png"
        },
        name: {
            type: String,
            default: "默认名"
        },
        imgSize: {
            type: String,
            default: "35px"
        }
    });
    const emits = defineEmits([]);
 
// FUNC

</script>

<style scoped>

</style>        