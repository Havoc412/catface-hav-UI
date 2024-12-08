<template>
    <view class="flex-center-vertical gap-5" @click.stop>
        <view class="title-0">发布求助</view>
        <view class="block mt-5 flex-vertical gap-10">
            <view class="flex-horizontal gap-10">
                <view class="title">求助细节*</view>
                <view class="shrink"/>
                <taskLevel 
                    mode="choose"
                    v-model:type="data.level"
                    :type="data.level"
                />
                <departmentStatus :type="data.department"/>
            </view>
            <up-textarea
                v-model="data.description"
                placeholder="在这里描述你的求助..."
            />
            <view class="flex-horizontal gap-10" @click="flag.time = true">
                <view class="title">时间*</view>
                <view class="shrink flex-center-both gap-10">
                    {{ data.time.start_time }}
                    <h-icon name="com-more_deep" size="13"/>
                    {{ data.time.deadline }}
                </view>
            </view>
            <!--TAG position detail #TODO 之后再做。-->
            <!-- <view class="flex-horizontal gap-10">
                <view class="title title-2"></view>
            </view> -->
            <!--标签 && 标题-->
            <view class="flex-horizontal gap-10">
                <view class="title title-2">标签</view>
                <ChipGroup mode="editable" infoIcon
                    @change="(values) => { data.tags = values; }">
                    <template #info>
                        在这里可以用一些关键词来快速标记特点
                        eg. need小电驴!
                    </template>
                </ChipGroup>
            </view>
            <view class="flex-horizontal gap-10">
                <view class="title title-2">标题</view>
                <up-input
                    v-model="data.title"
                    placeholder="在此输入标题，或者 AI 总结"
                    border="none"
                    :placeholderStyle="JSON.stringify({
                        color: '#888888',
                    })"
                    fontSize="12"
                    clearable
                    @change=""
                >
                    <template #suffix>
                        <btnLoadding 
                            :trigger="flag.titleBtn"
                            text="AI"
                            :customStyle="{
                                'background-color': color['main-deep'],
                                color: '#fff',
                                'font-size': '12px',
                            }"
                            @click="generateTitle"
                            @cancel="flag.titleBtn = false"
                        />
                    </template>
                </up-input>
            </view>
        </view>
        <view class="mt-20">
            <h-btn
                text="发布"
                :customStyle="{
                    'background-color': '#374957',
                    'font-family': 'Alimama ShuHeiTi',
                    'font-weight': 'bold',
                    'color': '#fff',
                    'font-size': '16px',
                    'height': '40px',
                    'border-radius': '20px',
                }"
                @click="submit"
                @clickDisabled=""
            /> <!--TODO 未完成时，提醒需要完成的内容。-->
        </view>
    </view>
    <!--TAG popup calendar-->
    <view @click.stop> <!--由于双层悬浮窗，所以先简单遮罩。-->
        <up-calendar :show="flag.time" mode="range" @confirm="confirmTime" @close="flag.time = false"/>        
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, computed } from "vue";

    import color from "@/css/theme/index.module.scss";
    import { formatDate } from "../../../utils/date";

    import { TOAST } from "@/utils/notice";
    import api from "../../../request/catface_task/task";
    import apiNLP from "../../../request/nlp";
    // com
    import taskLevel from "../../../components/task/taskLevel.vue";
    import departmentStatus from "../../../components/book/sub-cat/departmentStatus.vue";
    import btnLoadding from "../../../components/com/button/variant/btn-loadding.vue";
    import ChipGroup from "../../../components/com/chip/chipGroup.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['addTask']);

    const flag = reactive({
        time: false,
        titleBtn: false,
    })
    
    const data = reactive({
        title: "",
        description: "",

        level: "LOW",
        tags: [],

        department: "IT",
        position: "",
        poi: {
            latitude: 0,
            longitude: 0
        },

        time: {
            start_time: "",
            deadline: "",
            estimated_min_duration: "",  // UPDATE 前端目前只考虑单个预估消耗时间。
            estimated_max_duration: ""
        }
    });

// FUNC
    onMounted(() => {
        const dateTemp = new Date();
        data.time.start_time = formatDate(dateTemp);
        data.time.deadline = data.time.start_time;
    });

    // data
    function confirmTime(time) {
        console.debug(time);
        data.time.start_time = time[0];
        data.time.deadline = time[time.length - 1];
        // close float window
        flag.time = false;
    }

    // style
    const submitAbled = computed(() => {
        return data.title.length > 0 && data.description.length > 0;
    });

    // core func
    const getExplain4LLM = computed(() => {
        return `任务标题：${data.title}， 任务描述：${data.description}， 任务标签：${data.tags.join(", ")}， 预估时间：${data.time.start_time} - ${data.time.deadline}`
    });

    async function generateTitle() {
        // STAGE Check
        if (data.description.length == 0) {
            flag.titleBtn = false;
            TOAST("请先描述你的求助。")
            return;
        }
        // Run
        flag.titleBtn = true;
        const title = await apiNLP.getTitle(getExplain4LLM.value);
        if(flag.titleBtn)
            data.title = title;
        flag.titleBtn = false;
    }

    async function submit() {
        console.debug(data); return; // TEST
        // 上面 submitAbled 已经检查过了。
        const [res, err] = await api.addTask(data);
        if (err) {
            TOAST("发布失败，请稍后再试。")
        } else {
            TOAST("发布成功！", "success");
            emits('addTask');
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