<template>
    <section class="flex flex-col items-center p-3 !pb-32 !bg-secondary">
        <h1 class="text-center text-xl text-danger">{{$t('2d_closed_dates')}}</h1>
        <div class="flex justify-between w-full py-4 text-light font-semibold border-b border-primary" v-for="(holiday, index) in holidays.data" :key="index" style="font-size: 0.875rem">
            <span>{{ holiday?.date }}</span>
            <span class="text-light">{{ holiday?.name }}</span>
        </div>
    </section>
</template>

<script>
import { useTwodHoliday } from "@/modules/twod/composables/useTwodHoliday";

export default {
    setup() {
        const { holidays, loading } = useTwodHoliday();
        return { holidays, loading };
    }
};
</script>
