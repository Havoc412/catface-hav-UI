<template>
    <view>
        <view class="title">
            {{ props.time }}
        </view>
        <view class="container-items flex-vertical gap-5">
            <template v-for="item in 3">
                <item/>
            </template>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    import item from "./item.vue";
    // store
// DATA
    const props = defineProps({
        time: {
            type: String,
            default: "10月2日"
        },
        talkList: {
            type: Array,
            default: () => ([])
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.title {
    font-family: Alimama ShuHeiTi;
    font-size: 22px;
}

.container-items {
    padding: 15rpx;
}

</style>        