<template>
    <section class="space-y-5 p-5 h-[120vh] overflow-y-scroll">
        <h1 class="text-center text-lg text-primary font-semibold">{{ $t('deposit') }}</h1>
        <div v-if="loading" class="h-[430px] flex items-center">
            <Loading />
        </div>
        <section class="space-y-5" v-else>
            <h3 class="text-center text-primary font-semibold">{{ $t('select_payment') }}</h3>
            <div class="rounded-md shadow-md bg-white py-3 flex flex-wrap justify-center items-center gap-3">
                <div v-for="(payment, index) in bankTypes" :key="index"
                    class="flex flex-col justify-center items-center p-2 bg-primary rounded-md cursor-pointer"
                    @click="handleSelectBankType(payment)">
                    <img :src="payment.image" :alt="payment.name" class="w-20 h-20 rounded-md" />
                    <span class="text-sm font-medium text-light">{{ payment.name }}</span>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Loading
    },
    data() {
        return {
            bankTypes: [],
            selectedBankType: null,
            loading: false
        }
    },
    computed: {
        ...mapGetters(["token"]),
    },
    methods: {
        handleSelectBankType(payment) {
            this.selectedBankType = payment.id
            this.$router.push({
                path: '/deposit-submit',
                query: { type: payment.id }
            })
        },
        async fetchBankTypes() {
            this.loading = true;
            const response = await this.$axios.get(`/auth/active/banktypes`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            this.loading = false;
            this.bankTypes = response.data;
        },
    },
    mounted() {
        this.fetchBankTypes();
    }
}
</script>
