import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrentPage = defineStore('CurrentPage', () => {

  let currentPage = ref('')
  const switchPage = (page = 'trade') => {
    currentPage.value = page
    return currentPage.value;
  }
  switchPage()
  return {
    switchPage,
    currentPage
  }
})

