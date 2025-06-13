import { storeToRefs } from 'pinia'
import { useTwodResultHistoryStore } from '@/modules/twod/store/twodResultHistoryStore';

export const useTwodResultHistory = () => {
    const store = useTwodResultHistoryStore()
    const { twodResults, loading, error } = storeToRefs(store)
    const { fetchTwodResults } = store

    return {
        twodResults,
        loading,
        error,
        fetchTwodResults,
    }
}
