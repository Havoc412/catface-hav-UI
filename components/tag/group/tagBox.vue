<template>
    <view class="flex-vertical gap-10">
        <view class="flex-center-horizontal gap-10" @click="openFlag = !openFlag">
            <text class="title">{{ props.title }}</text>
            <view @click.stop="selectAll">
                <h-icon size="18" :name="selectedAllFlag ? 'block-all' : 'block-empty'"/>
            </view>
            <view class="shrink"/>
            <h-icon :name="!openFlag ? 'arrow-up_thin_x' : 'arrow-down_thin_x'" size="16"/>
        </view>
        <!--content-->
        <view class="tags-container" :style="{'height': openFlag ? getHeight : '0'}">
            <h-tag v-for="(text, index) in props.tagList" :key="index" 
                :text="text" mode="hollow" :startSelected="status[index]" :refresh="refreshFlag"
                @toggle="(newStatus) => toggle(newStatus, index)"
            />
        </view>
    </view>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from "vue";

    import { BookFilterConditions } from "../../../common/consts-style";
    // com
    // store

// DATA
    const props = defineProps({
        index: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: "默认标题"
        },
        tagList: {
            type: Array,
            default: () => ["敬请期待"]
        },
        startMode: Boolean,
        // INFO 初始被排除。
        startUnselectedList: {  // UPDATE 这个变量名不太合适：目前的效果是 1. 如果为空，代表全选；2. 不空则代表选中。
            type: Array,
            default: () => []
        },
        refresh: Boolean,
    });
    const emits = defineEmits(['open']);

    // flag
    const openFlag = ref(props.startMode);
    
    // 控制刷新
    const refreshFlag = ref(false);
    const status = ref([])

    // 
    const selectedCnt = ref(0);
    
// FUNC
    onMounted(() => {
        init(props.startUnselectedList);
    })
    watch(() => props.refresh, (newVal) => {
        init(props.startUnselectedList);
    })
    
    function init(list) {
        if (list.length === 0) {
            status.value = Array(props.tagList.length).fill(true);
            selectedCnt.value = props.tagList.length;
        } else {
            status.value = Array(props.tagList.length).fill(false); // 初始化 status 数组，所有元素为 false
            selectedCnt.value = list.length;
            // INFO 这里需要反向解析；对应 getSelectedList；
            list.forEach(item => {
                if (item === 1)
                    status.value[props.tagList.length - 1] = true;
                else
                    status.value[item - 2] = true;
            })
        }
        refresh();
    }

    function getSelectedList() {
        // 如果处于全选状态，不需要过滤。
        if (selectedAllFlag.value)
            return "";
        // INFO 特化 Status，如果没有选中其中任何一个，那么就采用默认值；@Reason：尽量减少【喵星】数据的意外出现。
        if (props.title == '学业状态' && selectedCnt.value == 0)
            return BookFilterConditions.status;
        // 一般的处理方式
        return status.value.map((item, index) => {
            // INFO 这里调整了 unknown 的真值；
            const id = item ? index + 2 : null;
            return id == ( props.tagList.length + 1 ) ? 1 : id;
        }).filter(item => item !== null).join(',');
    }
    
    // Style
    const colNum = 3;
    const getHeight = computed(() => {
        const rowNum = Math.ceil(props.tagList.length / colNum);
        return (rowNum * 41 - 11).toString() + 'px';
    });
    
    const selectedAllFlag = computed(() => {
        return selectedCnt.value >= props.tagList.length;
    });


    function refresh() {
        refreshFlag.value = !refreshFlag.value;
    }

    function selectAll() {
        if (selectedAllFlag.value) {
            for (let i=0; i<props.tagList.length; i++) {
                status.value[i] = false;
            }
            selectedCnt.value = 0;
        } else {
            for (let i=0; i<props.tagList.length; i++) {
                status.value[i] = true;
            }
            selectedCnt.value = props.tagList.length;
        }
        refresh();
    }

    function toggle(newStatus, index) {
        status.value[index] = newStatus;
        if (newStatus) {
            selectedCnt.value += 1;
        } else {
            selectedCnt.value -= 1;
        }
        refresh();
    }

    // 对外暴露。
    defineExpose({ getSelectedList, init });

</script>

<style scoped lang="css">

/* top */
.title {
  font-size: 14px;
  font-weight: bold;
  line-height: 13px;
  color: #000000;
}

.tags-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    overflow: hidden;
    transition: height 0.3s ease-in-out;
}

</style>