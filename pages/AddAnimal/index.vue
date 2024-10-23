<template>
    <view class="conatiner-top flex-center-vertical">
        <vearCarousel :img-list="data.photos" type="add"/>
        <dragBase>
            123
        </dragBase>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import vearCarousel from "../../components/vear-carousel/vear-carousel.vue";
    import dragBase from "../../components/com/substrate/dragBase.vue";
    // store

// DATA
    const data = reactive({
        photos: []
    })

// FUNC

</script>

<style scoped>

</style>