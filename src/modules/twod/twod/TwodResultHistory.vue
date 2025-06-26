<template>
    <main v-for="(data, index) in twodResults" :key="index" class="rounded-lg my-3 p-3 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)]">
        <h5 class="text-light">{{ data?.date }}</h5>
        <section class="w-full mt-4">
            <div class="rounded-t-lg px-3 py-2">
                <h6 class="font-semibold text-center mb-3 text-xl text-light">11:00 AM</h6>
                <div class="flex justify-between items-center text-light">
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Set</h6>
                        <p>{{ data?.set_1100 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Value</h6>
                        <p>{{ data?.val_1100 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">2D</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.result_1100 ?? '--' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="rounded-t-lg px-3 py-2">
                <h6 class="font-semibold text-center mb-3 text-xl text-light">12:01 PM</h6>
                <div class="flex justify-between items-center text-light">
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Set</h6>
                        <p>{{ data?.set_1200 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Value</h6>
                        <p>{{ data?.val_1200 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">2D</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.result_1200 ?? '--' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="rounded-t-lg px-3 py-2">
                <h6 class="font-semibold text-center mb-3 text-xl text-light">03:00 PM</h6>
                <div class="flex justify-between items-center text-light">
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Set</h6>
                        <p>{{ data?.set_300 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Value</h6>
                        <p>{{ data?.val_300 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">2D</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.result_300 ?? '--' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="rounded-t-lg px-3 py-2">
                <h6 class="font-semibold text-center mb-3 text-xl text-light">04:30 PM</h6>
                <div class="flex justify-between items-center text-light">
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Set</h6>
                        <p>{{ data?.set_430 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">Value</h6>
                        <p>{{ data?.val_430 ?? '--' }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold">2D</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.result_430 ?? '--' }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full flex flex-col items-center mt-4">
            <div class="w-full">
                <h1 class="font-semibold text-center mb-3 text-xl text-light">09:30 AM</h1>
                <div class="flex justify-between w-full">
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold text-gold">Modern</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.modern_930 ?? '--' }}
                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold text-gold">Internet</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.internet_930 ?? '--' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full mt-3">
                <h1 class="font-semibold text-center mb-3 text-xl text-light">02:00 PM</h1>
                <div class="flex justify-between w-full">
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold text-gold">Modern</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.modern_200 ?? '--' }}
                        </p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h6 class="font-semibold text-gold">Internet</h6>
                        <p class="!text-gold font-bold text-xl">
                            {{ data?.internet_200 ?? '--' }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTwodResultHistory } from '@/modules/twod/composables/useTwodResultHistory'

const { twodResults, fetchTwodResults } = useTwodResultHistory()

onMounted(async () => {
    await fetchTwodResults()
})
</script>
