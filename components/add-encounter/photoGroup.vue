<template>
    <scroll-view scroll-x="true">
        <view class="flex-horizontal gap-5 pd-15">
            <view v-if="props.mode == 'add'" class="add-container flex-center-both" :style="{
                '--size': props.size + 'px',
                '--radius': props.radius + 'px',
            }" @click="addImage">
                <up-icon name="plus" :color="color['main-deep']" size="30"></up-icon>
            </view>
            <template v-for="(item, index) in props.imgList" :key="index">
                <up-image lazy-load :src="item" :radius="props.radius" :height="props.size + 'px'" :width="props.size + 'px'"
                    @click="showImage(index)"
                />
            </template>
        </view>
    </scroll-view>
    
    <imagesPreview v-if="flag.preview" :mode="props.mode"
        :urls="props.imgList" :current-index="currentIndex"
        @close="flag.preview = false"
		@delete="(index) => { emits('delete', index); }"
		@setFront="(index) => { emits('setFront', index); }"
    />
</template>

<script setup>
    import { ref, reactive } from "vue";

    import color from "@/css/theme/index.module.scss";
    import api from "../../request/photo";

    // com
    import imagesPreview from "../vear-carousel/imagesPreview.vue";
    // store
// DATA
    const props = defineProps({
        mode: {
            type: String,
            default: "default" // add
        },
        imgList: {
            type: Array,
            default: () => [
                '/static/Qcat.png',
                '/static/user.jpg',
                '/static/Qcat.png',
            ]
        },
        size: {
            type: [Number, String],
            default: 160
        },
        radius: {
            type: [Number, String],
            default: 15
        },
		//  When type == 'add' 时有效；
		imageMaxNum: { // 上传数目上限
			type: Number,
			default: 5
		}
    });
    const emits = defineEmits(['addImage', 'delete', 'setFront']);

	const currentIndex = ref(0);
    const status = reactive({
		upload: 'nothing',
	})
    const flag = reactive({
		preview: false,
	})

// FUNC
   	// 添加图片
	async function addImage() {
		try {
			status.upload = 'loadding';
			const res = await chooseImageWrapper({
				count: props.imageMaxNum - props.imgList.length,
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'] // 从相册选择
			});
			status.upload = res;
		} catch (err) {
			console.error(err);
		}
	}

	// 封装 chooseImage 为返回 Promise 的函数
	function chooseImageWrapper(options) {  // UPDATE 或许这个函数应该交给外面来做。
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				...options,
				success: async function (res) {
					const files = res.tempFilePaths;
					const paths = await api.UploadEncounterPhotos(files); // INFO 重点业务接口
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

	function showImage(index) {
        currentIndex.value = index;
		flag.preview = true;
	}

</script>

<style scoped>

.add-container {
    width: var(--size);
    height: var(--size);
    border-radius: var(--radius);

    background-color: #ffffffd0;
}

</style>        