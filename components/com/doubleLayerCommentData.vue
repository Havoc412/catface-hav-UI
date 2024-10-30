<!--简易的双层信息展示-->
<<template>
    <view class="flex-center-vertical gap-5">
        <view class="top-text">{{ props.text }}</view>
        <view class="sub-text">{{ props.subText }}</view>
    </view>
</template>

<script setup>
    import { ref } from "vue";
    // store
// DATA
    const props = defineProps({
        text: {
            type: String,
            default: "顶层"
        },
        subText: {
            type: String,
            default: "底层"
        }
    });
    const emits = defineEmits([]);

// FUNC

</script>

<style scoped>

.top-text {
    font-family: Alimama ShuHeiTi;
    font-size: 16px;
    color: #000;
}

.sub-text {
    font-size: 11px;
    color: #999;
}

</style>        