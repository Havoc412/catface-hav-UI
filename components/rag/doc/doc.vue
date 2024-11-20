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
        </template>
    </view>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    // com
    import knowledge from "./knowledge.vue";
    import encounter from "./encounter.vue";

    const TITLE = ref("参考资料")

    let flag = {
        knowledge: false,
        encounter: false
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
        })
        if(!flag.knowledge && !flag.encounter)
            TITLE.value = "暂无参考资料"
        else if(flag.knowledge && !flag.encounter)
            TITLE.value = "参考资料"
        else if(!flag.knowledge && flag.encounter)
            TITLE.value = "参考路遇"
        else
            TITLE.value = "参考信息"
    })
    
</script>

<style scoped>

</style>        