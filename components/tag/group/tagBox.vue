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
        startUnselectedList: {
            type: Array,
            default: () => []
        }
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
        for (let i=0; i<props.tagList.length; i++) {
            if (props.startUnselectedList.includes(i)) {
                status.value.push(false);
                selectedAllFlag.value = false;
            } else {
                status.value.push(true);
                selectedCnt.value += 1;
            }
        }
        refresh();
    })

    // Style
    const colNum = 3;
    const getHeight = computed(() => {
        const rowNum = Math.ceil(props.tagList.length / colNum);
        return (rowNum * 41 - 11).toString() + 'px';
    });
    
    const selectedAllFlag = computed(() => {
        return selectedCnt.value === props.tagList.length;
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