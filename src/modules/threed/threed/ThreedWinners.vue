<template>
    <section class="flex flex-col items-center p-3 pb-5 min-h-screen bg-secondary">
        <h1 class="text-xl font-bold text-light mb-4">{{ $t('winners') }}</h1>
        <Loading :loading="loading" v-if="loading" />
        <div v-else class="w-full pb-20">
            <div v-for="(winner, index) in winners" :key="index">
                <div v-if="winner.phone" class="!bg-primary rounded-lg p-3 mb-4 shadow-md">
                    <div class="my-2">
                        <div class="flex items-center mt-2">
                            <img v-if="winner.avatar" :src="winner.avatar"
                                class="!w-12 !h-12 object-cover rounded-full" />
                            <div class="ml-3">
                                <div class="text-light text-md font-semibold">{{ winner.name }}</div>
                                <div class="text-light text-md font-semibold">{{ winner.phone }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(detail, detailIndex) in winner.totals" :key="detailIndex"
                        class="p-3 rounded-lg bg-secondary mt-3 shadow-sm">
                        <div class="my-2 text-warning">
                            {{ $t('winning_number') }}:
                            <span class="text-light font-semibold">{{ detail.number }}</span>
                        </div>
                        <div class="my-2 text-warning">
                            {{ $t('bet_amount') }}:
                            <span class="text-light font-semibold">{{ detail.betting_amount }} {{ user.region == 'my' ?
                                $t('MMK') : $t('THB') }}</span>
                        </div>
                        <div class="my-2 text-warning">
                            {{ $t('win_type') }}:
                            <span class="p-1 rounded bg-gold text-light text-sm" v-if="detail.win">ဒဲ့ပေါက်သည်</span>
                            <span class="p-1 rounded bg-gold text-light text-sm"
                                v-if="detail.round_win">သွပ်ပေါက်သည်</span>
                        </div>
                        <div class="my-2 text-warning">
                            {{ $t('win_amount') }}:
                            <span class="text-light font-semibold">{{ detail.compensation_amount }} {{ user.region ==
                                'my' ? $t('MMK') : $t('THB') }}</span>
                        </div>
                        <div class="my-2 text-warning">
                            {{ $t('result_date') }}:
                            <span class="text-light font-semibold">{{ detail.result_date }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="winners && winners.length === 0" class="text-center text-danger pt-5 text-lg min-h-screen">
                {{ $t('no_winner_records') }}</div>
        </div>
    </section>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { mapGetters } from "vuex";

export default {
    components: {
        Loading
    },
    data() {
        return {
            loading: false,
            winners: []
        }
    },
    computed: {
        ...mapGetters(["token", "user"])
    },
    methods: {
        async getWinners() {
            this.loading = true
            try {
                const response = await this.$axios.get('/auth/threed-bet-winners', {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                })
                this.winners = response.data
            } catch (error) {
                if (error.response) {
                    this.$EventBus.emit('show-toast', {
                        severity: 'error',
                        summary: '',
                        detail: error.response.data.message,
                        life: 2000
                    })
                }
            } finally {
                this.loading = false
            }
        }
    },
    mounted() {
        this.getWinners()
    }
}
</script>
