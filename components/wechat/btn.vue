<template>
    <view class="flex-center-horizontal container-btn" :style="{
        '--bg-color': props.bgColor,
        '--radius': props.radius + 'px',
        '--font-size': props.fontSize,
        '--font-weight': props.fontWeight,
    }">
        <view class="sub-btn" :style="{
            '--color': props.color,
        }">
            {{ props.text }}
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
            default: "Button"
        },
        bgColor: {
            type: String,
            default: "#fff"
        },
        color: {
            type: String,
            default: "#1E1E1E"  
        },
        fontSize: {
            type: String,
            default: "17px"  
        },
        fontWeight: {
            type: String,
            default: "500"
        },
        radius: {
            type: [String, Number],
            default: 4
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.container-btn {
    background-color: var(--bg-color);
    border-radius: var(--radius);
    
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    padding: 8px 60px;
}

.sub-btn {
    color: var(--color);
}

</style>        