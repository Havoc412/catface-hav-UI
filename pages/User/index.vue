<template>
    <view class="container-top flex-center-vertical gap-10">
        <!--TAG 1. 主框-->
        <view class="block">
            <blockWin
                bgc="#BFE2FF"
                height="30"
                padding="10"
                cat-size="300"
                position-type="right">
                <login/>
            </blockWin>
        </view>
        <!--TODO 目前只是框架，还没什么实际作用-->
        <view class="flex-equal-horizontal gap-10 block">
            <view class="flex-vertical gap-10 block">
                <blockWin height="25" bgc="#3ED598"
                    url="/static/cats-head/3.png"
                    text="Func One"/>
                <blockWin height="30" bgc="#FF565E"
                    position-type="mid" bottom="-50"
                    url="/static/cats-head/1.png"
                    text="Func Three"/>
            </view>
            <view class="flex-vertical gap-10 block">
                <blockWin height="30" bgc="#FFC542"
                    position-type="right"
                    url="/static/cats-head/4.png"
                    text="Func Two"/>
                <blockWin height="25" bgc="#3ED598"
                    position-type="mid" bottom="-50"
                    url="/static/cats-head/3.png"
                    text="Func Four"/>
            </view>
        </view>
    </view>
    <h-tabbar/>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import blockWin from "../../components/user/block.vue";

    import login from "./login.vue";
    // store
    
// DATA

// FUNC

</script>

<style scoped>

.container-top {
    margin: 0 3vw;
}


.text {
    font-size: 14px;
}

</style>        