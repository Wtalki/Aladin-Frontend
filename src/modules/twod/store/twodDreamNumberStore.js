import { defineStore } from 'pinia'
import { fetchTwodDreamNumbers } from '@/modules/twod/services/twodDreamNumberService'

export const useTwodDreamNumberStore = defineStore('twodDreamNumber', {
  state: () => ({
    items: [],
    currentPage: 1,
    previousPageUrl: null,
    nextPageUrl: null
  }),

  actions: {
    async loadDreamNumbers(page = 1) {
      try {
        const data = await fetchTwodDreamNumbers(page)
        this.items = data.data
        this.currentPage = data.current_page
        this.previousPageUrl = data.previous_page_url
        this.nextPageUrl = data.next_page_url
      } catch (error) {
        console.error('Failed to load dream numbers:', error)
      }
    },

    changePage(url) {
      if (url) {
        const urlParams = new URL(url).searchParams
        const page = urlParams.get('page')
        this.loadDreamNumbers(page)
      }
    }
  }
})