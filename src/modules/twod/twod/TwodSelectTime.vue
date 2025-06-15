<template>
    <div class="h-screen" v-if="loading">
        <Loading />
    </div>
    <section v-else class="flex flex-col w-full mx-auto">
        <!-- <section v-if="store.isWeekend" class="flex justify-center items-center h-screen">
            <h5 class="text-danger text-lg font-semibold">{{ $t('today_2d_closed') }}</h5>
        </section> -->
        <!-- v-else -->
        <section class="pt-5 px-3 text-center h-screen">
            <div>
                <h5 class="mb-4 text-primary text-lg"
                    v-if="store.canBetForEarlyMorning || store.canBetForMorning || store.canBetForEarlyEvening || store.canBetForEvening">
                    {{ $t('select_betting_time') }}</h5>
                <h5 v-else class="mt-5 text-danger text-lg font-semibold">{{ $t('2d_betting_time_passed') }}</h5>

                <div v-if="store.canBetForEarlyMorning"
                    :class="['bet-time-option', { selected: store.selectedTime === 'early_morning' }]"
                    @click="selectTime('early_morning')">11:00 AM</div>
                <div v-if="store.canBetForMorning"
                    :class="['bet-time-option', { selected: store.selectedTime === 'morning' }]"
                    @click="selectTime('morning')">12:01 PM</div>
                <div v-if="store.canBetForEarlyEvening"
                    :class="['bet-time-option', { selected: store.selectedTime === 'early_evening' }]"
                    @click="selectTime('early_evening')">03:00 PM</div>
                <div v-if="store.canBetForEvening"
                    :class="['bet-time-option', { selected: store.selectedTime === 'evening' }]"
                    @click="selectTime('evening')">04:30 PM</div>
            </div>

            <button v-if="store.selectedTime"
                class="flex justify-center items-center gap-2 p-3 w-full text-white !bg-primary border border-gold rounded-md mt-10 hover:bg-opacity-90 transition"
                @click="nextStep()">
                {{ $t('next') }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="21" height="21" viewBox="0 0 448 512">
                    <path
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
            </button>
        </section>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTwodSelectTime } from '@/modules/twod/composables/useTwodSelectTime'
import Loading from '@/components/Loading.vue'

const router = useRouter()
const { store, initialize, selectTime, loading } = useTwodSelectTime()

onMounted(() => {
    initialize()
})

const nextStep = () => {
    router.push({
        path: '/twod/bet',
        query: { selectedTime: store.selectedTime }
    })
}
</script>

<style scoped>
.bet-time-option {
    padding: 0.75rem 1.5rem;
    margin: 0.5rem 0;
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    text-align: center;
    font-weight: bold;
    color: #374151;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.bet-time-option.selected {
    background-color: #ffd700;
    color: white;
}
</style>