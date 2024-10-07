<template>
    <view class="container-top flex-center-vertical gap-10">
        <!--TAG 1. 主框-->
        <Block
            bgc="#BFE2FF"
            height="25"
            width="94"
            padding="10"
            cat-size="300"
            position-type="right">
            <view class="flex-vertical">
                <view class="flex-top-horizontal">
                    <view class="flex-top-horizontal gap-10">
                        <view class="avatar">
                            <up-image :src="data.url" width="70" height="70" radius="35"/>
                        </view>
                        <view class="flex-vertical container-text gap-5">
                            <view class="name">{{ data.name }}</view>
                            <view class="text">{{ data.text }}</view>
                        </view>
                    </view>
                    <view class="shrink"/>
                    <view class="flex-horizontal gap-10">
                        <h-icon name="user-sun"/>
                        <h-icon name="user-list_block"/>
                    </view>
                </view>
                <!--装饰-->
                <view style="height: 100px; width: 150px; border-radius: 20px;
                    background-color: #AEC4EA;
                    transform: translate(-20px, 20px); /* 向 x 轴偏移 -20px，y 轴偏移 20px */">
                </view>
            </view>
        </Block>
        <!--TODO 目前只是框架，还没什么实际作用-->
        <view class="flex-equal-horizontal gap-10 block">
            <view class="flex-vertical gap-10 block">
                <Block height="25" bgc="#3ED598"
                    url="/static/cats/head/4.png"
                    text="Func One"/>
                <Block height="30" bgc="#FF565E"
                    position-type="mid" bottom="-50"
                    url="/static/cats/head/1.png"
                    text="Func Three"/>
            </view>
            <view class="flex-vertical gap-10 block">
                <Block height="30" bgc="#FFC542"
                    position-type="right"
                    url="/static/cats/head/2.png"
                    text="Func Two"/>
                <Block height="25" bgc="#3ED598"
                    position-type="mid" bottom="-50"
                    url="/static/cats/head/3.png"
                    text="Func Four"/>
            </view>
        </view>
    </view>
    <h-tabbar/>
</template>

<script setup>
    import { ref, reactive } from "vue";
    // com
    import Block from "../../components/user/block.vue";
    // store

    const data = reactive({
        url: '/static/Qcat.png',
        name: "小护",
        text: "balabala"
    })
// DATA

// FUNC

</script>

<style scoped>

.container-top {
    margin: 0 3vw;
}

.avatar {
    background-color: #fff;
    border-radius: 50%;
}

.container-text {
    font-family: Alimama ShuHeiTi;
}

.name {
    font-size: 25px;
}

.text {
    font-size: 14px;
}

</style>        