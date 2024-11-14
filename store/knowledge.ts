import { defineStore } from "pinia";
import { ref, watch } from "vue";
import api from "../request/knowledge";

interface Knowledge {
    id: number;
    dirs: string[];
    title: string;
    content: string;
}

// INFO 保持 10 个，每次随机替换掉5个。
const NUM_INIT = 5;
const NUM_SINGLE = 2;
const CNT_MAX = 1;


export default defineStore("knowledge", () => {
  const knowledge = ref<Knowledge[]>([]);
  const cnt = ref(0);
  
  let index = 0;

  function Next() { // TIP 这样外部只需要调用，计数、重置等操作都封装到 pinia 中了，
    const data = knowledge.value[index];
    index++;
    if (index >= knowledge.value.length) {
      index = 0;
      cnt.value += 1;  
    }
    return data;
  }

  // 监听 cnt 的变化
  watch(cnt, (newVal) => {
    if (newVal > CNT_MAX) {
      triggerReset();
    }
  });

  const InitKnowledge = async() => {
    if (knowledge.value.length > 0)
        return Next();
    cnt.value = 0;

    await api.randomKnowledges(NUM_INIT).then(data => {
      knowledge.value = data;
      console.debug("init knowledge", knowledge.value);
    });
    return Next();
  };

  const triggerReset = () => {
    cnt.value = 0;

    api.randomKnowledges(NUM_SINGLE).then((data) => {
      console.debug(data);
      data.forEach( element => {  // UPDATE 目前只是一个粗糙的随机
        const index = Math.floor(Math.random() * knowledge.value.length)
        knowledge.value[index] = element;
      });
    });
  };

  return { InitKnowledge, Next };
});