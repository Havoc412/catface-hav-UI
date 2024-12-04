<!--这里集中管理不同种类的 doc，直接被 ai.vue 引入，并调用其方法-->
<template>
    <up-divider :hairline="false" :text="TITLE" lineColor="#888888"/>
    <view class="mt-10 flex-vertical gap-10">
        <template v-for="(item, index) in nodes" :key="index">
            <knowledge v-if="item.type == 'doc'"
                :id="item.id"
                :fileName="item.name"
                :content="item.content"
                :updatedAt="item.updated_at"
            />
            <encounter v-else-if="item.type == 'encounter'"
                :id="item.id"
                :title="item.title"
                :content="item.content"
                :updatedAt="item.updated_at"
            />
            <task v-else-if="item.type == 'task'"
                :id="item.task.id"
                :title="item.task.title"
                :content="item.task.description"
            />
        </template>
    </view>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    // com
    import knowledge from "./knowledge.vue";
    import encounter from "./encounter.vue";
    import task from "./task.vue";

    const TITLE = ref("参考资料")

    let flag = {
        knowledge: false,
        encounter: false,
        task: false
    }
    
    // store
// DATA
    const props = defineProps({
        nodes: {
            type: Object,
            default: () => ({})
        }
    });
    const emits = defineEmits([]);

// FUNC
    onMounted(() => {  // 很粗糙的 if-else
        props.nodes.forEach(item => {
            if(item.type == "doc")
                flag.knowledge = true;
            else if(item.type == "encounter")
                flag.encounter = true;
            else if(item.type == "task")
                flag.task = true;
        })
        if(!flag.knowledge && !flag.encounter && !flag.task)
            TITLE.value = "暂无参考资料"
        else if(flag.knowledge && !flag.encounter)
            TITLE.value = "参考资料"
        else if(!flag.knowledge && flag.encounter)
            TITLE.value = "参考路遇"
        else if(flag.task)
            TITLE.value = "参考任务"
        else
            TITLE.value = "参考信息"
    })
    
</script>

<style scoped>

</style>        