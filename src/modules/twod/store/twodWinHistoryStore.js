import { defineStore } from 'pinia'
import { getTwodWinHistory } from '@/modules/twod/services/twodWinHistoryService'

export const useTwodWinHistoryStore = defineStore('twodWinHistory', {
    state: () => ({
        loading: false,
        betWins: []
    }),
    actions: {
        async fetchTwodWinHistory() {
            this.loading = true
            try {
                const token = localStorage.getItem('jwt_token')
                this.betWins = await getTwodWinHistory(token)
            } catch (e) {
                console.error('Failed to fetch win history', e)
            } finally {
                this.loading = false
            }
        }
    }
})
