import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePoiStore = defineStore('poi', () => {
	const pois = ref([])
	// const poilist = computed(() => {
	// 	return pois.value
	// })

	function savePoi(data) {
		pois.value = data
	}

	return {

		savePoi,
		pois
	}
})