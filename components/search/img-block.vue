<!--INFO 同时适配 Animal | Encounter-->
<template>
    <view class="flex-top-horizontal gap-10 block relative">
        <up-image :src="props.avatar" height="90px" width="90px" radius="12px"/> <!--TODO POST IMAGE in Nginx-->
        <view class="flex-vertical shrink">
            <view class="title">{{ props.title }}</view>
            <tagGroup mode="highlight" :list="list"/>
            <view class="content">{{ props.content }}</view>
        </view>
        
        <view class="container-addational absolute" style="right: 0;">
            <view v-if="props.mode == 'animal'" class="flex-center-both gap-5">
                <schoolStatus :type="props.animalStatus"/>
                <departmentStatus :type="props.animalDepartment"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    // com
    import tagGroup from "../tag/group/tagGroup.vue";
    
    import schoolStatus from "../book/sub-cat/schoolStatus.vue";
    import departmentStatus from "../book/sub-cat/departmentStatus.vue";
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: 'animal' // encounter
        },
        // base information
        id: Number,
        avatar: {
            type: String,
            default: "/static/user.jpg"
        },
        title: {
            type: String,
            default: "Title Default"
        },
        content: {
            type: String,
            default: "Content Default"
        },
        tagsHighlight: Array,
        tags: Array,
        // TAG animal
        animalStatus: Number,
        animalDepartment: Number,
        // TAG encounter
        userAvatar: String,
        userName: String
    });
    const emits = defineEmits([]);

// FUNC
    const list = computed(() => {
        if (props.tagsHighlight == null) return;
        const combinedTags = [...props.tagsHighlight, ...props.tags];
        const uniqueTags = [...new Set(combinedTags)];
        console.debug(uniqueTags);
        return uniqueTags;
    })

</script>

<style scoped>

.container-addational {
    
}

.title {
    font-size: 16px;
    font-weight: bold;
}

.content {
    font-size: 14px;
    flex-wrap: wrap;
}

</style>        