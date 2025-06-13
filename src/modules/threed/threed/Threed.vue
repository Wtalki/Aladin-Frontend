<template>
    <section class="flex flex-col items-center p-5 bg-secondary min-h-screen">
        <div class="bg-gold text-light p-2 mb-2 rounded-lg w-full flex justify-center items-center">
            3D ထွက်မည့်ရက် : {{ threedSetting?.result_date }}
        </div>
        <div class="bg-success text-light p-3 rounded-lg w-full text-center flex justify-between items-center">
            <span>
                {{ $t('rul') }}
                <router-link to="/threed/threed-rules" class="underline">{{ $t('read') }}</router-link>
            </span>
        </div>

        <section class="w-full flex justify-between items-center mt-4 space-x-4">
            <router-link to="/threed/dreams-number" class="flex flex-col items-center text-light font-semibold text-md">
                <img class="w-14" :src="require('@/assets/images/webp/night.png')" />
                <span class="mt-2">{{ $t('dream_numbers') }}</span>
            </router-link>
            <router-link to="/threed/winners" class="flex flex-col items-center text-light font-semibold text-md">
                <img class="w-14" :src="require('@/assets/images/svg/winner.svg')" />
                <span class="mt-2">{{ $t('winners') }}</span>
            </router-link>
            <router-link to="/threed/history" class="flex flex-col items-center text-light font-semibold text-md">
                <img class="w-14" :src="require('@/assets/images/webp/history.webp')" />
                <span class="mt-2">{{ $t('history') }}</span>
            </router-link>
        </section>

        <section class="w-full flex flex-col items-center mt-6">
            <span class="text-5xl font-bold text-success animate-pulse">{{ live?.result }}</span>
            <div class="text-gray-400 mt-3 text-md flex items-center space-x-2">
                <i class="fas fa-check text-success"></i>
                <span class="text-success font-semibold">Updated</span>
                <span>{{ live?.date }}</span>
            </div>
        </section>

        <section class="w-full mt-6 space-y-5 !pb-32">
            <div v-for="result in results" :key="result.id" class="bg-primary text-light p-4 rounded-lg">
                <div class="flex justify-between items-center mt-3">
                    <div class="flex flex-col items-center">
                        <h1 class="text-lg font-semibold">{{ $t('date') }}</h1>
                        <p>{{ result.date }}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <h1 class="text-lg font-semibold">{{ $t('3d_result') }}</h1>
                        <p class="text-success font-bold text-xl">{{ result.result }}</p>
                    </div>
                </div>
            </div>
        </section>

        <div class="fixed bottom-28" v-if="token">
            <div v-if="!loading">
                <router-link v-if="threedSetting?.status" to="/threed/bet"
                    class="py-2 px-3 text-center bg-gold rounded-lg shadow-md"> {{
                        $t('3D_Bet') }} </router-link>
                <div v-else class="py-2 px-3 text-center bg-danger text-light rounded-lg shadow-md"> {{
                    $t('3D_closed') }} </div>
            </div>
        </div>
        <router-link v-else to="/login" class="fixed bottom-28 py-2 px-3 text-center bg-gold rounded-lg shadow-md"> {{
            $t('3D_Bet') }} </router-link>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            value: null,
            live: '--',
            results: [],
            loading: true
        }
    },
    computed: mapGetters(["token", "threedSetting"]),
    methods: {
        ...mapActions(['fetchThreedSetting']),
        async getThreedResults() {
            try {
                const res = await this.$axios.get('/auth/threed-results');
                this.live = res.data[0];
                this.results = res.data;
            } catch (error) {
                console.error('Failed to fetch Threed results:', error);
            }
        }
    },
    created() {
        if (this.token) {
            this.fetchThreedSetting();
            setTimeout(() => {
                this.loading = false;
            }, 1500);
        }
    },
    mounted() {
        this.getThreedResults();
    }
}
</script>
