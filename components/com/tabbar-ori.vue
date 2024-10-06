<template>
    <view class="flex-equal-horizontal items-center container z-5">
        <view class="flex-center-both sub-container gap-10 right-line" @click="goto(ID.catface)">
            <fr-icon-camera :theme="iconTheme(ID.catface)" :size="iconStyle.size" :fill="[iconStyle.color]"/>
            <view>
                {{ getText(ID.catface, 'catface') }}
            </view>
            <h-menu :show="flag.catface" 
                :texts="TEXT.catface_funcs"
                :width="memuStyle.width"
                :left="calMenuLeft(ID.catface)"
                @close="close"
                @choose="(id) => funcGoto(ID.catface, id)"
            />
        </view>
        <view class="flex-center-both sub-container gap-10" @click="goto(ID.rag)">
            <fr-icon-robot-one :theme="iconTheme(ID.rag)" :size="iconStyle.size" :fill="[iconStyle.color]"/>
            <view>
                RAG(概念演示)
            </view>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive, computed, onUnmounted } from "vue";
    // com
    import HMenu from "./sub-tarbar/menu.vue";
    // store
    import stateStore from "../../store/tabbar";
    const state = stateStore();
	import usePhoneInforStore from "../../store/phoneInfor";
	const phoneInforStore = usePhoneInforStore();

// DATA
    const pages = ["index", "CatFace", "Rag"];
    const pages_sub = reactive({
        catface: ["database"],
    })

    // style
    const iconStyle = reactive({
        size: 30, // px
        color: "#000000"
    })
    const memuStyle = reactive({
        width: 250, // rpx
        num: 2
    })

    // tag CONST
    const TEXT = reactive({
        catface: {
            unsel: "CatFace(优化中)",
            sel: "更多"
        },
        rag: {
            unsel: "RAG(开发中)",
            sel: "更多"
        },
        catface_funcs: ["查看数据库"]  // todo "路遇寻猫"
    })
    const ID = reactive({
        catface: 1,
        rag: 2,
        catface_sub: {
            database: 0
        }
    })
    
    // flag
    const flag = reactive({
        catface: false,
        rag: false
    })

// FUNC
    function goto(index) {
        if(index == state.curPageIndex) { // 不跳转，打开菜单。
            if(index == ID.catface)
                flag.catface = true;
            else
                flag.rag = true;
        } else {
            const pagePath = "/pages/" + pages[index] + "/index";
            let flag_remember;
            if(state.curPageIndex != 0) {
                uni.redirectTo({ // 关闭当前页面 跳转
                    url: pagePath,
                    // animationType: "fade-in"
                })
                flag_remember = false;
            } else {
                uni.navigateTo({ // 保留当前页面
                    url: pagePath,
                    // animationType: "fade-in"
                })
                flag_remember = true;
            }
            state.setPageID(index, flag_remember);
        }
    }

    const close = () => {
        flag.catface = false;
        flag.rag = false;
    }

    const funcGoto = (type, index) => {
        console.info(type, index);
        if(type == ID.catface) {
            const pagePath = "/pages/CatFace/" + pages_sub.catface[index];
            console.info(pagePath);
            uni.navigateTo({ url: pagePath });
            // info 不需要记录路由。
            // state.setPageID(index, true);
        }
    }

    // tag style && content
    const iconTheme = (id) => {
        return state.curPageIndex == id ? "filled": "outline";
    }
    const getText = (id, name) => {
        return state.curPageIndex == id ? TEXT[name].sel: TEXT[name].unsel;
    }
    const calMenuLeft = (id) => { // px
        // console.info(phoneInforStore.cal_menu_Location(id, memuStyle.num, memuStyle.width));
        return phoneInforStore.cal_menu_Location(id, memuStyle.num, memuStyle.width);
    }


    // back
    onUnmounted(() => {
        // TIP 通过 unmounted 来监听回退等操作。
        state.backRoute();
        console.info("over.");
    })

</script>

<style scoped>
.container {
    position: fixed;
    bottom: 0;
    width: 100%;

    padding: 10rpx;
    background-color: #e8f3f1;
    box-sizing: border-box;

    font-family: Alimama ShuHeiTi;

    /* TEXT */
    color: #000000;
    line-height: 9px;
    font-weight: unset;
}

.container .sub-container {
    height: 50rpx;
}

.right-line {
    border-right: #CCC 1px solid;
}

</style>        