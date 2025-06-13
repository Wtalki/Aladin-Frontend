import { useTwodWinHistoryStore } from '@/modules/twod/store/twodWinHistoryStore'

export const useTwodWinHistory = () => {
    const store = useTwodWinHistoryStore()

    const init = async () => {
        await store.fetchTwodWinHistory()
    }

    return {
        loading: store.loading,
        betWins: store.betWins,
        init
    }
}
