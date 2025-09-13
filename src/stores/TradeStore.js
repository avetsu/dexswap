import { defineStore } from 'pinia';
import { ref} from 'vue';

export const useTradeStore = defineStore('TradeStore', () => {
    let currentTab = ref('swap')

    const switchTab = (tab) => {
        currentTab.value = tab
    }

    return {
        currentTab,
        switchTab
    }
})

