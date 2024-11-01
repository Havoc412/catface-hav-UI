<template>
    <view class="flex-center-horizontal gap-20 container-tab-group" :style="{
        '--height': height + 'px'
    }">
        <template v-for="(item, index) in tabList" :key="index">
            <view class="flex-vertical title-unchosed" @click="change(index)">
                <view class="title-base" :class="{
                    'title-chosed': index === tabIndex
                }">{{ item }}</view>
                <view v-show="index == tabIndex" class="sliding-block" :style="{
                    '--color': color['main-deep']
                }"/>
            </view>
        </template>
    </view>
</template>

<script setup>
    import { ref, watch } from "vue";

    import color from "@/css/theme/index.module.scss";
    // store
// DATA
    const props = defineProps({
        tabList: Array,
        hiddenTrigger: Boolean,
    });
    const emits = defineEmits(["changeIndex"]);

    const consts = {
        HEIGHT_INIT: 30,
    }

    const height = ref(0);
    const tabIndex = ref(0);
    
// FUNC
    watch(() => props.hiddenTrigger, (newVal) => {
        height.value = newVal ? 0 : consts.HEIGHT_INIT;
    })

    const change = (index) => {
        if(index != tabIndex.value) {
            tabIndex.value = index;
            emits("changeIndex", index);
        }
        else if(index == 0) {
            // info 再次点击 地点项
            // uni.chooseLocation({
            //     success: function(res) {
                    
            //     }
            // })
            // uni.navigateTo({ url: '/components/linzq-citySelect/linzq-citySelect' })
        }
    }

</script>

<style scoped>

.container-tab-group {
    height: var(--height);
    overflow-y: hidden;

    transition: height .3s ease-in-out;
}

.sliding-block {
    height: 3px;
    border-radius: 2px;
    background-color: var(--color);
}

.title-base {
    transition: all .3s;
}

.title-unchosed {
    font-size: 16px;
    color: #333333;
}

.title-chosed {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
}

</style>        