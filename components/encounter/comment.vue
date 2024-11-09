<template>
    <view class="flex-vertical gap-10">
        <!-- <text>共{{ props.commentNum }}条评论</text> -->
        <comment-input/>
        <!---->
        <comment-merge v-for="(item, index) in props.list" :key="index"
            :self="item.self" :replay="item.replay"/>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // com
    import commentInput from "./comment-sub/commentInput.vue";
    import commentMerge from "./comment-sub/commentMerge.vue";
    // store
// DATA
    const props = defineProps({
        commentNum: {
            type: [Number, String],
            default: 4
        },
        list: {
            type: Array,
            default: () => [
                {
                    self: {
                        avatar: "/static/user.jpg",
                        userName: "WHUER-1",
                        likeNum: 193,
                        likeFlag: true,
                        
                        content: "今天在路边遇到了几只流浪猫，它们看起来很可爱，但也很需要帮助。希望大家能关注这些小生命，给予它们一些温暖。",
                        time: "2023-01-21",
                    },
                    replay: [ // tag 二级评论
                        {
                            avatar: "/static/user.jpg",
                            userName: "WHUER-1",
                            likeNum: 43,
                            likeFlag: false,

                            content: "确实，每次看到流浪猫都会心软，希望有更多人能伸出援手。",
                            time: "2023-01-21",
                        },
                        {
                            avatar: "/static/user.jpg",
                            userName: "WHUER-2",
                            likeNum: 0,
                            likeFlag: false,

                            content: "TEST",
                            time: "2023-01-22",
                        }
                    ]
                },
                {
                    // default
                }
            ]
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

</style>        