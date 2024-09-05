<template>
    <snackbar class="top" v-model="email.snackbar_switch" 
      :message="email.snackbar_message" :color="email.kind_flag"
      :timeout="email.time_flag ? 15000 : 2000 ">
    </snackbar>
    <view class="flex-center-vertical contianer bg-img mt-10">
        <view class="flex-center-vertical">
            <view class="title">点击下图，上传猫猫图片</view>
            <view>标准实例。(TODO 给一个样图和详细说明)</view>
            <!--info 文件上传--><!--todo 之后兼容 视频识别 accept="all" -->
            <view class="flex-center-horizontal">
                <up-upload :fileList="fileList" 
                    name="1" multiple :maxCount="1" 
                    width="500rpx" height="500rpx" :deletable=false
                    @afterRead="afterRead">
                    <image src="/static/Qcat.png" class="Qcat" />
                </up-upload>
            </view>
            <view class="attention">模型开发优化中，识别结果仅供参考。</view>

            <!-- <cat-item/> -->
            <view class="flex-vertical gap-10">
                <template v-for="(item, id) in catInforList" :index="cat-id">
                    <cat-item :infor="item" detect/>
                </template>
            </view>

            <!-- form -->
            <cat-form v-show="flag.formshow"/>
        </view>
    </view>
    <h-tarbar />
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";

    import { Cat } from "../../models/catInfor";
    // com
    import catItem from "../../components/catface/catItem.vue";
    import catForm from "../../components/catface/form.vue";

    import snackbar from "../../components/com/snackbar.vue";
    // store
    import emialStore from "../../store/snackbar";
    const email = emialStore();

// DATA
    const fileList = ref([]);
    const catInforList = ref([]);

    // Flag
    const flag = reactive({
        formshow: false,
    })

// FUNC
    // onMounted(() => { // test email
    //     setTimeout(() => {
    //         email.sendEmail(2, 201);
    //     }, 1000);
    // })

    // 新增图片
    const afterRead = async (event) => {
        // clear
        catInforList.value = [];

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
        let result;
        for (let i = 0; i < lists.length; i++) {
            result = await uploadFilePromise(lists[i].url);
            let item = fileList.value[fileListLen];
            fileList.value.splice(fileListLen, 1, {
                ...item,
                status: 'success',
                message: '',
                url: result,
            });
            fileListLen++;
        }
        
        if(!flag.formshow)
            fileList.value = [];
    };

    const uploadFilePromise = (url, type=true) => {
        return new Promise((resolve, reject) => {
            let u = type ? 'detect_cat/': 'add_cat/';
            let a = uni.uploadFile({
                url: 'http://127.0.0.1:8000/api/cnn/' + u,
                filePath: url,  // 用 url 来传参
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
                        // check data len
                        if(data.cat_infor_list.length == 0) {
                            flag.formshow = true;
                        } else {
                            // loaf data
                            data.cat_infor_list.map( function(ele) {
                                const cat = new Cat(ele);
                                catInforList.value.push(cat);
                            });
                            console.log('成功获取数据', catInforList.value);
                        }
                    } else {
                        console.log('状态码不是200');
                        // todo
                        email.sendEmail(false, data.status);
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

    .attention {
        font-family: Alimama ShuHeiTi;
        color: #ff4c55;

        margin-bottom: 50rpx;
    }

    .Qcat {
        height: 500rpx;
        width: 500rpx;
    }

</style>        