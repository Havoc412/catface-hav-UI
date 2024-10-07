<template>
    <view class="drag-area flex-center-vertical shrink">
        <h-icon name="func-line" :style="{
            'width': '50px'
        }"/>
        <view class="flex-center-vertical">
            <template v-for="id in 4">
                <view class="flex-horizontal gap-10">
                    <post/>
                    <post/>
                </view>
            </template>
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    
    import post from "../../components/home/post.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.drag-area {
    position: fixed;
    top: 200px;
    
    width: 100vw;
    
    background-color: #fff;
    border-radius: 24px 24px 0 0;
}

</style>        