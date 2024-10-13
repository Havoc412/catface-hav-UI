<template>
    <!--TODO 之后采用骨架图来填充 加载-->
    <view class="flex-vertical container-top">
        <vearCarousel :img-list="imgList" url-key="url"/>
        <view class="flex-vertical infor-container gap-5 relative">
            <view class="flex-center-horizontal gap-10">
                <view class="flex-bottom-horizontal gap-10">
                    <view class="name">{{ data.name }}</view>
                    <h-icon :name="genderSvg" size="22"/>
                    <view class="birthday">{{ date.calculateAge(data.birthday) }}</view>
                </view>
                <view class="shrink"/>
                <school-status :type="data.status"/>
                <sterilization-status :type="data.sterilization"/>
            </view>
            <view class="nickname">别名：{{ data.nick_name }}</view>
            <placeHolder height="20"/>
            <view class="intro">
                {{ data.description }}
            </view>
            <tagGroup :tag-list="data.tags"/>
        </view>
        <view class="shrink"/>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";
    import { onLoad } from "@dcloudio/uni-app"
    
    import api from "../../request/animal";
    import nginx from "../../request/nginx";
    import date from "../../utils/date";
    import { gender_EN } from "../../common/consts";
    // com
    import vearCarousel from "../../components/vear-carousel/vear-carousel.vue";
    import schoolStatus from "../../components/book/sub-cat/schoolStatus.vue";
    import sterilizationStatus from "../../components/book/sub-cat/sterilizationStatus.vue";
    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import tagGroup from "../../components/detail/tagGroup.vue";
    
    import tabbar from "../../components/detail/tabbar.vue";
    // store
// DATA
    const imgList = ref([{
        url: '/static/Qcat.png',
        id: 1
    }])

    const data = ref({  // TODO 之后采用骨架图
        name: '毛茸茸名字',
        birthday: '2024-01-01',
        gender: 1,
        status: 'inschool',
        sterilization: 'sterilized',
        description: '默认描述',
        nick_name: '无',
        // TODO 从表中联查
        tags: [
            '臭脸', '猜皮', '玉玉'
        ],
        likeFlag: true 
    })

    const flag = reactive({
        heart: data.likeFlag,
        
    })
    const AnmID = ref(0);

// FUNC
    onLoad( async(params) => {
        AnmID.value = params.id;
        data.value = await api.getAnimalDetail(AnmID.value);
        console.debug(data.value);
        fetchImgPath();
    })

    const genderSvg = computed(() => {
        let name = `gender-${gender_EN[data.value.gender - 1]}`;
        return name;
    })
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })

    function fetchImgPath() {
        if (!data.value.photos) return; // INFO 根据 GORM json:optical 的设定，"" 不会返回。
        imgList.value = [];
        const photos = data.value.photos.split(',');
        photos.forEach((element, index) => {
            const url = nginx.catsPhotos(AnmID.value, element);
            imgList.value.push({
                url: url,
                id: index + 1
            });
        });
        console.debug(imgList.value);
    }

</script>

<style scoped>

.container-top {
    height: 1500rpx;
}

.infor-container {
    padding: 50rpx 30rpx;
}

.name {
    font-family: Alimama ShuHeiTi;
    font-size: 24px;
}

.birthday {
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
    bottom: 35px;
    box-shadow: 0px 0px 5px 1px #ccc;
}

</style>        