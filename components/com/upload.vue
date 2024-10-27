<template>
  <view class="container-upload relative">
    <up-upload
        accept="media"
        :maxCount="1"
        :maxDuration="30"
        @afterRead="afterRead"
      >
      <!--只是借用一个函数框架，实际的内容替换掉。-->
        <view class="flex-center-both text">
              选取照片或视频（<span style="color: #ff4c55">30s内</span>）
        </view>
        <view class="relative">
            <up-image show-loading :src="frame" height="550rpx" width="550rpx" radius="5rpx">
              <template #error>
                <view>加载失败</view> <!--todo 换成【鬼混】那张图片-->
              </template>
            </up-image>
            <!--一个简单的加载中遮罩-->
            <view v-show="flag.state != 'finished' && flag.state" class="flex-center-both overlay z-5" @click.stop>
              <view class="flex-center-vertical">
                <h-eye color="#fff" :size="100"/> <!--update 可以自己画一个更好看的-->
                <view>{{ StateMsg[flag.state] }}</view>
              </view>
            </view>
            <!--mp4 基本信息-->
            <view v-if="flag.type == 'video'" class="flex-center-both gap-5 video-container" :style="{
              '--font-color': check_time_color
            }">
              <fr-icon-time theme="outline" :size="35" :fill="['#000000']" />
              {{ flag.video.duration }} 秒
            </view>
            <view v-show="flag.state == 'finished'" class="func-reload">
              <h-btn shape="circle">
                <fr-icon-refresh theme="outline" :size="40" :fill="['#000000']" />
              </h-btn>
            </view>
            <view v-if="show_video_btn" class="func-video">
              <btn-msg msg="使用视频登记效果更好。">
                <h-btn shape="circle" @click="flag.change_video = true">
                  <fr-icon-video-two theme="outline" :size="40" :fill="['#000000']" />
                </h-btn>
              </btn-msg>
            </view>
        </view>
      </up-upload>
  </view>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue';
  // com
  import HEye from "./animation/eye.vue";
  import btnMsg from "./btnMsg.vue";
  // struct
  import { Cat } from "../../models/catInfor";
  // consts
  import { CAT_FACE_URL } from "../../common/setting";
  const BASE_URL = CAT_FACE_URL;
  import { Ecnn } from "../../ErrCode/errmsg";

// DATA
  const props = defineProps({
    openForm: Boolean
  })
  const emits = defineEmits(['email', 'success', 'openForm', 'refresh', 'loadFileUrl']);

  const DEFAULT_IMG = "/static/Qcat.png";

  const fileList = ref([]);
  const frame = ref(DEFAULT_IMG);
  // let video_frames = []

  // flag // update 因为暂时只有一个目标，所以一个全局就足够了，之后需要更改。
  const flag = reactive({
    state: '',
    type: "", // video || image
    video: {
      duration: 0,
    },
    change_video: false, // info change_video 模式，只修改 file 的文件。
  })

  // CONST
  const StateMsg = {
    'detecting': "推理中...",
  }

// FUNC
  // MARK MAIN CODE
  const afterRead = async (event) => {
    if(!flag.change_video)
      emits('refresh');

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let lists = [].concat(event.file); // tip 用于处理输入文件。如果 event.file 是单个文件对象，将其转换为数组；如果是数组，则直接使用。
    let fileListLen = fileList.value.length;
    console.info(lists, fileListLen);

    let error_flag = false;
    lists.map((item) => {
      emits('loadFileUrl', item.url); // 记录 URL 到 主页，控制上传。

      fileList.value.push({
        ...item,
        status: 'detecting',
        message: "推理中..."
      });

      // info Stage - 1 受限于单文件处理方式
      if(item.type == "image" || item.type == "image/jpeg" || item.type == "image/png") {
        flag.type = "image";
        frame.value = item.url;
      } else if(item.type == "video" || item.type == "video/mp4") {
        console.info(item);
        flag.type = "video";
        frame.value = item.thumb;
        flag.video.duration = Math.ceil(item.duration);
        if(flag.video.duration > 30) {
          email(false, "现阶段只允许 30s 以内的视频文件。")
          error_flag = true;
          return;
        }
      } else {
        email(false, "现阶段仅支持部分 image 和 mp4 格式的文件。");
        error_flag = true;
        return;
      }
    });
    if(error_flag || flag.change_video) {
      flag.change_video = false;
      return;
    }
      
    // INFO Stage - 2
    console.info(fileList.value);
    flag.state = 'detecting';
    for (let i = 0; i < lists.length; i++) {
      const result = await uploadFilePromise(lists[i].url);
      let item = fileList.value[fileListLen];
      fileList.value.splice(fileListLen, 1, { // 插入数组
        ...item,
        status: 'success',
        message: '',
        // url: result,
      });
      fileListLen++;
    }

    // end
    flag.state = 'finished';
    fileList.value = [];
  };

  const uploadFilePromise = (url) => {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
          url: BASE_URL + 'api/cnn/detect_cat/',
          filePath: url,  // 用 url 来传参
          name: 'file',
          formData: {
              user: 'test',
          },
          success: (res) => {
              let data = JSON.parse(res.data);
              if (data.status === 200) {
                  // loaf data
                  const catInforList = [];
                  data.cat_infor_list.map( function(ele) {
                      const cat = new Cat(ele);
                      catInforList.push(cat);
                  });
                  console.log('成功获取数据', data);
                  emits('success', catInforList, data.breed, data.notices);
              } else {
                  console.log('状态码不是200');
                  email(false, data.status);
                  // 没有匹配到 DB 的时候
                  if(data.status == Ecnn.NoCatMatch)
                    emits('openForm', data.breed);
              }

              // end over
              resolve("");
          },
          fail: (err) => {
              console.error(err)
          }
      });
    });
  }

  // base
  const email = (type, msg) => {
    emits('email', type, msg);
  }

  // style 
  const check_time_color = computed(() => {
    return flag.video.duration <= 30 ? "#000" : "#ff4c55";
  })

  const show_video_btn = computed(() => {
    return props.openForm; //  && flag.type != 'video'; 这样就允许切换 video 了。
  })

</script>

<style scoped>
.container-upload {
  background-color: #fff;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5rpx;

  font-family: Alimama ShuHeiTi;
  color: #fff;
  font-size: 50rpx;
}

.video-container {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  padding: 5rpx 10rpx;


  font-family: Alimama ShuHeiTi;
  background-color: #fff;
  border-radius: 50rpx;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, .3);

  color: var(--font-color);
}

.func-reload {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
}

.func-video {
  position: absolute;
  bottom: 10rpx;
  right: 10rpx;
}

.text {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;

  font-family: Alimama ShuHeiTi;
  font-size: 15px;
}

</style>