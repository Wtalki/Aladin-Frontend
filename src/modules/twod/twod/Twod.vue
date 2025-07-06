<template>
    <section class="flex flex-col items-center p-5 min-h-screen">
        <div class="bg-gold text-light p-3 rounded-lg w-full text-center flex justify-between items-center">
            <span>
                {{ $t('rul') }}
                <router-link to="/twod/twod-rules" class="underline">{{ $t('read') }}</router-link>
            </span>
        </div>

        <section class="w-full flex justify-between items-center mt-4 space-x-4">
            <!-- <router-link to="/twod/dreams-number" class="flex flex-col items-center text-light font-semibold text-md">
                <img class="!w-12" :src="require('@/assets/images/webp/night.png')" />
                <span class="mt-2">{{ $t('dream_numbers') }}</span>
            </router-link> -->
            <router-link to="/twod/winners" class="flex flex-col items-center text-primary font-semibold text-md">
                <img class="!w-12" :src="require('@/assets/images/svg/winner.svg')" />
                <span class="mt-2">{{ $t('winners') }}</span>
            </router-link>
            <router-link to="/twod/history" class="flex flex-col items-center text-primary font-semibold text-md">
                <img class="!w-12" :src="require('@/assets/images/webp/history.webp')" />
                <span class="mt-2">{{ $t('history') }}</span>
            </router-link>
            <router-link to="/twod/holidays" class="flex flex-col items-center text-primary font-semibold text-md">
                <img class="!w-12" :src="require('@/assets/images/webp/holiday.webp')" />
                <span class="mt-2">{{ $t('holiday') }}</span>
            </router-link>
        </section>

        <section class="w-full flex flex-col items-center mt-6">
            <span class="text-7xl font-bold text-gold animate-pulse">{{ value?.live ?? '--' }}</span>
            <div class="w-full flex justify-between items-center mt-4 text-primary">
                <div class="flex flex-col items-center">
                    <h1 class="text-xl font-semibold">Set</h1>
                    <p>{{ value?.live_set ?? '--' }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <h1 class="text-xl font-semibold">Value</h1>
                    <p>{{ value?.live_val ?? '--' }}</p>
                </div>
            </div>
            <div class="mt-3 flex flex-col justify-center items-center">
                <div class="text-md text-gold flex items-center space-x-2">
                    <span class="font-semibold">Updated</span>
                    <span>{{ value?.current_time }}</span>
                </div>
                <span class="text-primary">{{ value?.current_date }}</span>
            </div>
        </section>

        <section class="w-full mt-6 space-y-5 !pb-32">
            <div v-for="time in ['1100', '1200', '300', '430']" :key="time"
                class="bg-primary text-light p-4 rounded-lg">
                <h1 class="text-xl font-semibold text-center">{{ timeFormat(time) }}</h1>
                <div class="flex justify-between items-center mt-3">
                    <div class="flex flex-col items-center">
                        <h1 class="text-xl font-semibold">Set</h1>
                        <p>{{ value?.[`set_${time}`] ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h1 class="text-xl font-semibold">Value</h1>
                        <p>{{ value?.[`val_${time}`] ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h1 class="text-xl font-semibold">2D</h1>
                        <p class="text-gold font-bold text-xl">{{ value?.[`result_${time}`] ?? '--' }}</p>
                    </div>
                </div>
            </div>
        </section>

        <router-link to="/twod/bet-select-time"
            class="fixed bottom-28 py-2 px-3 text-center bg-gold rounded-lg shadow-md"> {{ $t('2D_Bet') }}
        </router-link>
    </section>
</template>

<script>
import { useTwod } from "@/modules/twod/composables/useTwod";

export default {
    setup() {
        return useTwod();
    }
};
</script>
