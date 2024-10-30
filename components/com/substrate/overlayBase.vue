<template>
    <!--pickerのzIndex 超高-->
    <up-overlay
        z-index="20000"
        :opacity="props.opacity"
        :show="flag" @click="close">
        <view class="flex-center-both" style="height: 100%;">
            <view class="flex-vertical container-main gap-5">
                <slot></slot>
            </view>
        </view>
    </up-overlay>
</template>

<script setup>
    import { ref } from "vue";
    // storev
// DATA
    const props = defineProps({
        opacity: {
            type: String,
            default: ".3"
        }
    });
    const emits = defineEmits(['close']);
    
    const flag = ref(true);
// FUNC
    function close() {
        flag.value = false;
        emits('close');
    }

</script>

<style scoped>

.container-main {    
    padding: 20px;

    background-color: #fff;
    border-radius: 15px;
}

</style>        