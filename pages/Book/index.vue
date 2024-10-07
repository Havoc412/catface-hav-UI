<template>
    <view class="flex-center-vertical">
        <!--FUNC-->
        <toolbar/>
        <view class="container-cats gap-10">
            <template v-for="(item, index) in data.catsList">
                <singleCat
                    :name="item.name"
                    :gender="item.gender"
                    :schoolStatus="item.schoolStatus"
                    :sterilizationStatus="item.sterilizationStatus"
                    :url="item.url"
                />
            </template>
        </view>
        <view style="height: 80px;"></view>
    </view>
    <h-tabbar/>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import toolbar from "./toolbar.vue";
    import singleCat from "../../components/book/singleCat.vue";
    // store

// DATA
    const data = reactive({
        // TODO 通过 API 获取数据
        catsList: [
            {name: "斜刘海", gender: "female", schoolStatus: "inschool", sterilizationStatus: "sterilized", url: "0.jpg"},
            {name: "小北", gender: "female", schoolStatus: "graduation", sterilizationStatus: "sterilized", url: "1.jpg"},
            {name: "打三", gender: "female", schoolStatus: "inschool", sterilizationStatus: "sterilized", url: "2.jpg"},
            {name: "发发", gender: "female", schoolStatus: "graduation", sterilizationStatus: "sterilized", url: "3.jpg"},
            {name: "猪皮", gender: "male", schoolStatus: "inschool", sterilizationStatus: "sterilized", url: "4.jpg"},
            {name: "软软", gender: "female", schoolStatus: "inschool", sterilizationStatus: "sterilized", url: "5.jpg"},
        ]
    })

// FUNC

</script>

<style scoped>

.container-cats {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    padding: 5px;
}

</style>        