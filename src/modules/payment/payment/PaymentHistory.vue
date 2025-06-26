<template>
    <section class="space-y-5 p-5 h-screen overflow-y-scroll">
        <h1 class="text-center text-lg text-primary font-semibold">{{ $t('Transaction_Record') }}</h1>
        <div class="mb-4 border-b border-gray-200">
            <ul class="flex text-sm font-medium text-center">
                <li class="w-full" @click="activeTab = 'topup'">
                    <button class="w-full p-4"
                        :class="activeTab === 'topup' ? 'border-b-2 !border-b-gold text-gold font-bold' : 'text-smoke font-bold'">{{
                            $t('deposit_history') }}</button>
                </li>
                <li class="w-full" @click="activeTab = 'withdraw'">
                    <button class="w-full p-4"
                        :class="activeTab === 'withdraw' ? 'border-b-2 !border-b-gold text-gold font-bold' : 'text-smoke font-bold'">{{
                            $t('withdraw_history') }}</button>
                </li>
                <li class="w-full" @click="activeTab = 'refund'">
                    <button class="w-full p-4"
                        :class="activeTab === 'refund' ? 'border-b-2 !border-b-gold text-gold font-bold' : 'text-smoke font-bold'">{{
                            $t('refund_history') }}</button>
                </li>
            </ul>
        </div>
        <div v-if="!transactions">
            <Loading />
        </div>
        <div v-else>
            <div v-if="activeTab === 'topup'" class="!pb-20">
                <div v-if="transactions.length">
                    <div v-for="(transaction, index) in transactions" :key="index">
                        <Button type="link" :route="`/deposit/${transaction.uuid}/detail`">
                            <Card class="text-sm border border-gray-700 !p-3 cursor-pointer space-y-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] mb-2">
                                <div class="flex justify-between items-center">
                                    <div class="flex space-x-2 items-center">
                                        <img v-if="transaction.bank_type" :src="transaction.bank_type?.image"
                                            class="w-16 h-16 object-cover rounded-md cursor-pointer" />
                                        <div>
                                            <h1 class="text-light font-semibold mb-2 line-clamp-1">
                                                {{ transaction?.uuid }}
                                            </h1>
                                            <span class="!text-blue-500">{{ $t('date') }} - {{
                                                $formatDate(transaction?.created_at, null, "DD-MMM-YYYY HH:mm A")
                                            }}</span>
                                        </div>
                                    </div>
                                    <h1 class="font-bold text-light flex-shrink-0">{{ transaction?.amount }} {{
                                        user.region == 'my' ? $t('MMK') : $t('THB') }}</h1>
                                </div>
                                <div v-if="transaction.status === 'rejected'">
                                    <div class="border border-dashed mb-3 !border-danger" />
                                    <div class="text-danger text-xs">{{ $t('transaction_rejected') }}</div>
                                </div>
                                <div v-else-if="transaction.status === 'pending'">
                                    <div class="border border-dashed mb-3 border-yellow-500" />
                                    <div class="text-gold text-xs">{{ $t('checking_transaction') }}</div>
                                </div>
                                <div v-else>
                                    <div class="border border-dashed mb-3 !border-success" />
                                    <div class="text-gold text-xs">{{ $t('transaction_successful') }}</div>
                                </div>
                            </Card>
                        </Button>
                    </div>
                </div>
                <div v-else class="mt-32">
                    <p class="text-center text-lg font-bold text-danger">{{ $t('no_deposit_records') }}</p>
                </div>
            </div>

            <div v-if="activeTab === 'withdraw'" class="!pb-20">
                <div v-if="transactions.length">
                    <div v-for="(transaction, index) in transactions" :key="index">
                        <Button type="link" :route="`/withdraw/${transaction.uuid}/detail`">
                            <Card class="text-sm border border-gray-700 !p-3 cursor-pointer space-y-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] mb-2">
                                <div class="flex justify-between items-center">
                                    <div class="flex space-x-2 items-center">
                                        <img v-if="transaction.bank_account"
                                            :src="transaction.bank_account.bank_type?.image"
                                            class="w-16 rounded-md cursor-pointer" />
                                        <div>
                                            <h1 class="text-light font-semibold mb-2">
                                                {{ transaction.uuid }}
                                            </h1>
                                            <span class="!text-blue-500">{{ $t('date') }} - {{
                                                $formatDate(transaction?.created_at, null, "DD-MMM-YYYY HH:mm A")
                                            }}</span>
                                        </div>
                                    </div>
                                    <h1 class="text-light font-bold">{{ transaction.amount }} {{
                                        user.region == 'my' ? $t('MMK') : $t('THB') }}</h1>
                                </div>
                                <div v-if="transaction.status === 'rejected'">
                                    <div class="border border-dashed mb-3 border-danger" />
                                    <div class="text-danger text-xs">{{ $t('transaction_rejected') }}</div>
                                </div>
                                <div v-else-if="transaction.status === 'pending'">
                                    <div class="border border-dashed mb-3 border-yellow-500" />
                                    <div class="text-gold text-xs">{{ $t('checking_transaction') }}</div>
                                </div>
                                <div v-else>
                                    <div class="border border-dashed mb-3 !border-success" />
                                    <div class="text-gold text-xs">{{ $t('transaction_successful') }}</div>
                                </div>
                            </Card>
                        </Button>
                    </div>
                </div>
                <div v-else class="mt-32">
                    <p class="text-center text-lg font-bold text-danger">{{ $t('no_withdrawal_records') }}</p>
                </div>
            </div>

            <div v-if="activeTab === 'refund'" class="!pb-20">
                <div v-if="transactions.length">
                    <div v-for="(transaction, index) in transactions" :key="index">
                        <Card class="text-sm !p-3 cursor-pointer space-y-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] mb-2">
                            <div class="flex justify-between items-center">
                                <div class="flex space-x-2 items-center">
                                    <div>
                                        <h1 class="text-light font-semibold mb-2">
                                            {{ $t('refund_id') }} : {{ transaction.uuid }}
                                        </h1>
                                        <h1 class="text-light font-semibold mb-2">
                                            {{ $t('betting_id') }} : {{ transaction.refundable.betting_code }}
                                        </h1>
                                        <h1 class="text-light font-semibold mb-2">
                                            {{ $t('number') }} : {{ transaction.refundable.number }}
                                        </h1>
                                        <h1 class="text-light font-semibold mb-2">
                                            {{ $t('note') }} : {{ transaction?.note }}
                                        </h1>
                                        <span class="!text-blue-500">{{ $t('date') }} - {{
                                            $formatDate(transaction?.created_at)
                                        }}</span>
                                    </div>
                                </div>
                                <h1 class="text-light font-bold">{{ transaction?.amount }} {{ $t('MMK') }}</h1>
                            </div>
                        </Card>
                    </div>
                </div>
                <div v-else class="mt-32">
                    <p class="text-center text-lg font-bold text-danger">{{ $t('no_refund_records') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import Card from '@/components/common/Card.vue'
import Button from '@/components/atoms/Button.vue'
import Loading from '@/components/Loading.vue'
export default {
    components: {
        Card,
        Button,
        Loading
    },
    inject: ["$formatDate"],
    data() {
        return {
            transactions: [],
            activeTab: 'topup'
        }
    },
    computed: mapGetters(["user", "token"]),
    watch: {
        activeTab(value) {
            this.transactions = null
            if (value === 'topup') {
                this.getTopupHistory()
            } else if (value === 'withdraw') {
                this.getOutTransactionHistory()
            } else {
                this.getRefundHistory()
            }
        }
    },
    methods: {
        async getTopupHistory() {
            let res = await this.$axios.get(
                `/auth/top-ups/${this.user.id}/history`,
                {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            this.transactions = res.data;
        },
        async getOutTransactionHistory() {
            let res = await this.$axios.get(`/auth/out-transaction/${this.user.id}/history`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            this.transactions = res.data
        },
        async getRefundHistory() {
            let res = await this.$axios.get(`/auth/refunds/${this.user.id}/history`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            this.transactions = res.data
        }
    },
    mounted() {
        this.getTopupHistory()
    }
}
</script>
