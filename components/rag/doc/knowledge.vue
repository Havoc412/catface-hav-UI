<template>
    <view class="container-knowledge flex-center-horizontal gap-5" @click="flag = true">
        <view class="name">
            {{ props.fileName }}
        </view>
        <view class="content shrink">
            {{ contentSlice }}
        </view>
        <h-btn icon="arrow-right" variant="tonal"/>
    </view>
    <up-overlay opacity=".3" :show="flag" @click="flag = false">
        <blockBase closeFontBold width="90vw">
            <view class="flex-center-horizontal block-name">
                <view>From: {{ props.fileName }}</view>
                <view class="shrink"/>
                <view>ID: {{ props.id }}</view>
            </view>
            <up-divider :hairline="false" lineColor="#888888"/>
            <view class="mt-10 container-content"><span>
                {{ props.content }}
            </span></view>
        </blockBase>
    </up-overlay>
</template>

<script setup>
    import { ref, computed } from "vue";
    // com
    import blockBase from "../../com/substrate/blockBase.vue";
    // store
// DATA
    const props = defineProps({
        id: {
            type: Number,
            default: 0,
        },
        fileName: {
            type: String,
            default: "knowledge.docx"
        },
        content: {
            type: String,
            default: "这是知识文档的内容。"
        }
    });
    const emits = defineEmits([]);

    const flag = ref(false);

// FUNC
    const contentSlice = computed(() => {
        return props.content.slice(0, 10) + "..."
    })

</script>

<style scoped>

.container-knowledge {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding-left: 5px;
}

.name {
    font-size: 14px;
}

.block-name {
    font-weight: bold;
}

.content {
    font-size: 12px;
    font-weight: 300;
}

.container-content {
    max-height: 70vh;
    overflow-y: scroll;
}

</style>