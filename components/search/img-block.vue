<!--INFO 同时适配 Animal | Encounter-->
<template>
    <view class="flex-top-horizontal gap-10 block relative">
        <up-image :src="props.avatar" height="90px" width="90px" radius="12px"/> <!--TODO POST IMAGE in Nginx-->
        <view class="flex-vertical shrink">
            <view class="title">
                <rich-text :nodes="props.title"/>
            </view>
            <view style="min-height: 10px;">
                <tagGroup mode="highlight" :list="props.tags" :listHighlight="props.tagsHighlight"/>
            </view>
            <view class="content relative">
                <rich-text :nodes="props.content"/>
                <!-- {{ props.content }} -->
                <view class="absolute" style="right: -10px; top: -2px;">
                    <h-icon name="text-quota" size="14"/>
                </view>
            </view>
        </view>
        
        <view class="absolute" style="right: 0;">
            <view v-if="props.mode == 'animal'" class="flex-center-both gap-5">
                <schoolStatus :type="props.animalStatus"/>
                <departmentStatus :type="props.animalDepartment"/>
            </view>
            <view v-else-if="props.mode == 'encounter'">
                <pair :avatar="props.userAvatar" :name="props.userName"/>
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    // com
    import tagGroup from "../tag/group/tagGroup.vue";
    
    import pair from "../encounter/pair.vue";
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
        if (props.tagsHighlight == null) return [];
        const combinedTags = [...props.tagsHighlight, ...props.tags];
        const uniqueTags = [...new Set(combinedTags)];
        console.debug(uniqueTags);
        return uniqueTags;
    })

</script>

<style scoped>

.title {
    font-size: 16px;
    font-weight: bold;
}

.content {
    font-size: 14px;
    flex-wrap: wrap;
    margin-top: 5px;
}

</style>        