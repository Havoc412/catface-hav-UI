<template>
    <view class="conatiner-top flex-center-vertical">
        <vearCarousel :img-list="data.photos" type="add"/>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import vearCarousel from "../../components/vear-carousel/vear-carousel.vue";
    // store

// DATA
    const data = reactive({
        photos: []
    })

// FUNC

</script>

<style scoped>

</style>