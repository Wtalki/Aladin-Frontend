import { computed, onMounted } from 'vue'
import { useTwodWinnerStore } from '../store/twodWinnerStore'

export function useTwodWinner() {
    const winnerStore = useTwodWinnerStore()

    const winners = computed(() => winnerStore.winners)
    const loading = computed(() => winnerStore.loading)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const weekdays = ['စနေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'တနင်္ဂနွေ']
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        const weekday = weekdays[date.getDay()]
        return `${weekday} , ${day}-${month}-${year}`
    }

    onMounted(() => {
        winnerStore.fetchWinners()
    })

    return {
        winners,
        loading,
        formatDate
    }
}
