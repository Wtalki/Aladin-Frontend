<template>
    <section>
        <div v-if="loading" class="h-screen">
            <Loading :loading="loading" />
        </div>
        <div v-else class="p-3 space-y-3 h-screen overflow-y-scroll !pb-20">
            <div class="flex space-x-2">
                <input type="date" v-model="selectedDate" class="!bg-primary text-white p-2 rounded w-full"
                    @change="getBets" />
                <select v-model="selectedBetTime" class="!bg-primary text-white p-2 rounded w-full" @change="getBets">
                    <option value="all">{{ $t('all_betting_times') }}</option>
                    <option value="early_morning">{{ $t('morning') }} (11:00PM)</option>
                    <option value="morning">{{ $t('morning') }} (12:01PM)</option>
                    <option value="early_evening">{{ $t('evening') }} (03:00PM)</option>
                    <option value="evening">{{ $t('evening') }} (04:30PM)</option>
                </select>
            </div>
            <div v-for="(bet, index) in bets" :key="index"
                class="!bg-primary p-4 rounded-lg shadow-md mb-3 cursor-pointer"
                @click="showBetDetails(bet.betting_code)">
                <div class="my-2">
                    <span class="text-gold font-bold">{{ $t('betting_id') }}:</span>
                    <span class="text-light text-sm">{{ bet.betting_code }}</span>
                </div>
                <div class="my-2">
                    <span class="text-gold font-bold">{{ $t('lottery_betting_time') }}:</span>
                    <span class="text-light text-sm bg-yellow-400 p-1 rounded-lg">
                        <div v-if="bet.betting_time == 'early_morning'">{{ $t('morning') }} (11:00PM)</div>
                        <div v-if="bet.betting_time == 'morning'">{{ $t('morning') }} (12:01PM)</div>
                        <div v-if="bet.betting_time == 'early_evening'">{{ $t('evening') }} (03:00PM)</div>
                        <div v-if="bet.betting_time == 'evening'">{{ $t('evening') }} (04:30PM)</div>
                    </span>
                </div>
                <div class="my-2">
                    <span class="text-gold font-bold">{{ $t('total') }}:</span>
                    <span class="text-light text-sm">{{ bet.total_betting_amount }} MMK</span>
                </div>
                <div class="my-2">
                    <span class="text-gold font-bold">{{ $t('date') }}:</span>
                    <span class="text-light text-sm">{{ formatDate(bet.created_at) }}</span>
                </div>
            </div>
            <div v-if="bets && bets.length === 0" class="text-center text-red-500 pt-5 h-screen">
                {{ $t('no_betting_records') }}
            </div>
        </div>
    </section>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import { useRouter } from 'vue-router'
import { useTwodBetHistory } from '@/modules/twod/composables/useTwodBetHistory.js'
import { onMounted } from 'vue'

const router = useRouter()
const { loading, bets, selectedDate, selectedBetTime, getBets, setTodayDate } = useTwodBetHistory()

onMounted(() => {
    setTodayDate()
    getBets()
})

const showBetDetails = (bettingCode) => {
    router.push(`/twod/bet/${bettingCode}/details`)
}

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
</script>
