<!-- Entrance Pages -->
<template>
	<view class="flex-center-vertical bg-img contianer" :style="{
	'--height': phoneInforStore.phoneHeight + 'px'
	}">
		<image class="logo" src="/static/icon.png"></image>
		<view class="flex-center-vertical gap-20" @click="test">
			<view class="main-infor">此小程序用于测试 CatFace 和 RAG 模块。</view>
			<view class="infor">
				<view class="title">CatFace</view>
				<view>通过 Detect && Embedding 的方式来识别猫脸，兼以 POI 过滤。</view>
			</view>
			<view class="infor">
				<view class="title">RAG</view>
				<view>常规 LLM + RAG 应用，辅助 CatFace，以及一般科普救助等问题的回答。</view>
			</view>
		</view>
	</view>
	<h-tarbar/>
</template>

<script setup>
	// com
	// store
	// todo 可以考虑不通过 store 导入， 90vh 看起来还可以。
	import usePhoneInforStore from "@/store/phoneInfor";
	const phoneInforStore = usePhoneInforStore();

	// test
	function test () {
		uni.getLocation({
            type: 'gcj02',
            // isHighAccuracy: true,
            success: async function (res) {
                console.log('当前位置的经度：' + res.longitude);
                console.log('当前位置的纬度：' + res.latitude);
			}
		})
	}

</script>

<style scoped>
 	.contianer {
		/* height: var(--height); */
		height: 100vh;
		overflow-y: hidden;
	}

	.logo {
		height: 400rpx;
		width: 400rpx;
		margin-top: 50rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 20rpx;
	}

	.main-infor {
		font-family: Alimama ShuHeiTi;
		font-size: 35rpx;
		margin-bottom: 50rpx;
	}

	.infor {
		margin: 0 50rpx;

		font-family: Alimama ShuHeiTi;
		font-size: 30rpx;
	}

	.infor .title {
		font-size: 40rpx;
	}

</style>
