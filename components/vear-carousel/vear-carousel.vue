<!--Get from https://ext.dcloud.net.cn/plugin?id=2358, and updated by Hav-->
<template>
	<view class="relative">
		<swiper class="image-container" 
			previous-margin="45rpx" 
			next-margin="45rpx" 
			circular 
			:autoplay="!ModeAdd"
			@change="swiperChange">
			<swiper-item 
				:class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" 
				v-for="(item, index) in props.imgList" :key="index"
				>
				<!--TODO 更好的展示效果，对 up-image 兼容-->
				<!--TIP 这个 dontFirstAnimation 一个很好的机制。-->
				<image 
					:class="currentIndex == index ? 'item-img' : 'item-img-side'" 
					:src="item" 
					lazy-load 
					:style="dontFirstAnimation ? 'animation: none;' : ''"
					mode="aspectFill"
				/>
				<view  
					@click="showImage" 
					class="absolute" 
					:class="currentIndex == index ? 'shadow-pre' : 'shadow-pre-side'"
					:style="dontFirstAnimation ? 'animation: none;' : ''" 
				/>
			</swiper-item>
			<!--INFO Add Mode 下增加一个占位符-->
			<swiper-item
				v-if="ModeAdd && photosList.length < props.imageMaxNum"
				:class="currentIndex == photosList.length ? 'swiper-item' : 'swiper-item-side'"
			>
				<!--TIP 这种方式设置 style-->
				<image 
					@click="addImage" 
					:class="currentIndex == photosList.length ? 'item-img' : 'item-img-side'" 
					:style="{
						...(!dontFirstAnimation ? { animation: 'none' } : {}),
						padding: '200rpx',
					}"
					:src="status.upload === 'nothing' ? '/static/icon/com/plus_thin.svg': ''" 
					lazy-load 
					mode="aspectFit">
				</image>
				<!--正好自带一个遮罩了-->
				<statusWin 
					:status="status.upload"
					loaddingText="上传中"
				/>
			</swiper-item>
		</swiper>
		<!--底部的状态点-->
		<view class="dot-container flex-center-both">
			<template v-for="index in photosList.length" :key="index">
				<!--从 1 开始枚举-->
				<view :class="index == currentIndex + 1 ? 'dot-active' : 'dot'"/>
			</template>
		</view>
		<!--Func-->
		<view class="absolute z-0" :style="{
			right: '20rpx',
			bottom: '5rpx'
		}">
			<h-btn icon="com-more_deep">
				<!--TODO 切换图片展示方式。-->
			</h-btn>
		</view>
	</view>
	
	<!--UPDATE 省事，但是牺牲一定的性能。-->
	<preview v-if="flag.preview" :mode="props.mode"
		:urls="props.imgList" :current-index="currentIndex" 
		@close="flag.preview = false"
		@delete="(index) => { emits('delete', index); }"
		@setFront="(index) => { emits('setFront', index); }"
	/>
</template>

<script setup>
	import { ref, reactive, computed, onMounted, watch } from 'vue'

	import api from '../../request/photo';
	
	// com
	import statusWin from '../status-win/statusWin.vue';
	import preview from './preview.vue';

// DATA
	// 定义props
	const props = defineProps({
		imgList: {
			type: Array,
			default: () => ["/static/Qcat.png"]
		},
		mode: {
			type: String,
			default: 'default' // 'add'
		},
		//  When type == 'add' 时有效；
		imageMaxNum: { // 上传数目上限
			type: Number,
			default: 5
		}
	})
	
	const emits = defineEmits(['selected', 'addImage', 'delete', 'setFront']);

	// 定义响应式数据
	const currentIndex = ref(0);
	const dontFirstAnimation = ref(true);

	const consts = reactive({
		IMG_WIDTH: '630rpx',
	})
	const photosList = ref([]);

	const status = reactive({
		upload: 'nothing',
	})

	const flag = reactive({
		preview: false,
	})

// FUNC
	onMounted(() => {
		photosList.value = props.imgList;
	})
	watch(() => props.imgList, () => {
		photosList.value = props.imgList;
	})
	
	const ModeAdd = computed(() => {
		return props.mode == 'add';
	})
	// 方法定义
	const swiperChange = (e) => {
		dontFirstAnimation.value = false;
		currentIndex.value = e.detail.current;
	}

	// 添加图片
	async function addImage() {
		try {
			status.upload = 'loadding'
			const res = await chooseImageWrapper({
				count: props.imageMaxNum - props.imgList.length, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'] // 从相册选择
			});
			status.upload = res;
		} catch (err) {
			console.error(err);
		}
	}

	// 封装 chooseImage 为返回 Promise 的函数
	function chooseImageWrapper(options) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				...options,
				success: async function (res) {
					const files = res.tempFiles;
					const paths = await api.UploadAnimalPhotos(files);
					emits('addImage', paths);
					resolve('nothing'); // resolve
				},
				fail: function (err) {
					console.error(err);
					uni.showToast({
					title: '图片选择失败',
					icon: 'none'
					});
					status.value.upload = 'err';
					reject('err'); // 失败时 reject
				},
				complete: function (res) {
					// BUG 也无法收到 PC 端的 ‘取消’
					console.debug(res);
				}
			});
		});
	}

	function showImage() {
		flag.preview = true;
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
