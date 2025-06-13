<template>
    <section class="space-y-5 p-5 h-[120vh] overflow-y-scroll">
        <h1 class="text-center text-lg text-light font-semibold">{{ $t('deposit') }}</h1>
        <div v-if="loading" class="h-[430px] flex items-center">
            <Loading />
        </div>
        <section class="space-y-5" v-else>
            <h3 class="text-center text-light font-semibold">{{ $t('select_payment') }}</h3>
            <div class="rounded-md shadow-md bg-white py-3 flex flex-wrap justify-center items-center gap-3">
                <div v-for="(payment, index) in bankTypes" :key="index"
                    :class="selectedBankType === payment.id ? 'border-[3px] border-gold' : ''"
                    class="flex flex-col justify-center items-center p-2 bg-gray rounded-md cursor-pointer"
                    @click="handleSelectBankType(payment)">
                    <img :src="payment.image" :alt="payment.name" class="w-20 h-20 rounded-md" />
                    <span class="text-sm font-medium text-light">{{ payment.name }}</span>
                </div>
            </div>
            <Button type="button" @click="nextStep"
                class="py-3 w-full px-4 text-center rounded leading-5 text-primary bg-warning border border-secondary">{{
                    $t('next') }}</Button>
        </section>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from '@/libs/AppEventBus'
import Button from '@/components/atoms/Button.vue'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Button,
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
        nextStep() {
            if (!this.selectedBankType) {
                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: "ကျေးဇူးပြု၍ငွေပေးချေမှုအမျိုးအစားကိုရွေးချယ်ပါ",
                    life: 2000
                })
                return
            }
            this.$router.push({
                path: '/deposit-submit',
                query: { type: this.selectedBankType }
            })
        },
        handleSelectBankType(payment) {
            this.selectedBankType = payment.id
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
