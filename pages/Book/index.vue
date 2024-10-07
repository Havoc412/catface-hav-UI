<template>
    <view class="flex-center-vertical">
        <!--FUNC-->
        <toolbar/>
        <view class="container-cats gap-10">
            <template v-for="item in 2">
                <singleCat/>
            </template>
        </view>
    </view>
    <h-tabbar/>
</template>

<script setup>
    import { ref } from "vue";
    // com
    import toolbar from "./toolbar.vue";
    import singleCat from "../../components/book/singleCat.vue";
    // store
// DATA

// FUNC

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-column: repeat(2, 1fr);
    padding: 5px;
}

</style>        