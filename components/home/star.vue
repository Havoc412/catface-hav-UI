<!--首页的【星球】关键词交互插件-->
<template>
  <view class="star-container">
    <view id="container" class="tagBall" 
      @touchstart="handleTouchStart" 
      @touchmove="handleTouchMove" 
      @touchend="handleTouchEnd"> <!--BUG @touchmove.prevent wx 会导致 touchmove 无效-->
      <view v-for="(item, index) in nameList" :key="index" 
        class="tag flex-center-vertical" 
        :style="tagsStyles[index]"
        :class="{'tag-animation': animationFlag}" > <!--INFO @click="deep(index+1)"-->
        <!--TODO 增加 click -> detail -->
        <starItem :url="item['HeadImg']" :name="item['name']"/>
      </view>
    </view>
    <view class="star-btn flex-horizontal gap-5">
      <!--TODO STAR 的控制键-->
      <!-- <t-btn-icon @click="reload" icon="/static/icon/reload.svg" shadow></t-btn-icon> -->
      <!-- <t-btn-icon @click="back" icon="/static/icon/back.svg" shadow></t-btn-icon> -->
    </view>
  </view>
</template>

<script setup>
  import { ref, onMounted, nextTick, getCurrentInstance } from 'vue';
  // COM
  import starItem from "./sub-star/starItem.vue";
  // JS
  import api from '../../request/animal';

