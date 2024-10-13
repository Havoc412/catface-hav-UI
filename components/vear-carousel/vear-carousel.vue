<!--Get from https://ext.dcloud.net.cn/plugin?id=2358, and updated by Hav-->
<template>
	<view class="relative">
		<swiper class="image-container" 
			previous-margin="45rpx" 
			next-margin="45rpx" 
			circular 
			autoplay 
			@change="swiperChange">
			<swiper-item 
				:class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" 
				v-for="(item, index) in props.imgList" :key="item[props.urlKey]">
				<!--TODO 更好的展示效果，对 up-image 兼容-->
				<!--TIP 这个 dontFirstAnimation 一个很好的机制。-->
				<image 
					@click="clickImg(item)" 
					:class="currentIndex == index ? 'item-img' : 'item-img-side'" 
					:src="item[urlKey]" 
					lazy-load 
					:style="dontFirstAnimation ? 'animation: none;' : ''"
					mode="aspectFill"
				/>
				<view class="absolute" 
					:class="currentIndex == index ? 'shadow-pre' : 'shadow-pre-side'"
					:style="dontFirstAnimation ? 'animation: none;' : ''" 
				/>
			</swiper-item>
		</swiper>
		<view class="dot-container flex-center-both">
			<template v-for="index in props.imgList.length" :key="index">
				<!--从 1 开始枚举-->
				<view :class="index == currentIndex + 1 ? 'dot-active' : 'dot'"/>
			</template>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from 'vue'

	// 定义props
	const props = defineProps({
		imgList: {
			type: Array,
			default: () => [{
				url: "/static/Qcat.png"
			}]
		},
		urlKey: {
			type: String,
			default: 'url'
		}
	})
	
	const emits = defineEmits(['selected']);

	// 定义响应式数据
	const currentIndex = ref(0);
	const dontFirstAnimation = ref(true);

	const consts = reactive({
		IMG_WIDTH: '630rpx',
		
	})

// FUNC
	// 方法定义
	const swiperChange = (e) => {
		dontFirstAnimation.value = false;
		currentIndex.value = e.detail.current;
	}

	const clickImg = (item) => {
		// 使用$emit向父组件传递事件
		emits('clickImg', item, currentIndex.value);
	}

	
</script>

<style scoped>
	.image-container {
		width: 750rpx;
		height: 1000rpx;
	}

	.item-img {
		width: 630rpx;
		height: 900rpx;
		border-radius: 50rpx;
		animation: to-big .3s;
	}
	
	image {
		box-shadow: 0px 4px 14px rgba(0, 0, 0, .7);
	}

	.swiper-item {
		width: 630rpx;
		height: 900rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.item-img-side {
		width: 630rpx;
		height: 800rpx;
		border-radius: 50rpx;
		animation: to-mini .3s;
	}

	.swiper-item-side {
		width: 630rpx;
		height: 800rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	/** 核心就是这两个动画 */
	@keyframes to-mini
	{
		from {
			height: 900rpx;
		}
		to {
			height: 800rpx;
		}
	}
	
	@keyframes to-big
	{
		from {
			height: 800rpx;
		}
		to {
			height: 900rpx;
		}
	}

	.dot-container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;

		gap: 15px;
	}

	.dot-container .dot {
		height: 10px;
		width: 10px;
		border-radius: 50%;
		background-color: #30444E;
	}

	.dot-container .dot-active {
		height: 10px;
		width: 10px;
		border-radius: 50%;
		background-color: #3DD598;
	}

    .shadow-pre {
		width: 630rpx;
		height: 900rpx;
		border-radius: 50rpx;

        /* 定义一个从顶部到底部逐渐变黑的线性渐变 */
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 120%);

		animation: to-big .3s;
    }

	.shadow-pre-side {
		width: 630rpx;
		height: 800rpx;
		border-radius: 50rpx;
		
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 120%);

		animation: to-mini .3s;
	}
	 
</style>
