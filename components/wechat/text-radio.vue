<template>
    <view class="flex-center-horizontal gap-10" @click="click">
        <view class="text" :style="{
            '--color': props.color
        }">{{ props.text }}</view>
        <view class="flex-center-both radio" :class="{
            'selected': flag,
            'unselected': !flag,
            'disabled': props.disabled
        }">
            <h-icon v-if="flag" name="wechat-selected" size="20"/>                
        </view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "Radio Text"
        },
        color: {
            type: String,
            default: "#1E1E1E"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        flagStartStatus: {
            type: Boolean,
            default: false
        }
    });
    const emits = defineEmits(['click']);

    const flag = ref(props.flagStartStatus);

// FUNC
    function click() {
        if (props.disabled) return;
        flag.value = !flag.value;
        emits('click', flag.value);
    }

</script>

<style scoped>

.text {
    color: var(--color);
}

.radio {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

.unselected {
    border: 1px solid #1E1E1E;
    background-color: transparent;
}

.selected {
    background-color: #07C160;
}

</style>        