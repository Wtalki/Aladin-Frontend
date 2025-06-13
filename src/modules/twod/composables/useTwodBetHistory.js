import { storeToRefs } from 'pinia'
import { useTwodBetHistoryStore } from '@/modules/twod/store/twodBetHistoryStore'

export const useTwodBetHistory = () => {
    const store = useTwodBetHistoryStore()
    const { loading, bets, selectedDate, selectedBetTime } = storeToRefs(store)

    const getBets = store.getBets
    const setTodayDate = store.setTodayDate

    return {
        loading,
        bets,
        selectedDate,
        selectedBetTime,
        getBets,
        setTodayDate
    }
}
