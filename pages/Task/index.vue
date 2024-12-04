<template>
    <view class="container-top flex-center-vertical bg-img gap-10">
        <view class="flex-center-horizontal block container-input">
            <input class="input" focus confirm-type="search" 
                placeholder="在这里输入查询"
                placeholder-style="font-size: 16px"
                :value="state.inputValue"
                @confirm="confirm"
            />
            <view class="flex-center-both gap-10">
                <h-icon name="tool-search_thin" size="20" @click="confirm"/>
                <h-icon name="task-talk" size="20" @click="gotoRag"/>
            </view>
        </view>
        <view v-if="flag.search.run" class="block container-simple">
            <view class="title">搜索</view>
            <statusWin v-if="flag.search.status.show"
                :status="flag.search.status.type" 
                mode="block" loaddingTextMode="knowledge"
                loaddingImgMode="necklace" loaddingImgSize="40px"
            />
            <!--TODO 兼容 highlight -->
            <view class="container-results flex-vertical block gap-20">
                <template v-for="(item, index) in dataShow.taskKeywords">
                    <taskBlock
                        mode="task"
                        :id="item.task_id"
                        :avatar="item.avatar"
                        :title="item.title"
                        :content="item.description"
                        :position="item.position"
                        :department="item.department"
                        :tagsHighlight="item.tagsHighlight"
                        :tags="item.tags"
                        :status="item.status"
                        :level="item.level"
                        :time="item.time"
                    />
                </template>
            </view>
        </view>
        <!--TAG POI & department 条件下-->
        <view class="block container-simple">
            <view class="title">
                <span>点位：</span>
                <span>{{ DepartmentJava[state.department].zh }}</span>
            </view>
            <!--TODO 根据poi就近查询一些。-->
            <view class="container-results flex-vertical block gap-20">
                <template v-for="(item, index) in dataShow.taskPosition">
                    <taskBlock
                        mode="task"
                        :id="item.task_id"
                        :avatar="item.avatar"
                        :title="item.title"
                        :content="item.description"
                        :position="item.position"
                        :department="item.department"
                        :tagsHighlight="item.tagsHighlight"
                        :tags="item.tags"
                        :status="item.status"
                        :level="item.level"
                        :time="item.time"
                    />
                </template>
            </view>
        </view>
        <!--TAG 最近的其他地区的状态-->
        <view class="block container-simple">
            <view class="title">路过·广场</view>
            <view class="container-results flex-vertical block gap-20">
                <template v-for="(item, index) in dataShow.tasksCommon">
                    <taskBlock
                        mode="task"
                        :id="item.task_id"
                        :avatar="item.avatar"
                        :title="item.title"
                        :content="item.description"
                        :position="item.position"
                        :department="item.department"
                        :tagsHighlight="item.tagsHighlight"
                        :tags="item.tags"
                        :status="item.status"
                        :level="item.level"
                        :time="item.time"
                    />
                </template>
            </view>
        </view>
        <!--加载 window-->
        <statusWin v-if="flag.status.show" 
            :status="flag.status.type" 
            mode="block" loaddingTextMode="knowledge"
            loaddingImgMode="necklace" loaddingImgSize="40px"
        />
        <placeHolder height="150"/>
    </view>
    <sideTools :show="[true, true]" :status="0" :mustStatus="0" :bottom="100"
        @add=""
    />
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";

    import api from "../../request/catface_task/task";

    import { DepartmentJava } from "../../common/consts";
    import { AITALK_MODE } from "../../store/aiTalk";
    // com
    import taskBlock from "../../components/search/variant/task-block.vue";
    import statusWin from "../../components/status-win/statusWin.vue";

    import placeHolder from "../../components/com/sub-tabbar/placeHolder.vue";
    import sideTools from "../../components/com/side-tools.vue";
    // store
