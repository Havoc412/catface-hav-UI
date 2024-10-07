<template>
    <view class="flex-vertical">
        <view class="container-img relative">
            <up-image :src="props.url" mode="heightFix" radius="25"/>
            <view class="contanier-heart flex-center-both absolute">
                <h-icon :name="heartSvg"/>
            </view>
        </view>
        <view class="flex-horizontal">
            <view>{{ props.name }}</view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        name: {
            type: String,
            default: "毛茸茸"
        },
        url: {
            type: String,
            default: "/static/dog.jpg"
        }
    });
    const emits = defineEmits([]);

    const flag = reactive({
        heart: false
    })

// FUNC
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })

</script>

<style scoped>

.container-img {
    height: 210px;
    border-radius: 25px;
}

.contanier-heart {
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;

    left: 5px;
    bottom: 5px;
}

</style>