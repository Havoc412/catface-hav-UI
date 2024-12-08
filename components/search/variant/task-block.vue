<!--类似 img-block，对 task 展示的特化处理 # TODO 之后考虑合并也成。-->
<template>
    <view class="flex-top-horizontal gap-10 block relative container-item" @click="gotoDetail">
        <view class="absolute">
            <!--任务紧急程度标签。-->
            <taskLevel :type="props.level"/>
        </view>
        <up-image :src="props.avatar" height="100px" width="90px" radius="12px"/> <!--TODO POST IMAGE in Nginx-->

        <view class="flex-vertical shrink"> 
            <view class="title">
                <!--UPDATE nodes 不推荐使用 String 类型，性能会有所下降。From: https://uniapp.dcloud.net.cn/component/rich-text.html-->
                <rich-text :nodes="props.title"/>
            </view>
            <!-- Nick Name -->
            <view style="min-height: 10px;">
                <tagGroup mode="highlight" :list="tagsFilterHighlight" :listHighlight="props.tagsHighlight"/>
            </view>
            <view class="content block relative">
                <rich-text :nodes="sliceContent"/>
                <view class="absolute" style="right: -10px; top: -2px;">
                    <h-icon name="text-quota" size="14"/>
                </view>
            </view>
            <view>
                <timeInfo :start_time="props.time['start_time']"
                    :deadline="props.time['deadline']"
                    :estimated_min_duration="props.time.estimated_min_duration"
                    :estimated_max_duration="props.time.estimated_max_duration"
                />
            </view>
        </view>
        <!--右上角状态信息-->
        <view class="absolute" style="right: 0;">
            <view class="flex-center-both gap-5">
                <taskStatus :type="props.status"/>
                <departmentStatus :type="props.department"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    // com
    import tagGroup from "../../tag/group/tagGroup.vue";

    import taskLevel from "../../task/taskLevel.vue";
    import taskStatus from "../../task/taskStatus.vue";
    import departmentStatus from "../../book/sub-cat/departmentStatus.vue";

    import timeInfo from "./sub-task-block/time-info.vue";
    
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: 'task'
        },
        // base information
        id: Number,
        avatar: {
            type: String,
            default: "/static/dog.jpg"
        },
        // TAG INFO
        title: {
            type: String,
            default: "Title Default"
        },
        content: {
            type: String,
            default: "Content Default"
        },
        position: {
            type: String,
            default: "unknown"
        },
        department: {
            type: String,
            default: "IT"
        },
        tagsHighlight: {
            type: Array,
            default: () => []
        },
        tags: {
            type: Array,
            default: () => []
        },
        time: {
            type: Object,
            default: () => ({})
        },
        // TAG
        status: {
            type: String,
            default: "WAITING"
        },
        level: {
            type: String,
            default: "LOW"
        },
    });
    const emits = defineEmits(['click']);

    const MAX_LEN = 12;

// FUNC
    const sliceContent = computed(() => {
        // UPDATE 做了一定的兼容性处理。
        if (props.content.includes('</span>'))
            return props.content;        
        else if (props.content.length > MAX_LEN)
        // 还是 JS 对中英文的计数会简单好理解很多。相比 Go 的 UTF-8，容易截出乱码。
            return props.content.slice(0, MAX_LEN) + '...'; // 截断并添加省略号
        else
            return props.content;
    })

    // 实现一个简单的过滤。
    const tagsFilterHighlight = computed(() => {
        return props.tags.filter(tag => !props.tagsHighlight.includes(tag));
    })

    // TAG Router
    function gotoDetail() {
        let url = "/pages/";
        if (props.mode == "animal")
            url += "Detail/index?id=" + props.id;
        else if (props.mode == "encounter")
            url += "Encounter/detail?id=" + props.id;
        else if (props.mode == "task") {
            emits('click');
            return;
        }

        uni.navigateTo({ url });
    }

    function formatConf(num) {
        return (num * 100).toFixed(1) + '%';
    }

</script>

<style scoped>

.container-item {
    height: 100px;
}

.title {
    font-size: 16px;
    font-weight: bold;
}

.content {
    font-size: 14px;
    flex-wrap: wrap;
}

.conf {
    font-size: 20px;
    font-weight: bold;
}

</style>        