<template>
    <section class="flex flex-col items-center p-3 min-h-screen space-y-4 !pb-32">
        <div v-for="result in results" :key="result.id" class="bg-primary w-full text-light p-4 rounded-lg">
            <div class="flex justify-between items-center mt-3">
                <div class="flex flex-col items-center">
                    <h1 class="text-lg font-semibold">{{ $t('date') }}</h1>
                    <p>{{ result.date }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <h1 class="text-lg font-semibold">{{ $t('3d_result') }}</h1>
                    <p class="text-gold font-bold text-xl">{{ result.result }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            results: []
        }
    },
    methods: {
        async getThreedResults() {
            try {
                const res = await this.$axios.get('/auth/threed-results');
                this.live = res.data[0];
                this.results = res.data;
            } catch (error) {
                console.error('Failed to fetch Threed results:', error);
            }
        },
    },
    mounted() {
        this.getThreedResults()
    }
}
</script>