// DATA
    const consts = {
        TASK_NUM_SINGLE: 5,
    }

    const flag = reactive({
        status: {
            show: false,
            type: "loadding"
        },
        search: {
            run: false,
            status: {
                show: false,
                type: "loadding"
            }
        }
    })

    const state = reactive({
        inputValue: "",
        taskCommon: {
            num: 0,
            skip: 0
        },
        taskPositon: {
            num: 0,
            skip: 0
        },
        taskKeywords: {
            num: 0,
            skip: 0
        },
        department: 'IT',
    });

    const dataShow = reactive({
        tasksCommon: [
            // {
            //     "task_id": 5,
            //     "user_id": 1,
            //     "title": "开发新功能",
            //     "description": "实现用户登录功能",
            //     "position": "后端开发",
            //     "department": "IT",
            //     "status": "WAITING",
            //     "level": "MEDIUM",
            //     "tags": [
            //         "登录",
            //         "安全",
            //         "后端"
            //     ],
            //     "time": {
            //         "start_time": "2024-12-02T09:00:00",
            //         "deadline": "2024-12-15T17:00:00",
            //         "estimated_min_duration": "PT8H",
            //         "estimated_max_duration": "PT10H"
            //     },
            //     "poi": {
            //         "latitude": 39.9042,
            //         "longitude": 116.407
            //     },
            //     "created_at": null
            // },
            // {
            //     "task_id": 4,
            //     "user_id": 2,
            //     "title": "优化数据库性能",
            //     "description": "对现有数据库进行性能优化，提升查询速度",
            //     "position": "数据库管理员",
            //     "department": "ENGINE",
            //     "status": "ACCEPTED",
            //     "level": "HIGH",
            //     "tags": [
            //         "数据库",
            //         "性能",
            //         "优化"
            //     ],
            //     "time": {
            //         "start_time": "2024-12-03T10:00:00",
            //         "deadline": "2024-12-10T16:00:00",
            //         "estimated_min_duration": "PT12H",
            //         "estimated_max_duration": "PT16H"
            //     },
            //     "poi": {
            //         "latitude": 40.7128,
            //         "longitude": -74.006
            //     },
            //     "created_at": null
            // }
        ],
        taskPosition: [],
        taskKeywords: [],
    });

// FUNC
    onMounted( async() => {
        flag.status.show = true;

        // Stage 1. Position
        const [res1, err1] = await api.getTaskList(consts.TASK_NUM_SINGLE, state.taskPositon.skip, 'department', state.department);
        if (err1 != null) {
            flag.status.type = "error";
            return;
        }
        console.debug(res1);
        dataShow.taskPosition = res1;
        state.taskPositon.skip += res1.length;
        
        // Stage 2. 广场 common
        const [res2, err2] = await api.getTaskList(consts.TASK_NUM_SINGLE, state.taskCommon.skip);
        if (err2 != null) {
            flag.status.type = "error";
            return;
        }
        console.debug(res2);
        dataShow.tasksCommon = res2;
        state.taskCommon.skip += res2.length;

        flag.status.show = false;
    })

    // Func
    async function confirm(e) {
        flag.search.run = true;
        flag.search.status.show = true;

        const [res, err] = await api.getTaskList(consts.TASK_NUM_SINGLE, state.taskPositon.skip, 'keywords', "", e.detail.value);
        if (err != null) {
            flag.status.type = "error";
            return;
        }
        console.debug(res);
        dataShow.taskKeywords = res;
        state.taskKeywords.skip += res.length;

        // flag.search.run = false;
        flag.search.status.show = false;
    }

    // router
    function gotoRag() {
        uni.navigateTo({
            url: "/pages/Rag/index?mode=" + AITALK_MODE.TASK 
        })
    }

</script>

<style scoped>

.container-top {
}

.container-input {
    /* margin-top: var(--margin-top); */
    
    /* height: var(--height); */
    height: 40px;
    width: 90%;
    padding: 5px 10px;

    border: 2px solid #000000;
    border-radius: 15px;
}

.container-simple {
    padding: 10px;
}

.container-results {
    padding: 10px 5px;
}

.title {
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-size: 18px;
}

</style>