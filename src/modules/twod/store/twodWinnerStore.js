import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWinners } from '@/modules/twod/services/twodWinnerService'

export const useTwodWinnerStore = defineStore('twodWinnerStore', () => {
    const winners = ref([])
    const loading = ref(false)

    const fetchWinners = async () => {
        loading.value = true
        try {
            const token = localStorage.getItem('jwt_token')
            winners.value = await getWinners(token)
        } catch (error) {
            console.error('Error fetching winners:', error)
        } finally {
            loading.value = false
        }
    }

    return {
        winners,
        loading,
        fetchWinners
    }
})
