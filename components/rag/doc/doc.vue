<!--这里集中管理不同种类的 doc，直接被 ai.vue 引入，并调用其方法-->
<template>
    <view class="mt-10">
        <up-divider :hairline="false" :text="TITLE" lineColor="#888888"/>
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
    import { ref } from "vue";
    // com
    import knowledge from "./knowledge.vue";
    import encounter from "./encounter.vue";

    const TITLE = "参考资料"
    
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
    
</script>

<style scoped>

</style>        