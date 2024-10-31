<template>
    <view class="container-drag">
        <view class="container-func">
            <view class="flex-center-vertical">
                <h-btn 
                    icon="tool-delete_thin_white"
                    iconSize="30"
                    :customStyle="{
                        'background-color': '#ff0000',
                        'width': '100px',
                        'height': '100px',
                    }"
                />
            </view>
        </view>
        <movable-area class="container-full">
            <movable-view ref="dragViewRef" :x="x" :y="y" direction="all" @change="onChange" @click.stop="console.debug('click')">
                <view class="flex-center-both">
                    <h-chip :text="props.text" light/>
                </view>
            </movable-view>
        </movable-area>
    </view>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "日常"
        },
        pageX: {
            type: Number,
            default: 0
        },
        pageY: {
            type: Number,
            default: 0
        }
    });
    const emits = defineEmits([]);

    const x = ref(props.pageX);
    const y = ref(props.pageY + 20);  // 奇怪的矫正。

    const dragViewRef = ref(null);

// FUNC
    onMounted(() => {
        if(dragViewRef.value) {
            console.debug("dragViewRef", dragViewRef.value);
            dragViewRef.value.$el.longPress();
        }
    })

    function onChange(e) {
        x.value = e.detail.x;
        y.value = e.detail.y;
    }

</script>

<style scoped>

.container-drag {
    position: fixed;
    top: 0;
    left: 0;
    
    width: 750rpx;
    height: 100vh;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.2);
}

.container-full {
    width: 750rpx;
    height: 100vh;
}

.container-func {
    position: fixed;
    width: 100vw;

    bottom: 50px;
}

</style>        