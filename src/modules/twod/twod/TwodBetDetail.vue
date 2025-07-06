<template>
    <section class="flex flex-col w-full mx-auto rounded min-h-screen p-3">
        <Loading :loading="loading" v-if="loading" />
        <div v-else>
            <div class="my-2 !text-blue-500 font-semibold">
                <span>{{ $t('date') }}:</span>
                <span>{{ formatDate(betDetails[0]?.created_at) }}</span>
            </div>
            <table class="w-full border-collapse border border-gray-700 text-white">
                <thead>
                    <tr class="bg-primary">
                        <th class="text-center p-3 border border-gray-700">ဂဏန်းများ</th>
                        <th class="text-center p-3 border border-gray-700">ထိုးငွေပမာဏ</th>
                    </tr>
                </thead>
                <tbody v-for="(detail, index) in betDetails" :key="index" class="bg-secondary">
                    <tr>
                        <td class="text-center font-semibold border border-gray-700 py-2">{{ detail.number }}</td>
                        <td class="text-center border border-gray-700">
                            <div class="flex justify-center items-center">
                                <input :value="detail.betting_amount" disabled
                                    class="w-24 p-2 text-center bg-primary border border-gray-600 text-white rounded-md focus:outline-none" />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr class="bg-primary">
                        <td class="text-center font-semibold border border-gray-700 py-2">{{ $t('total') }}</td>
                        <td class="text-center border border-gray-700">
                            <div class="flex justify-center items-center">
                                <input :value="totalAmount" disabled
                                    class="w-24 p-2 text-center bg-primary border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-gold focus:outline-none" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            betDetails: [],
            totalAmount: 0
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString)
            const weekdays = ['စနေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'တနင်္ဂနွေ']
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            const day = date.getDate()
            const month = months[date.getMonth()]
            const year = date.getFullYear()
            const weekday = weekdays[date.getDay()]
            return `${weekday} , ${day}-${month}-${year}`
        },
        async getTwodBetDetail() {
            this.loading = true
            try {
                const res = await this.$axios.get(`/auth/twod-bet-detail/${this.$route.params.id}`, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                this.betDetails = res.data
                this.totalAmount = this.betDetails.reduce((sum, bet) => sum + bet.betting_amount, 0);
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        }
    },
    mounted() {
        this.getTwodBetDetail()
    }
}
</script>
