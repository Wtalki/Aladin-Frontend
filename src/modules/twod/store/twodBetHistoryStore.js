import { defineStore } from 'pinia'
import { fetchTwodBetHistories } from '@/modules/twod/services/twodBetHistoryService'

export const useTwodBetHistoryStore = defineStore('twodBetHistory', {
    state: () => ({
        loading: false,
        bets: [],
        selectedDate: '',
        selectedBetTime: 'all'
    }),
    actions: {
        async getBets() {
            this.loading = true
            try {
                const token = localStorage.getItem('jwt_token')
                const bets = await fetchTwodBetHistories(this.selectedDate, this.selectedBetTime, token)
                this.bets = bets
            } catch (error) {
                console.error('Failed to fetch bets:', error)
            } finally {
                this.loading = false
            }
        },
        setTodayDate() {
            const today = new Date()
            const formatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Yangon',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
            const formatted = formatter.format(today).split('/').reverse().join('-')
            this.selectedDate = formatted
        }
    }
})
