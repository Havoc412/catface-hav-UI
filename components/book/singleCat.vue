<template>
    <view class="flex-vertical gap-10" @click="emits('click', props.id)">
        <view class="container-img relative">
            <up-image 
                :src="nginx.catsAvatar(props.url)" 
                height="250" width="350rpx" mode="aspectFill" radius="25"
                error-icon="/static/error.svg"
            />  <!--INFO 素材来源于网络-->
            <view class="contanier-heart flex-center-vertical absolute z-0" @click.stop>
                <h-icon :name="heartSvg" @click="flag.heart = !flag.heart"/>
            </view>
        </view>
        <view class="flex-center-horizontal gap-5">
            <view class="name">{{ props.name }}</view>
            <!--BUG 好像会覆盖 TOP-->
            <h-icon v-show="bookStore.gender" :name="genderSvg" size="18"/>
            <view class="shrink"/>
            <school-status v-show="bookStore.school" :type="props.schoolStatus"/>
            <sterilization-status v-show="bookStore.sterilization" :type="props.sterilizationStatus"/>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    import { gender_EN } from "../../common/consts";
    // com
    import schoolStatus from "./sub-cat/schoolStatus.vue";
    import sterilizationStatus from "./sub-cat/sterilizationStatus.vue";
    import nginx from "../../request/nginx";
    // store
    import book from "../../store/book";
    const bookStore = book();
// DATA
    const props = defineProps({
        id: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "毛茸茸"
        },
        gender: {
            type: [String, Number],
            default: "boy"
        },
        schoolStatus: {
            type: [String, Number],
            default: "inschool"
        },
        sterilizationStatus: {
            type: [String, Number],
            default: "unknown"
        },
        url: {
            type: String,
            default: "/static/dog.jpg"
        }
    });
    const emits = defineEmits(['click']);

    const flag = reactive({
        heart: false
    })

// FUNC
    const heartSvg = computed(() => {
        return `com-heart${flag.heart ? "_active" : ""}`;
    })
    const genderSvg = computed(() => {
        if(typeof props.gender === 'string')
            return `gender-${props.gender}`;
        else {
            let name = `gender-${gender_EN[props.gender - 1]}`;
            return name;
        }
    })

</script>

<style scoped>

.container-img {
    border-radius: 25px;
}

.contanier-heart {
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    
    height: 45px;
    width: 45px;

    left: 15px;
    bottom: 25px;
    box-shadow: 0px 0px 5px 1px #ccc;
}

.name {
    font-family: Alimama ShuHeiTi;
    font-size: 17px;
}

</style>