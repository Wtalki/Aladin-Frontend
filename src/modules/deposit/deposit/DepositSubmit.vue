<template>
    <section>
        <div v-if="loading" class="h-screen">
            <Loading />
        </div>
        <div v-else class="space-y-5 p-5 h-[150vh]">
            <h1 class="text-center text-lg text-primary font-semibold">{{ $t('deposit_submit') }}</h1>
            <h3 class="text-center font-semibold text-danger mb-5">{{ $t('transfer_instruction') }}</h3>

            <span class="font-semibold text-primary">{{ $t('choose_deposit_account') }}</span>
            <Card v-for="(account, index) in paymentAccounts" :key="index"
                :class="selectedBankAccount === account.id ? '!bg-secondary border border-3 border-light' : 'bg-primary'"
                class="!p-3 cursor-pointer flex space-x-2 items-center" @click="handleSelectBankAccount(account)">
                <div class="flex flex-col font-semibold space-y-3 text-gray-200">
                    <span>{{ $t('account_name') }} : {{ account.acc_name }}</span>
                    <span>{{ $t('account_number') }} : {{ account.acc_number }}</span>
                    <span>{{ $t('min_transfer_amount') }} : {{ account.min_amount }}</span>
                    <span>{{ $t('max_transfer_amount') }} : {{ account.max_amount }}</span>
                </div>
            </Card>

            <form class="space-y-3" @submit.prevent="submit">
                <div class="space-y-3">
                    <span class="font-semibold text-primary">{{ $t('amount') }}</span>
                    <Input v-model="paymentAmount" type="number"
                        class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                        :placeholder="$t('enter_amount')" />
                    <Error :message="errors['amount']" v-if="errors['amount']" />
                    <div v-else>
                        <Error :message="errors['min_amount']" />
                        <Error :message="errors['max_amount']" />
                    </div>
                </div>

                <div class="space-y-3">
                    <span class="font-semibold text-primary">{{ $t('transaction_id') }}</span>
                    <Input v-model="realPaymentId" type="number"
                        class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                        :placeholder="$t('transaction_id')" />
                    <Error :message="errors['real_payment_id']" />
                </div>

                <!-- <div class="space-y-3">
                    <span class="font-semibold text-primary">{{ $t('payment_screenshot') }}</span>
                    <input type="file" @change="handleScreenshotUpload" accept="image/*"
                        class="block w-full text-sm cursor-pointer text-smoke file:text-smoke file:mr-4 file:p-3 bg-light rounded-lg file:border-0 file:text-sm" />
                    <Error :message="errors['screenshot']" v-if="errors['screenshot']" />
                </div> -->

                <button :disabled="submitLoading" type="submit"
                    class="flex items-center justify-center w-full py-2 mt-4 font-semibold text-black transition-all rounded-lg bg-primary">
                    <div v-if="submitLoading" class="flex items-center justify-center">
                        <svg class="w-8 h-8 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <div>{{ $t('submitting') }}</div>
                    </div>
                    <div v-else>
                        <span>{{ $t('submit') }}</span>
                    </div>
                </button>
            </form>

            <h3 class="text-center font-semibold text-danger">
                {{ $t('payment_issue') }}
                <router-link to="/service" class="text-primary underline">{{ $t('contact') }}</router-link>
            </h3>
        </div>
    </section>
</template>

<script>
import Input from '@/components/atoms/Input.vue'
import Card from '@/components/common/Card.vue'
import Error from '@/components/atoms/Error.vue'
import { mapGetters } from "vuex";
import Loading from '@/components/Loading.vue'

export default {
    components: { Error, Input, Card, Loading },
    data() {
        return {
            loading: false,
            submitLoading: false,
            paymentAmount: null,
            realPaymentId: null,
            screenshot: null,
            selectedBankType: null,
            selectedBankAccount: null,
            selectedMinAmount: null,
            selectedMaxAmount: null,
            paymentAccounts: [],
            errors: {}
        }
    },
    computed: mapGetters(["user", "token"]),
    watch: {
        paymentAmount() {
            this.errors['amount'] = null
            this.errors['min_amount'] = null
            this.errors['max_amount'] = null
        },
        // realPaymentId() {
        //     this.errors['real_payment_id'] = null
        // }
    },
    methods: {
        handleSelectBankAccount(account) {
            this.selectedBankAccount = account.id
            this.selectedMinAmount = account.min_amount
            this.selectedMaxAmount = account.max_amount
        },
        // handleScreenshotUpload(event) {
        //     const file = event.target.files[0];
        //     this.screenshot = file || null;
        // },
        async submit() {
            this.errors = {};

            if (!this.paymentAmount) {
                this.errors['amount'] = this.$t('enter_amount');
            }
            // if (!this.screenshot) {
            //     this.errors['screenshot'] = this.$t('payment_screenshot');
            // }
            if (this.paymentAmount && this.paymentAmount < this.selectedMinAmount) {
                this.errors['min_amount'] = `အနည်းဆုံးလွှဲနိုင်သောပမာဏမှာ ${this.selectedMinAmount} ဖြစ်သည်။`;
            }
            if (this.paymentAmount && this.paymentAmount > this.selectedMaxAmount) {
                this.errors['max_amount'] = `အများဆုံးလွှဲနိုင်သောပမာဏမှာ ${this.selectedMaxAmount} ဖြစ်သည်။`;
            }

            if (Object.keys(this.errors).length > 0) return;

            try {
                this.submitLoading = true;
                const formData = new FormData();
                formData.append('amount', this.paymentAmount);
                formData.append('bank_type_id', this.selectedBankType);
                formData.append('bank_account_id', this.selectedBankAccount);
                formData.append('real_payment_id', this.realPaymentId);
                // if (this.screenshot) formData.append('screenshot', this.screenshot);

                const res = await this.$axios.post(`/auth/users/${this.user.id}/top-up`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.$router.push({ path: '/deposit-waiting', query: { uuid: res.data.data.uuid } });
            } catch (e) {
                this.submitLoading = false;
                if (e.response?.data?.errors) {
                    for (const field in e.response.data.errors) {
                        e.response.data.errors[field].forEach(msg => {
                            this.$EventBus.emit('show-toast', { severity: 'error', detail: msg, life: 2000 });
                        });
                    }
                } else {
                    this.$EventBus.emit('show-toast', {
                        severity: 'error',
                        detail: e.response?.data?.message || 'Something went wrong',
                        life: 2000
                    });
                }
            }
        },
        async fetchBankAccounts() {
            this.loading = true;
            const response = await this.$axios.post("/auth/payment/adminbankaccounts", {
                bankType: this.selectedBankType
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            this.loading = false;
            this.paymentAccounts = response.data.bankAccounts;
            this.selectedBankAccount = response.data.bankAccounts[0]?.id ?? null;
            this.selectedMinAmount = response.data.bankAccounts[0]?.min_amount ?? null;
            this.selectedMaxAmount = response.data.bankAccounts[0]?.max_amount ?? null;
        }
    },
    mounted() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.selectedBankType = urlParams.get('type');
        this.fetchBankAccounts();
    }
}
</script>
