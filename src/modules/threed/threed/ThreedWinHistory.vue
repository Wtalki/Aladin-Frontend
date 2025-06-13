<template>
    <section class="p-3">
        <Loading :loading="loading" v-if="loading" />
        <div v-else class="pb-20">
            <div v-for="(win, index) in betWins" :key="index" class="betCard rounded-lg">
                <div>
                    <div class="my-2 text-gray-400">
                        လောင်းကစား ID:
                        <span class="text-blue-500 betData">{{ win.betting_code }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('winning_number') }}:
                        <span class="text-blue-500 betData">{{ win.number }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('betting_amount') }}:
                        <span class="text-blue-500 betData">{{ win.betting_amount }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('win_type') }}:
                        <span class="p-1 rounded bg-gold betData" v-if="win.win">ဒဲ့ပေါက်သည်</span>
                        <span class="p-1 rounded bg-gold betData" v-if="win.round_win">သွပ်ပေါက်သည်</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('win_amount') }}:
                        <span class="text-blue-500 betData" v-if="win.win">{{ win.betting_amount *
                            win.win_compensation_percentage }}</span>
                        <span class="text-blue-500 betData" v-if="win.round_win">{{ win.betting_amount *
                            win.round_win_compensation_percentage }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('result_date') }}:
                        <span class="text-blue-500 betData">{{ win.result_date }}</span>
                    </div>
                    <div class="my-2 text-gray-400">
                        {{ $t('betting_date') }}:
                        <span class="text-blue-500 betData">{{ formatDate(win.created_at) }}</span>
                    </div>
                </div>
            </div>
            <div v-if="betWins && betWins.length === 0" class="text-center text-danger pt-5" style="height: 100vh">
                {{ $t('no_winning_records') }}</div>
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
            betWins: []
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString)
            const weekdays = ['', 'တနင်္လာနေ့', 'အင်္ဂါနေ့', 'ဗုဒ္ဓဟူးနေ့', 'ကြာသပတေးနေ့', 'သောကြာနေ့', '']
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            const day = date.getDate()
            const month = months[date.getMonth()]
            const year = date.getFullYear()
            const weekday = weekdays[date.getDay()]
            return `${weekday} , ${day}-${month}-${year}`
        },
        async getTwodHistories() {
            let res = await this.$axios.get(`/auth/threed-win-histories`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            this.betWins = res.data
        }
    },
    mounted() {
        this.getTwodHistories()
    }
}
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
