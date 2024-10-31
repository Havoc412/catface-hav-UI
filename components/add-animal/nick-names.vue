<template>
    <chipGroup mode="editable" infoIcon 
        @change="(values) => { emits('change', values) }" 
        @info="flag.info = true"
    />
    <up-overlay opacity=".1" :show="flag.info" @click="flag.info = false">
        <blockBase>
            别名最多三个，每个别名最多10个字。<br/>
            双击标签即可删除。
        </blockBase>
    </up-overlay>
    <!-- <up-overlay opacity=".3" :show="flag.delete" @click="flag.delete = false">
        <chipDragFunc :text="deleteDrag.text" :pageX="deleteDrag.pageX" :pageY="deleteDrag.pageY"/>
    </up-overlay> -->
</template>

<script setup>
    import { reactive } from "vue";

    import chipGroup from "../com/chip/chipGroup.vue";
    import blockBase from "../com/substrate/blockBase.vue";

    import chipDragFunc from "../com/chip/container/chipDragFunc.vue";
    // store
// DATA
    const props = defineProps({

    });
    const emits = defineEmits(['change']);

    const flag = reactive({
        info: false,
        // delete: false,
    });

    // const deleteDrag = reactive({
    //     text: "",
    //     pageX: 0,
    //     pagey: 0,
    // })
// FUNC

    // function longpress(touched, text) {
    //     // TODO 暂时这个事件没能被 前者过滤。
    //     console.debug(touched, touched.touches[0].pageX, text);
    //     deleteDrag.text = text;
    //     deleteDrag.pageX = touched.touches[0].pageX;
    //     deleteDrag.pageY = touched.touches[0].pageY;
        
    //     flag.delete = true;
    // }

</script>

<style scoped>

</style>        