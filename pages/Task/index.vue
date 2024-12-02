<template>
    <view class="container-top flex-center-vertical bg-img gap-10">
        <view class="flex-center-horizontal gap-10 block container-input">
            <input class="input" focus confirm-type="search" 
                placeholder="在这里输入查询词句"
                placeholder-style="font-size: 16px"
                :value="state.inputValue"
                @confirm="confirm"
            />
            <h-icon name="tool-search_thin" size="20" @click="confirm"/>
        </view>
        <view class="block container-simple">
            <view class="title">附近</view>
            <!--TODO 根据poi就近查询一些。-->
        </view>
        <view class="block container-simple">
            <view class="title">路过·广场</view>
            <view class="container-results flex-vertical gap-10 block">
                <template v-for="(item, index) in dataShow.tasksCommon">
                    <taskBlock
                        mode="task"
                        :id="item.task_id"
                        :avatar="item.avatar"
                        :title="item.title"
                        :content="item.description"
                        :position="item.position"
                        :tagsHighlight="item.tagsHighlight"
                        :tags="item.tags"
                        :status="item.status"
                        :level="item.level"
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
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    // com
    import taskBlock from "../../components/search/variant/task-block.vue";

    import statusWin from "../../components/status-win/statusWin.vue";
    // store
// DATA
    const flag = reactive({
        status: {
            show: true,
            type: "loadding"
        }
    })

    const state = reactive({
        inputValue: ""
    });

    const dataShow = reactive({
        tasksCommon: [
            {
                "task_id": 5,
                "user_id": 1,
                "title": "开发新功能",
                "description": "实现用户登录功能",
                "position": "后端开发",
                "status": "WAITING",
                "level": "MEDIUM",
                "tags": [
                    "登录",
                    "安全",
                    "后端"
                ],
                "time": {
                    "start_time": "2024-12-02T09:00:00",
                    "deadline": "2024-12-15T17:00:00",
                    "estimated_min_duration": "PT8H",
                    "estimated_max_duration": "PT10H"
                },
                "poi": {
                    "latitude": 39.9042,
                    "longitude": 116.407
                },
                "created_at": null
            },
            {
                "task_id": 4,
                "user_id": 2,
                "title": "优化数据库性能",
                "description": "对现有数据库进行性能优化，提升查询速度",
                "position": "数据库管理员",
                "status": "ACCEPTED",
                "level": "HIGH",
                "tags": [
                    "数据库",
                    "性能",
                    "优化"
                ],
                "time": {
                    "start_time": "2024-12-03T10:00:00",
                    "deadline": "2024-12-10T16:00:00",
                    "estimated_min_duration": "PT12H",
                    "estimated_max_duration": "PT16H"
                },
                "poi": {
                    "latitude": 40.7128,
                    "longitude": -74.006
                },
                "created_at": null
            }
        ]
    });

// FUNC
    onMounted(() => {

    })

    // Func
    async function confirm(e) {

    }

</script>

<style scoped>

.container-top {
    min-height: 100vh;
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