<template>
    <section class="flex flex-col items-center p-3 pb-5 min-h-screen bg-secondary">
        <h1 class="text-xl font-bold text-light mb-4">{{ $t('2d_today_winners') }}</h1>
        <Loading :loading="loading" v-if="loading" />
        <div v-else class="w-full pb-20">
            <div v-for="(winner, index) in winners" :key="index">
<<<<<<< HEAD
                <div v-if="winner.phone" class="bg-primary rounded-lg p-4 mb-4 shadow-md">
=======
                <div v-if="winner.phone" class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] rounded-lg p-4 mb-4 shadow-md">
>>>>>>> 032a9fb (change color)
                    <div class="my-2">
                        <div class="flex items-center mt-2">
                            <img v-if="winner.avatar" :src="winner.avatar"
                                class="!w-12 !h-12 object-cover rounded-full" />
                            <div class="ml-3">
                                <div class="text-gold text-md font-semibold">{{ winner.name }}</div>
                                <div class="text-gold text-md font-semibold">{{ winner.phone }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(detail, detailIndex) in winner.totals" :key="detailIndex"
                        class="p-3 rounded-lg bg-secondary mt-3 shadow-sm">
                        <div class="my-2 text-light">
                            ပေါက်ဂဏန်း:
                            <span class="text-gold font-semibold">{{ detail.number }}</span>
                        </div>
                        <div class="my-2 text-light">
                            ထိုးကြေး:
                            <span class="text-gold font-semibold">{{ detail.betting_amount }}</span>
                        </div>
                        <div class="my-2 text-light">
                            ရငွေ:
                            <span class="text-gold font-semibold">{{ detail.compensation_amount }}</span>
                        </div>
                        <div class="my-2 text-light">
                            ထီထိုးချိန်:
                            <div class="text-gold" v-if="detail.betting_time == 'early_morning'">{{ $t('morning') }}
                                (11:00PM)
                            </div>
                            <div class="text-gold" v-if="detail.betting_time == 'morning'">{{ $t('morning') }} (12:01PM)
                            </div>
                            <div class="text-gold" v-if="detail.betting_time == 'early_evening'">{{ $t('evening') }}
                                (03:00PM)
                            </div>
                            <div class="text-gold" v-if="detail.betting_time == 'evening'">{{ $t('evening') }} (04:30PM)
                            </div>
                        </div>
                        <div class="my-2 text-light">
                            ရက်စွဲ:
                            <span class="text-gold font-semibold">{{ formatDate(detail.created_at) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="winners && winners.length === 0" class="text-center text-danger pt-5 text-lg min-h-screen">{{
                $t('no_winner_records') }}</div>
        </div>
    </section>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { useTwodWinner } from '@/modules/twod/composables/useTwodWinner'

export default {
    components: { Loading },
    setup() {
        const { winners, loading, formatDate } = useTwodWinner()
        return { winners, loading, formatDate }
    }
}
</script>