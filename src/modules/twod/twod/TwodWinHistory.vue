<template>
    <section class="p-3">
        <Loading :loading="loading" v-if="loading" />
        <div v-else class="pb-20">
            <div v-for="(win, index) in betWins" :key="index" class="betCard rounded-lg">
                <div>
                    <div class="my-2 text-gray-400">
                        {{ $t('betting_id') }}:
                        <span class="!text-blue-500 betData">{{ win.betting_code }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('winning_number') }}:
                        <span class="!text-blue-500 betData">{{ win.number }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('bet_amount') }}:
                        <span class="!text-blue-500 betData">{{ win.betting_amount }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('win_amount') }}:
                        <span class="!text-blue-500 betData">{{ win.compensation_amount }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('lottery_betting_time') }}:
                        <div class="text-gold" v-if="win.betting_time == 'early_morning'">{{ $t('morning') }} (11:00PM)
                        </div>
                        <div class="text-gold" v-if="win.betting_time == 'morning'">{{ $t('morning') }} (12:01PM)</div>
                        <div class="text-gold" v-if="win.betting_time == 'early_evening'">{{ $t('evening') }} (03:00PM)
                        </div>
                        <div class="text-gold" v-if="win.betting_time == 'evening'">{{ $t('evening') }} (04:30PM)</div>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('date') }}:
                        <span class="!text-blue-500 betData">{{ formatDate(win.created_at) }}</span>
                    </div>
                </div>
            </div>
            <div v-if="betWins && betWins.length === 0" class="text-center text-danger pt-5" style="height: 100vh">{{
                $t('no_winning_records') }}</div>
        </div>
    </section>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import { useTwodWinHistory } from '@/modules/twod/composables/useTwodWinHistory'
import { onMounted } from 'vue'

const { loading, betWins, init } = useTwodWinHistory()

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

onMounted(async () => {
    await init()
})
</script>

<style scoped>
.betCard {
    background-color: #111111;
    padding: 10px;
    margin-bottom: 10px;
}

.betData {
    font-size: 14px;
}
</style>
