import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlanStore = defineStore('plan', () => {
  const plan = ref([]);

  function savePlan(data) {
    plan.value = data;
  }

  return {
    savePlan,
    plan,
  };
});