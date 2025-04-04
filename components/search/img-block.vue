<!--INFO #1 
 *   1. 同时适配 Search: Animal | Encounter
 *   2. CatFace 的展示。
-->
<template>
    <view class="flex-top-horizontal gap-10 block relative container-item" @click="gotoDetail">
        <up-image :src="props.avatar" height="90px" width="90px" radius="12px"/> <!--TODO POST IMAGE in Nginx-->
        <view class="flex-vertical shrink"> 
            <view class="title">
                <!--UPDATE nodes 不推荐使用 String 类型，性能会有所下降。From: https://uniapp.dcloud.net.cn/component/rich-text.html-->
                <rich-text :nodes="props.title"/>
            </view>
            <!-- Nick Name -->
            <view style="min-height: 10px;">
                <tagGroup mode="highlight" :list="tagsFilterHighlight" :listHighlight="props.tagsHighlight"/>
            </view>
            <view class="content block relative">
                <!--INFO #1 适配 ES 的富文本解析 -->
                <template v-if="!props.conf">
                    <rich-text :nodes="sliceContent"/>
                    <!-- {{ sliceContent }} for test -->
                    <view class="absolute" style="right: -10px; top: -2px;">
                        <h-icon name="text-quota" size="14"/>
                    </view>
                </template>
                <!-- #2 适配 catface 的 Conf 展示 -->
                <template v-else>
                    <view class="flex-top-horizontal block">
                        <view style="width: 70%;">{{ sliceContent }}</view>
                        <view v-if="props.conf" class="conf shrink">
                            {{ formatConf(props.conf) }}
                        </view>
                    </view>
                </template>
            </view>
        </view>
        <!--右上角状态信息-->
        <view class="absolute" style="right: 0;">
            <view v-if="props.mode == 'animal'" class="flex-center-both gap-5">
                <schoolStatus :type="props.animalStatus"/>
                <departmentStatus :type="props.animalDepartment"/>
            </view>
            <view v-else-if="props.mode == 'encounter'">
                <pair imgSize="30" :avatar="props.userAvatar" :name="props.userName"/>
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
        tagsHighlight: {
            type: Array,
            default: () => []
        },
        tags: {
            type: Array,
            default: () => []
        },
        // TAG animal
        animalStatus: Number,
        animalDepartment: Number,
        // TAG encounter
        userAvatar: String,
        userName: String,
        // TEST TEMP
        conf: null,
    });
    const emits = defineEmits([]);
    
    const MAX_LEN = 16;

// FUNC
    const sliceContent = computed(() => {
        // UPDATE 做了一定的兼容性处理。
        if (props.content.includes('</span>'))
            return props.content;        
        else if (props.content.length > MAX_LEN)
        // 还是 JS 对中英文的计数会简单好理解很多。相比 Go 的 UTF-8，容易截出乱码。
            return props.content.slice(0, MAX_LEN) + '...'; // 截断并添加省略号
        else
            return props.content;
    })

    // 实现一个简单的过滤。
    const tagsFilterHighlight = computed(() => {
        return props.tags.filter(tag => !props.tagsHighlight.includes(tag));
    })

    // TAG Router
    function gotoDetail() {
        let url = "/pages/";
        if (props.mode == "animal")
            url += "Detail/index?id=" + props.id;
        else if (props.mode == "encounter")
            url += "Encounter/detail?id=" + props.id;

        uni.navigateTo({ url });
    }

    function formatConf(num) {
        return (num * 100).toFixed(1) + '%';
    }

</script>

<style scoped>

.container-item {
    height: 100px;
}

.title {
    font-size: 16px;
    font-weight: bold;
}

.content {
    margin-top: 5px;

    font-size: 14px;
    flex-wrap: wrap;
}

.conf {
    font-size: 20px;
    font-weight: bold;
}

</style>        