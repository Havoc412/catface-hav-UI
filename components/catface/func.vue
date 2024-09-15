<!--info 当 cnn 结果为复数时，提供辅助过滤的 btn -->
<template>
    <view class="flex-vertical gap-10 container" :style="{
        '--opacity': style.opacity
    }">
        <btn-msg msg="获取当前定位，增强检索。" :show="flag">
            <h-btn shape="circle" @click="getLocation">
                <fr-icon-local-two theme="outline" :size="props.iconSize" :fill="['#000000']" />
            </h-btn>
        </btn-msg>
        <btn-msg msg="询问小护，分辨or了解更多猫猫信息。" :show="flag">
            <h-btn shape="circle" @click="gotoDetectHelp">
                <fr-icon-dog theme="outline" :size="props.iconSize" :fill="['#000000']" />
            </h-btn>
        </btn-msg>
        <h-btn shape="circle" @click="clickHelp">
            <fr-icon-help theme="outline" :size="props.iconSize" :fill="['#000000']" />
        </h-btn>
    </view>
</template>

<script setup>
    import { ref, reactive } from "vue";
    import api from "../../request/file";
    // com
    import btnMsg from "../com/btnMsg.vue";

// DATA
    const props = defineProps({
        iconSize: {
            type: Number,
            default: 50
        },
        catInforList: {
            type: Object,
            default: () => []
        }
    });
    const emits = defineEmits(['filter_by_poi']);

    const flag = ref(false);  // default 默认设定为 不显示。
    const style = reactive({
        opacity: .5
    });

// FUNC
    const getLocation = () => {
        console.info("run.");
        uni.getLocation({
            type: 'gcj02',
            // isHighAccuracy: true,
            success: async function (res) {
                console.log('当前位置的经度：' + res.longitude);
                console.log('当前位置的纬度：' + res.latitude);

                const poi = { lat: res.latitude, lon: res.longitude};
                let cats_id = props.catInforList.map((item) => {
                    return item.id;
                })

                cats_id = await api.filter_by_poi(poi, cats_id);

                emits('filter_by_poi', cats_id);
            },
            fail: function (err) {
                console.error(err);
            }
        });
    }

    // router
    const gotoDetectHelp = () => {
        // pre data
        talkStore.detectInit(porps.catInforList);
        // navigate
        uni.navigateTo({
            url: "/pages/Rag/index"
        })
    }

    // 
    const clickHelp = () => {
        flag.value = !flag.value;
        style.opacity = 1;
        setTimeout(() => {
            style.opacity = .5;
        }, 1500);
    }

</script>

<style scoped>

.container {
    opacity: var(--opacity);
    transition: opacity 1s;
}

</style>        