import { defineStore } from 'pinia';
import { getTwodResults } from '@/modules/twod/services/twodResultHistoryService';

export const useTwodResultHistoryStore = defineStore('twodResultHistory', {
    state: () => ({
        twodResults: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchTwodResults() {
            this.loading = true
            this.error = null
            try {
                const data = await getTwodResults()
                this.twodResults = data
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        }
    }
})
