<template>
    <view class="container-chip-group" :class="{'scroll': props.scroll}" :style="{
        '--container-width': props.containerWidthPrecent + '%',
    }">
        <template v-if="props.mode == 'highlight'">
            <template v-for="(item, index) in props.listHighlight" :key="index">
                <view class="item">
                    <h-tag
                        mode="hollow"
                        :text="item"
                        :lightHold="true"
                        :startSelected="true"
                        :customStyle="tagStyle"
                   />
                </view>
            </template>
        </template>
        <!--INFO 常规部分-->
        <template v-for="(item, index) in data" :key="index">
            <view class="item">
                <h-tag
                    mode="hollow"
                    :text="item"
                    :lightHold="props.mode == 'highlight'"
                    :startSelected="startSelected"
                    :customStyle="tagStyle"
                />
            </view>
        </template>
    </view>
</template>

<script setup>
    import { ref, computed } from "vue";
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: "default"  // INFO highlight
        },
        scroll: {   // 是否启用长轴滚动。
            type: Boolean,
            default: false
        },
        containerWidthPrecent: {  // 由于自动换行的效果需要限定宽度，但是直接设为 100% 不适配所有情况，
            type: [String, Number],
            default: "100"
        },
        list: {
            type: Array,
            default: () => []
        },
        // TAG highlight
        listHighlight: Array
    });
    const emits = defineEmits([]);

    const data = ref(props.list);

// FUNC
    const startSelected = computed(() => {
        if (props.mode == 'highlight')
            return false
    })

    const tagStyle = computed(() => {
        if (props.mode == 'highlight')
            return {
                height: 'auto',
                padding: '2px',
                backgroundColor: 'transparent'
            }
    })

</script>

<style scoped>

.container-chip-group {
    width: var(--container-width);
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

</style>        