<template>
    <section>
        <Loading :loading="loading" v-if="loading" />
        <div v-else class="p-3 space-y-3 !pb-20 min-h-screen">
            <div v-for="(bet, index) in bets" :key="index"
                class="bg-primary p-4 rounded-lg shadow-md mb-3 cursor-pointer"
                @click="showBetDetails(bet.betting_code)">
                <div class="my-2">
                    <span class="text-gray-400">{{ $t('betting_id') }}:</span>
                    <span class="text-blue-500 font-semibold">{{ bet.betting_code }}</span>
                </div>
                <div class="my-2">
                    <span class="text-gray-400">{{ $t('date') }}:</span>
                    <span class="text-blue-500 font-semibold">{{ formatDate(bet.created_at) }}</span>
                </div>
            </div>
            <div v-if="bets && bets.length === 0" class="text-center text-red-500 pt-5 h-screen">
                {{ $t('no_betting_records') }}</div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Loading
    },
    data() {
        return {
            loading: false,
            bets: []
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString)
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            const day = date.getDate()
            const month = months[date.getMonth()]
            const year = date.getFullYear()
            return `${day}-${month}-${year}`
        },
        showBetDetails(orderId) {
            this.$router.push(`/threed/bet/${orderId}/details`)
        },
        async getThreedBetHistories() {
            let res = await this.$axios.get(`/auth/threed-bet-histories`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            this.bets = res.data
        }
    },
    async mounted() {
        this.getThreedBetHistories()
    }
}
</script>

<style scoped>
.betCard {
    background-color: var(--primary-color);
    padding: 10px;
    margin-bottom: 10px;
}

.betData {
    font-size: 14px;
}
</style>
