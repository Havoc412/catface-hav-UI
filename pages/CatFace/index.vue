<template>
    <view class="flex-center-vertical contianer bg-img mt-10">
        <view class="flex-center-vertical">
            <view class="title">点击下图，上传猫猫图片</view>
            <view> 标准实例。(TODO 给一个样图和详细说明)</view>
            <!--info 文件上传--><!--todo 之后兼容 视频识别 accept="all" -->
            <view class="flex-center-horizontal">
                <up-upload :fileList="fileList" 
                    name="1" multiple :maxCount="1" 
                    width="500rpx" height="500rpx" :deletable=false
                    @afterRead="afterRead">
                    <image src="/static/Qcat.png" class="Qcat" />
                </up-upload>
            </view>

            <!-- <cat-item/> -->
            <view class="flex-vertical gap-10">
                <template v-for="(item, id) in catInforList" :index="cat-id">
                    <cat-item :id="item.id" :name="item.name" :breed="item.breed" :gender="item.gender" :conf="item.conf"/>
                </template>
            </view>

            <!-- form -->
            <cat-form/>
        </view>
    </view>
    <h-tarbar />
</template>

<script setup>
    import { ref, reactive } from "vue";

    // com
    import catItem from "../../components/catface/catItem.vue";
    import catForm from "../../components/catface/form.vue";
    // store
// DATA
    const fileList = ref([]);
    const catInforList = ref([]);

    // Flag
    const flag = reactive({
        formshow: false,

    })


// FUNC
    // 新增图片
    const afterRead = async (event) => {
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file);
        let fileListLen = fileList.value.length;
        lists.map((item) => {
            fileList.value.push({
                ...item,
                status: 'uploading',
                message: '推理中...',
            });
        });
        for (let i = 0; i < lists.length; i++) {
            const result = await uploadFilePromise(lists[i].url);
            let item = fileList.value[fileListLen];
            fileList.value.splice(fileListLen, 1, {
                ...item,
                status: 'success',
                message: '',
                url: result,
            });
            fileListLen++;
        }

        fileList.value = [];
    };

    const uploadFilePromise = (url, type=true) => {
        return new Promise((resolve, reject) => {
            let u = type ? 'cal_embedding/': 'add_cat/';
            let a = uni.uploadFile({
                url: 'http://127.0.0.1:8000/api/cnn/' + u,
                filePath: url,
                name: 'file',
                formData: {
                    user: 'test',
                },
                success: (res) => {
                    setTimeout(() => {
                        resolve(res.data.data);
                    }, 50);

                    let data = JSON.parse(res.data);
                    if (data.status === 200) {
                        catInforList.value = data.cat_infor_list;
                        console.log('成功获取数据', catInforList.value);
                    } else {
                        console.log('状态码不是200');
                    }
                },
                fail: (err) => {
                    console.error(err)
                }
            });
        });
    };

    // // test
    // const afterRead_for_add = async (event) => {
    //     // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    //     let lists = [].concat(event.file);
    //     let fileListLen = fileAdd.value.length;
    //     lists.map((item) => {
    //         fileAdd.value.push({
    //             ...item,
    //             status: 'uploading',
    //             message: '添加中...',
    //         });
    //     });
    //     for (let i = 0; i < lists.length; i++) {
    //         const result = await uploadFilePromise(lists[i].url, false);
    //         let item = fileAdd.value[fileListLen];
    //         fileAdd.value.splice(fileListLen, 1, {
    //             ...item,
    //             status: 'success',
    //             message: '',
    //             url: result,
    //         });
    //         fileListLen++;
    //     }

    //     fileList.value = [];
    // };

</script>

<style scoped>
    .contianer {
        /* height: var(--height); */
        min-height: 100vh;
    }
    .title {
        font-family: Alimama ShuHeiTi;
        font-size: 50rpx;
    }

    .Qcat {
        height: 500rpx;
        width: 500rpx;
    }

</style>        