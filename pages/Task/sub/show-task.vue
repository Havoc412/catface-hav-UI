<template>
    <view class="flex-center-vertical" @click.stop>
        <view class="title-0">求助详情</view>
        <view class="block mt-20 flex-vertical gap-10">
            <view class="flex-horizontal gap-5">
                <view class="title-0">{{ props.data.title }}</view>
                <view class="shrink"/>
                <taskLevel :type="props.data.level"/>
                <departmentStatus :type="props.data.department"/>
                <taskStatus :type="props.data.status"/>
            </view>
            <view>{{ props.data.description }}</view>
            <view>
                <view class="title title-2">地点描述</view>
                <view>{{ props.data.position }}</view>
            </view>
            <view>
                <view class="title title-2">时间</view>
                <timeInfo :start_time="props.data.time['start_time']"
                    :deadline="props.data.time['deadline']"
                    :estimated_min_duration="props.data.time.estimated_min_duration"
                    :estimated_max_duration="props.data.time.estimated_max_duration"
                />
            </view>
            <view class="flex-vertical gap-5">
                <view class="title title-2">标签</view>
                <tagGroup :tag-list="props.data.tags"/>
            </view>
        </view>
        <!---->
        <view class="mt-20">
            <h-btn
                text="接取"
                :customStyle="{
                    'background-color': '#374957',
                    'font-family': 'Alimama ShuHeiTi',
                    'font-weight': 'bold',
                    'color': '#fff',
                    'font-size': '16px',
                    'height': '40px',
                    'border-radius': '20px',
                }"
                @click="acceptTask"
                @clickDisabled=""
            />
        </view>
    </view>
    <!--TAG 状态栏控制-->
    <statusWin 
        v-if="flag.status.show" 
        :status="flag.status.type"
        loaddingImgMode="necklace"
        loaddingText="请求中"
        loaddingImgSize="50px"
    />
</template>

<script setup>
    import { ref, reactive } from "vue";

    import { TaskStatus } from "../../../common/consts";
    import { TOAST } from "../../../utils/notice";

    import api from "../../../request/catface_task/task";

    // com
    import timeInfo from "../../../components/search/variant/sub-task-block/time-info.vue";

    import taskLevel from "../../../components/task/taskLevel.vue";
    import taskStatus from "../../../components/task/taskStatus.vue";
    import departmentStatus from "../../../components/book/sub-cat/departmentStatus.vue";

    import tagGroup from "../../../components/detail/tagGroup.vue";

    import statusWin from "../../../components/status-win/statusWin.vue";
    // store
// DATA
    const props = defineProps({
        data: {
            type: Object,
            default: () => ({})
        }
    });
    const emits = defineEmits(['finish']);

    const flag = reactive({
        status: {
            show: false,
            type: "loadding"
        },
    })

// FUNC
    async function acceptTask() {
        if (props.data.status != TaskStatus.WAITING.en)
            TOAST("此任务当前无法接取", "none", 2000);
        else {
            flag.status.show = true;

            const [res, err] = await api.acceptTask(props.data.task_id);
            if (err) {
                TOAST("接取失败，请稍后再试。")
            } else {
                TOAST("接取成功！", "success");
                emits('finish');
            }

            flag.status.show = false;
        }
    }


</script>

<style scoped>

.title-0 {
    font: bold;
    font-family: Alimama ShuHeiTi;
    font-size: 20px;
}

.title {
    font-weight: bold;
}

.title-2 {
    font-size: 14px;
}

</style>        