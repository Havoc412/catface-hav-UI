<template>
    <up-input
        v-model="name"
        placeholder="为 ta 起一个好听的名字"
        placeholderStyle="color: #888888"
        clearable
        @blur="emits('name', name)"
        :customStyle="{
            marginRight: '5px'
        }"
    ></up-input>
    <h-btn variant="text" icon="com-more_deep" @click="flag = !flag">
        <menuFloat mode="text" :list="MenuList" :show="flag"/>
    </h-btn>
</template>

<script setup>
    import { ref } from "vue";

    // com
    import menuFloat from "../float-menu/menuFloat.vue";
    // store
// DATA
    const props = defineProps({
    });
    const emits = defineEmits(['name']);
    
    const name = ref("");
    const MenuList = [
        { text: '增加别名' },   // TODO
        { text: 'AI 取名' },  // TODO
    ]
    const flag = ref(false);
// FUNC

</script>

<style scoped>

</style>        