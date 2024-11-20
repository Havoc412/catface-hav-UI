<template>
    <!--TODO 之后采用骨架图来填充 加载-->
    <view class="flex-vertical container-top">
        <vearCarousel :img-list="imgList"/>
        <view class="flex-vertical infor-container gap-5 relative">
            <view class="flex-center-horizontal gap-10">
                <view class="flex-bottom-horizontal gap-10">
                    <view class="name">{{ data.name }}</view>
                    <h-icon :name="genderSvg" size="22"/>
                    <view class="birthday">{{ calculateAge(data.birthday) }}</view>
                </view>
                <view class="shrink"/>
                <school-status :type="data.status"/>
                <sterilization-status :type="data.sterilization"/>
            </view>
            <view class="nickname">别名：{{ data.nick_names }}</view>
            <placeHolder height="20"/>
            <view class="intro">
                {{ data.description }}
            </view>
            <tagGroup :tag-list="data.tags"/>
        </view>
        <encounterMini :id="AnmID"/>

        <placeHolder/>
        <tabbar/>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    import { onLoad } from "@dcloudio/uni-app"
    
    import api from "../../request/animal";
    import nginx from "../../request/nginx";
    import { calculateAge } from "../../utils/date";
    import { Gender_EN } from "../../common/consts";
    // com
    import vearCarousel from "../../components/vear-carousel/vearCarousel.vue";
    import schoolStatus from "../../components/book/sub-cat/schoolStatus.vue";
    import sterilizationStatus from "../../components/book/sub-cat/sterilizationStatus.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import tagGroup from "../../components/detail/tagGroup.vue";
    
    import encounterMini from "../../components/detail/encounter-mini.vue";

    import tabbar from "../../components/detail/tabbar.vue";
    // store
// DATA
    const imgList = ref(['/static/Qcat.png'])

    const data = ref({  // TODO 之后采用骨架图
        name: '毛茸茸名字',
        birthday: '2024-01-01',
        gender: 1,
        status: 'inschool',
        sterilization: 'sterilized',
        description: '默认描述',
        nick_names: '无',
        tags: "",
        likeFlag: true 
    })

    const flag = reactive({
        heart: data.likeFlag,
    })
    const AnmID = ref(0);

// FUNC
    onLoad( async(params) => {
        AnmID.value = +params.id;  // TIP + 或者 parseInt() 都可以转化为 Number
        data.value = await api.getAnimalDetail(AnmID.value);
        fetchImgPath();
        console.debug(data.value);
    })

    const genderSvg = computed(() => {
        let name = `gender-${Gender_EN[data.value.gender - 1]}`;
        return name;
    })

    function fetchImgPath() {
        if (!data.value.photos) return; // INFO 根据 GORM json:optical 的设定，"" 不会返回。
        imgList.value = [];
        const photos = data.value.photos.split(',');
        photos.forEach((element, index) => {
            const url = nginx.catsPhotos(AnmID.value, element);
            imgList.value.push(url);
        });
    }

</script>

<style scoped>

.container-top {
    min-height: 100vh;  /** 因为有 tabbar 的关系 */
}

.infor-container {
    padding: 50rpx 30rpx;
}

.name {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 24px;
}

.birthday {
    font-weight: bold;
}

.nickname {
    font-size: 13px;
}

.intro {
    font-size: 17px;
}

</style>        