// DATA
  const props = defineProps({
    resetFlag: {
      type: Boolean,
      default: false
    },
    backFlag: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits(['touchstart']);
  // const
  const RADIUS = 500;  // UPDATE 换为 rpx 单位了
  const RADIUS_BIGGER = 210;  // 暂时没有用到。
  const FALL_LENGTH = 700;  // scale 有关

  const MARGGIN_TOP = 0;

  const ANGLE_AUTO = 300;
  const ANGLE_MAGNITUDE = Math.PI / ANGLE_AUTO;

  const TIME_TOUCHED = 3000;
  const TIME_ANIMATION = 1500; // test
  const RATIO = .001;
  const TIMER = 250;
  
  // var
  let angleX = Math.PI / ANGLE_AUTO;
  let angleY = Math.PI / ANGLE_AUTO;
  
  let touchStartX, touchStartY;
  // list 
  const nameList = ref([ // INFO 样例是 25 个
    { HeadImg: "0.jpg", name: "斜刘海" },
    { HeadImg: "1.jpg", name: "小北" },
    { HeadImg: "3.jpg", name: "发发" },
    { HeadImg: "4.jpg", name: "猪皮" },
    { HeadImg: "5.jpg", name: "软软" },
    { HeadImg: "8.jpg", name: "囧橘" },
    { HeadImg: "0.jpg", name: "斜刘海" },
    { HeadImg: "1.jpg", name: "小北" },
    { HeadImg: "3.jpg", name: "发发" },
    { HeadImg: "4.jpg", name: "猪皮" },
    { HeadImg: "5.jpg", name: "软软" },
    { HeadImg: "8.jpg", name: "囧橘" },
    { HeadImg: "0.jpg", name: "斜刘海" },
    { HeadImg: "1.jpg", name: "小北" },
    { HeadImg: "3.jpg", name: "发发" },
    { HeadImg: "4.jpg", name: "猪皮" },
    { HeadImg: "5.jpg", name: "软软" },
    { HeadImg: "8.jpg", name: "囧橘" },
    { HeadImg: "0.jpg", name: "斜刘海" },
    { HeadImg: "1.jpg", name: "小北" },
    { HeadImg: "3.jpg", name: "发发" },
    { HeadImg: "4.jpg", name: "猪皮" },
    { HeadImg: "5.jpg", name: "软软" },
    { HeadImg: "8.jpg", name: "囧橘" },
    { HeadImg: "0.jpg", name: "斜刘海" },
    { HeadImg: "1.jpg", name: "小北" },
    { HeadImg: "3.jpg", name: "发发" },
    { HeadImg: "4.jpg", name: "猪皮" },
    { HeadImg: "5.jpg", name: "软软" },
    { HeadImg: "8.jpg", name: "囧橘" },
  ]);

  let tags = [];
  const tagsStyles = ref(nameList.value.map(() => ({})));
  // flag
  let touchedFlag = false;  // 当触发按动后，一段时间内不会自动转（eg.3s?）。
  const animationFlag = ref(true);
  // store
  const pathHistory = ref([1]); // 暂时无用

// FUNC
  onMounted(() => {
    // 1. api data
    // nameList.value = await getData(25);
    // console.debug("getData Finished.")
    
    // 2. animate
    // nextTick(() => {  // BUG 当增加延时之后， tagRects.forEach 函数不存在，也就是 没有 tagRect
    //   init();
    //   console.info("finish init.");
    //   animate();
    // })
    init();
    console.debug("Finish init.");
    animate();
  });

  onMounted(async() => {  // TIP 干脆直接分开，JS 动画先初始化，然后把数据换掉。
    nameList.value = await getData(30);
    console.debug("getData Finished.", nameList.value);
    // INFO 如果访问失败，不会变动 nameList；效果，by 24.10.13
  })

  async function getData(num, skip = 0) {
    var data = await api.getAnimalStar(num, skip);

    // UPDATE 检查数据长度是否小于所需的数量
    while (data.length < num) {
      const needed = num - data.length;
      
      // 获取当前列表的副本以避免直接修改原数组
      const currentListCopy = [...data];
      
      // 如果全部复制后仍然不够，则只复制需要的数量
      let toAdd = currentListCopy;
      if (needed < currentListCopy.length) {
        toAdd = currentListCopy.slice(0, needed);
      }
      
      data = [...data, ...toAdd];
    }

    return data
  }

  const init = (radius = RADIUS, transparent = false) => {
      console.info("init", radius);

      // TIP 使用uni-app的API获取元素尺寸
      const instance = getCurrentInstance(); // 获取组件实例 // INFO 适配 wx
      const query = uni.createSelectorQuery().in(instance);
      query.selectAll('.tag').fields({ size: true, rect: true }, 
        (tagsRects) => { 
          tags = [];  // 重置！
          tagsRects.forEach((tagRect, i) => {
            // 计算 3D 模型的位置
            const k = (2 * (i + 1) - 1) / tagsRects.length - 1;
            const a = Math.acos(k);
            const b = a * Math.sqrt(tagsRects.length * Math.PI);
            const x = radius * Math.sin(a) * Math.cos(b);
            const y = radius * Math.sin(a) * Math.sin(b) + MARGGIN_TOP;
            const z = radius * Math.cos(a);
            tags.push({ element: tagRect, x, y, z });
          });
          if(transparent)
            tags.forEach((tag, index) => moveTag(tag, index, null));
          else
            tags.forEach((tag, index) => moveTag(tag, index, radius));
      }).exec();
  };

  // 移动 Tag
  const moveTag = (tag, index, radius) => {
    const scale = FALL_LENGTH / (FALL_LENGTH - tag.z);
    // mark alpha 强相关 radius，radius 无效时代表 transparent.
    let alpha = 0;
    if(radius)
      alpha = (tag.z + radius) / (2 * radius) + 0.1;
    const offsetX = tag.x - 10; // mark 这里手动调整了一下。
    const offsetY = tag.y;

    // console.info(index, scale, alpha, offsetX, offsetY);
    tagsStyles.value[index] = {
      transform: `translate3d(${offsetX}rpx, ${offsetY}rpx, 0) scale(${scale})`,
      opacity: alpha,
      zIndex: parseInt(scale * 100).toString(),
    };
  };

  const animate = (radius = RADIUS) => {
    console.info("animate run.");
    setInterval(() => {
      if(!touchedFlag) {
        rotateX();
        rotateY();
        tags.forEach((tag, index) => moveTag(tag, index, radius));
      }
    }, TIMER);
  };

  const animateAgain = () => {
    touchedFlag = false;
    animate();
  }

  const rotateX = () => {
    const cos = Math.cos(angleX);
    const sin = Math.sin(angleX);
    tags.forEach(tag => {
      const x1 = tag.x * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.x * sin;
      tag.x = x1;
      tag.z = z1;
    });
  };

  const rotateY = () => {
    const cos = Math.cos(angleY);
    const sin = Math.sin(angleY);
    tags.forEach(tag => {
      const y1 = tag.y * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.y * sin;
      tag.y = y1;
      tag.z = z1;
    });
  };

  // 扩张 && 收缩
  const expand = async() => {
    //  基于原有的坐标实现。
    const scale = RADIUS_BIGGER / RADIUS;
    tags.forEach((tag, index) => {
      tag.x *= scale;
      tag.y *= scale;
      tag.z *= scale;
      moveTag(tag, index);  // update 如果点数过多，那么扩张很可能不太同步。
    });
  }

  const shrink = () => {
    
  }

  const clear = () => {
    tagsStyles.value = nameList.value.map(() => ({}));
  }

  // touch
  const handleTouchStart = (event) => {
    touchedFlag = true; // 打断自动转动。

    touchStartX = event.changedTouches[0].pageX;
    touchStartY = event.changedTouches[0].pageY;
    event.stopPropagation();
    console.info("touch-start!", touchStartX, touchStartY);

    emits('touchstart');
  }

  const handleTouchMove = (event) => {
    // BUG wx 无法触发这个函数。
    touchedFlag = true; // 继续打断

    const touchMoveX = event.changedTouches[0].pageX;
    const touchMoveY = event.changedTouches[0].pageY;

    const deltaX = touchStartX - touchMoveX;
    const deltaY = touchStartY - touchMoveY;

    
    // 映射
    angleX = deltaX * RATIO;
    angleY = deltaY * RATIO;

    // console.info("touch-move...", deltaX, deltaY);
    rotateX();
    rotateY();
    tags.forEach((tag, index) => moveTag(tag, index, RADIUS));

    // ReLoad
    touchStartX = touchMoveX;
    touchStartY = touchMoveY;
    event.stopPropagation();
  };

  const handleTouchEnd = (event) => {
    // mark 方案一
    // let dis = Math.pow(angleX, 2) + Math.pow(angleY, 2);
    // let factor = ANGLE_MAGNITUDE / dis;
    // angleX *= factor;
    // angleY *= factor;

    // 方案二
    // angleX = angleY = Math.PI / ANGLE_AUTO;

    // 方案三
      // INFO 目前效果最佳？
    angleX = angleX > 0 ? Math.min(angleX, ANGLE_MAGNITUDE) : Math.max(angleX, -ANGLE_MAGNITUDE);
    angleY = angleY > 0 ? Math.min(angleY, ANGLE_MAGNITUDE) : Math.max(angleY, -ANGLE_MAGNITUDE);
    
    setTimeout(() => {  // 再次触发动画。
      touchedFlag = false;
      animate();  
    }, TIME_TOUCHED);
    console.info("touch-end!", event);
  };

  // js
  const adjust = (x) => {
    let factor = ANGLE_MAGNITUDE / x;
    return (x * factor).toFixed(3);
  }
  // mark 模拟sleep，但是并不会闭塞整个程序，而是实现一定的延迟。
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // click
  const deep = async(index) => {
    touchedFlag = true;

    // 1. expend
    // init(RADIUS_BIGGER, false);
    await expand();
    await sleep(TIME_ANIMATION);  // update
    // 2. data
    // update 实际上，获取新数据，更应该放在sleep的期间。
    pathHistory.value.push(index);  // 路径保存
    let newNameList = [];
    for(let i=1; i<21; i++)
      newNameList.push({wordName: `Star${index}-${i}`, worfValue: 600});    
    // 3. new
    // setTimeout(() => {
    //   tagsStyles.value = nameList.value.map(() => ({}));
    //   setTimeout(() => {
    //     nameList.value = newNameList;
    //     init(RADIUS);
    //     setTimeout(() => {
    //       animationFlag = false;
    //     }, TIME_ANIMATION / 2);
    //   }, TIME_ANIMATION / 2);
    // }, TIME_ANIMATION);  // mark 先这样
    animationFlag.value = false;
    clear();

    nextTick(() => {  // DOM 更新。
      animationFlag.value = true;
      nameList.value = newNameList;
      init();
      animateAgain();
    })
  }

  const reload = async() => {
    touchedFlag = true;

    clear();
    await sleep(TIME_ANIMATION * .7);  // update 之后同时获取新的数据

    init();
    animateAgain();
  }

  const back = async() => {
    touchedFlag = true;

    // 1.
    clear();
    await sleep(TIME_ANIMATION);
    // 2.
    let newNameList = [];
    let index = pathHistory.value.pop();
    for(let i=1; i<21; i++)
      newNameList.push({wordName: `Star${index}-${i}`, worfValue: 600});
    // 3.
    // setTimeout(() => {
    //   init(RADIUS_BIGGER);
    //   nameList.value = newNameList;
    //   setTimeout(() => {
    //     init(RADIUS);
    //   }, TIME_ANIMATION / 2);
    // }, TIME_ANIMATION);  // mark 先这样
    animationFlag.value = false;
    init(RADIUS_BIGGER, true);
    await sleep(50); // update 有效，但是不合适。
    console.info("wait-over");
    
    nextTick(() => {
      animationFlag.value = true;
      nameList.value = newNameList;
      init();
      animateAgain();
    })
  }

</script>

<style scoped>
.star-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.tagBall {
  width: 100%;
  height: 100%;
  position: relative;

  overflow: hidden;
}

.point {
  height: 10px;
  width: 10px;
  border-radius: 50%;

  background-color: #FFC300;
}

/* .point:hover {
  box-shadow: 0 0 10px 5px #ff8e8e86;
} */

.tag {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;

  color: #000;
  font-size: 10px;
  font-weight: bold;
  white-space: nowrap; /* 文本不换行 */

  /* animatoin */
  transform-origin: center; /* 确保扩散动画从中心开始 */
  opacity: 0; /* 初始透明度 */
}

.tag-animation {
  transition: transform 1s ease-out, opacity 1s ease-out; /* 过渡动画 */
}

.btn-test {
  margin: 50px;
}

.star-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

</style>
