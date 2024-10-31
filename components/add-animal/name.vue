<template>
    <view class="flex-center-horizontal block">
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
            <menuFloat mode="text" :list="MenuList" :show="flag" @choose="(id) => funcGoto(id)"/>
        </h-btn>
    </view>
</template>

<script setup>
    import { ref } from "vue";

    // com
    import menuFloat from "../float-menu/menuFloat.vue";
    // store
// DATA
    const props = defineProps({
    });
    const emits = defineEmits(['name', 'nickNames']);
    
    const name = ref("");
    const MenuList = [
        { text: '增加别名' },   // TODO
        { text: 'AI 取名' },  // TODO
    ]
    const flag = ref(false);
    
// FUNC
    function funcGoto(id) {
        switch(id) {
            case 0: {
                console.log('add alias');
                emits('nickNames');
                break;
            }
            case 1: {
                console.log('AI name');
                break;
            }
            default: {
                console.log('default');
            }
        }
    }

</script>

<style scoped>

</style>        