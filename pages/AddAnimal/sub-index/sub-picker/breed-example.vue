<template>
    <overlayBase opacity=".3" @close="emits('close')">
        <doubleLayerCommentData
            text="以下是常见猫猫花色"
            sub-text="请选择最相近"
        />
        <view>
            <!--TODO 添加样例图片到图床-->
        </view>
    </overlayBase>
</template>

<script setup>
    import { ref, reactive } from "vue";

    import overlayBase from "../../../../components/com/substrate/overlayBase.vue";
    import doubleLayerCommentData from "../../../../components/com/doubleLayerCommentData.vue";

    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['close']);

// FUNC


</script>

<style scoped>

</style>        