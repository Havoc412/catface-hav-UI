<template>
    <view class="flex-vertical">
        <vearCarousel :img-list="data.imgList" url-key="url"/>
        <view class="flex-vertical infor-container gap-5 relative">
            <view class="flex-center-horizontal gap-10">
                <view class="flex-bottom-horizontal gap-10">
                    <view class="name">{{ data.name }}</view>
                    <h-icon :name="genderSvg" size="22"/>
                    <view class="age">{{ data.age }}</view>
                </view>
                <view class="shrink"/>
                <school-status :type="data.schoolStatus"/>
                <sterilization-status :type="data.sterilizationStatus"/>
            </view>
            <view class="nickname">别名：{{ data.nickName }}</view>
            <placeHolder height="20"/>
            <view class="intro">
                {{ data.intro }}
            </view>
            <tagGroup :tag-list="data.tags"/>

            <FuncGroup/>

            <view class="contanier-heart flex-center-vertical absolute z-0">
                <h-icon :name="heartSvg" @click="flag.heart = !flag.heart"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    // com
    import vearCarousel from "../../components/vear-carousel/vear-carousel.vue";
    import schoolStatus from "../../components/book/sub-cat/schoolStatus.vue";
    import sterilizationStatus from "../../components/book/sub-cat/sterilizationStatus.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import tagGroup from "../../components/detail/tagGroup.vue";
    import FuncGroup from "../../components/detail/funcGroup.vue";
    // store
// DATA
    const imgList = ref([
        {
            url: '/static/test.jpg',
            id: 1
        },
        {
            url: '/static/test.jpg',
            id: 2
        },
        {
            url: '/static/test.jpg',
            id: 3
        }
    ])

    const data = reactive({
        imgList: imgList,
        name: '猪皮',
        age: '7岁',
        gender: 'male',
        schoolStatus: 'inschool',
        sterilizationStatus: 'sterilized',
        intro: '信部资深学长；很有个性的司马脸；每晚选择一位大学牲翻牌子。',
        nickName: '猜皮',
        tags: [
            '臭脸', '猜皮', '玉玉'
        ],
        likeFlag: true
    })

    const flag = reactive({
        heart: data.likeFlag
    })

// FUNC
    const genderSvg = computed(() => {
        return `gender-${data.gender}`;
    })
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })

</script>

<style scoped>

.infor-container {
    padding: 50rpx 30rpx;
}

.name {
    font-family: Alimama ShuHeiTi;
    font-size: 24px;
}

.age {
    font-weight: bold;
}

.nickname {
    font-size: 13px;
}

.intro {
    font-family: Alimama ShuHeiTi;
}

.contanier-heart {
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    
    height: 45px;
    width: 45px;

    right: 15px;
    bottom: 25px;
    box-shadow: 0px 0px 5px 1px #ccc;
}

</style>        