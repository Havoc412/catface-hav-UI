<template>
    <view class="container-item flex-center-horizontal">
        <up-image src="/static/Qcat.png"/> <!--TODO POST IMAGE in Nginx-->
        <view class="shrink flex-vertical">
            <view>{{ props.title }}</view>
            <view class="shrink"/>
            <view class="flex-horizontal">
                <view>
                    
                </view>
            </view>
        </view>
        <view>
            
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        avatar: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "Title Default"
        },
        level: {
            type: String,
            default: "normal"
        },
        userAvatar: {
            type: String,
            default: ""
        },
        userName: {
            type: String,
            default: ""
        },
        time: {
            type: String,
            default: ""
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-item {
    border-radius: 25px;
}

</style>        