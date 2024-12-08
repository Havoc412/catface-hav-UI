<template>
    <view @click="flag = true">
        <h-tag :text="props.mode == 'ellipsis' ? data.text[0] : data.text" bgColor="#fff" lightHold shadow/>
    </view>
    <!--TAG Department 下方弹出 · 选择器-->
    <view class="fixed"> <!-- INFO 不套起来，会影响外层 horizontal 的布局。-->
        <up-picker
            v-if="props.mode == 'choose'"
            :show="flag"
            :columns="[Departments_ZH]"
            title="请选择猫猫最常出没地区"
            :closeOnClickOverlay="true"
            @close="flag = false"
            @cancel="flag = false"
            @confirm="confirm"
        >
        </up-picker>
    </view>
</template>

<script setup>
    import { ref, reactive, onMounted, watch } from "vue";
    // import color from "@/css/theme/index.module.scss";v
    import { Departments_EN, Departments_ZH, GetFrontIndex } from "../../../common/consts";
    // store

// DATA
    const typeValue = defineModel('type');
    const props = defineProps({
        type: {
            type: [String, Number],
            default: "it"  // 
        },
        mode: {
            type: String,
            default: "default" // ellipsis: 首字展示方式。 || choose-default: 选择器模式。
        }
    });
    const emits = defineEmits([]);

    // ZH 与 EN 一一对应

    const data = reactive({
        text: "其他",
        type: "other"
    });
    const flag = ref(false);

// FUNC
    onMounted(() => {
        init();
    })

    watch(() => props.type, () => {
        if (props.mode == 'choose') return;
        init();
    });

    function init() {
        if (typeof props.type === 'string') {
            data.type = props.type;
            const lowerCaseType = props.type.toLowerCase();  // 大小写不敏感。
            const idx = Math.max(Departments_EN.indexOf(lowerCaseType), 0); // 如果是 -1 就返回 0
            data.text = Departments_ZH[idx];
        } else {
            const index = GetFrontIndex(props.type, Departments_ZH.length);
            data.text = Departments_ZH[index];
            data.type = Departments_EN[index];
        }
    }

    function confirm(event) {
        const departmentZH = event.value[0];
        const idx = Departments_ZH.indexOf(departmentZH);

        data.text = departmentZH;
        data.type = Departments_EN[idx];

        // v-model 设定
        typeValue.value = data.type.toUpperCase(); // 配合 JAVA 转为大写。
        // 
        flag.value = false;
    }

</script>

<style scoped></style>