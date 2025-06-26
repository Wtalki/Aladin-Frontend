<template>
    <section class="space-y-5 h-[120vh] overflow-y-scroll p-5">
        <h1 class="text-center text-lg text-primary font-semibold">{{ $t('withdraw') }}</h1>
        <ul class="text-gold space-y-3">
            <li>{{ $t('select_withdraw_account') }}</li>
            <li>{{ $t('add_bank_accounts_instruction') }}</li>
        </ul>
        <Button type="link" route="/set-payment-accounts"
            class="cursor-pointer !w-8 !h-8 rounded-full p-1 flex justify-center items-center bg-gold mx-auto">
            <PlusIcon />
        </Button>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else class="space-y-3">
            <Card class="rounded-md cursor-pointer shadow-md bg-white !p-2 flex justify-between items-center space-x-5"
<<<<<<< HEAD
                :class="selectedAccount === account?.id ? '!bg-secondary border border-3 border-light' : 'bg-primary'"
=======
                :class="selectedAccount === account?.id ? '!bg-secondary border border-3 border-light' : '[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)]'"
>>>>>>> 032a9fb (change color)
                v-for="(account, index) in accounts" :key="index" @click="selectedAccount = account?.id">
                <div class="flex justify-center space-x-2 font-semibold items-center">
                    <img :src="account.banktype.image" :alt="account.type?.toUpperCase()"
                        class="w-16 rounded-md cursor-pointer" />
                    <div class="flex flex-col font-semibold space-y-3 text-primary">
                        <span>{{ $t('account_name') }} : {{ account.acc_name }}</span>
                        <span>{{ $t('account_number') }} : {{ account.acc_number }}</span>
                        <span>{{ $t('min_withdraw_amount') }} : {{ account.min_amount }}</span>
                        <span>{{ $t('max_withdraw_amount') }} : {{ account.max_amount }}</span>
                    </div>
                </div>
            </Card>
        </div>

        <form v-if="selectedAccount" @submit="
            (e) => {
                e.preventDefault()
                submitHandler()
            }
        " class="space-y-3">
            <Input @change="(e) => (amount = e.target.value)"
                class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                :placeholder="$t('enter_amount')" />
            <Input @change="(e) => (password = e.target.value)"
                class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                :placeholder="$t('enter_login_password')" />
            <button :disabled="submitLoading" type="submit"
                class="flex items-center justify-center w-full py-2 mt-4 font-semibold text-black transition-all rounded-lg bg-gold">
                <div v-if="submitLoading" class="flex items-center justify-center">
                    <div>
                        <svg class="w-8 h-8 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    </div>
                    <div>{{ $t('submitting') }}</div>
                </div>
                <div v-else>
                    <span>{{ $t('submit') }}</span>
                </div>
            </button>
        </form>
        <h3 class="text-center font-semibold text-danger mt-5">
            {{ $t('withdraw_issue') }} <router-link to="/service" class="text-gold underline">{{ $t('contact')
                }}</router-link>
        </h3>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import Card from '@/components/common/Card.vue'
import Loading from '@/components/Loading.vue'
import EventBus from '@/libs/AppEventBus'
import PlusIcon from "@/components/icons/PlusIcon.vue";

export default {
    components: {
        Input,
        Button,
        Card,
        Loading,
        PlusIcon
    },
    data() {
        return {
            accounts: [],
            selectedAccount: null,
            openDeleteModal: false,
            isLoading: false,
            amount: 0,
            password: null,
            submitLoading: false
        }
    },
    computed: mapGetters(["user", "token"]),
    methods: {
        ...mapActions(["getUser"]),
        nextStep(uuid) {
            this.$router.push({
                path: '/withdraw-waiting',
                query: { uuid: uuid }
            })
        },
        async getBankAccounts() {
            this.isLoading = true
            const response = await this.$axios.get(
                `/auth/users/${this.user?.id}/bankaccounts`,
                {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            this.accounts = response.data.accounts;
            this.selectedAccount = response.data.accounts[0]?.id ?? null;
            this.isLoading = false
        },
        async submitHandler() {
            const selected = this.accounts.find(acc => acc?.id === this.selectedAccount);
            if (!selected) return;

            const min = selected.min_amount;
            const max = selected.max_amount;

            if (!this.amount || this.amount < min) {
                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: `Minimum withdraw amount is ${min}`,
                    life: 2000
                });
                return;
            }

            if (this.amount > max) {
                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: `Maximum withdraw amount is ${max}`,
                    life: 2000
                });
                return;
            }

            try {
                this.submitLoading = true;
                const response = await this.$axios.post(
                    '/auth/withdraws/create',
                    {
                        selectedAccount: this.selectedAccount,
                        amount: this.amount,
                        password: this.password
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + this.token
                        }
                    }
                )
                if (response.status === 200) {
                    await this.getUser({ token: this.token });
                    EventBus.emit('show-toast', {
                        severity: 'info',
                        summary: '',
                        detail: response.data.message,
                        life: 2000
                    })
                    this.submitLoading = false;
                    this.nextStep(response.data.withdraw.uuid);
                }
            } catch (e) {
                if (e.response?.data?.errors) {
                    const firstKey = Object.keys(e.response.data.errors)[0];
                    const firstMsg = e.response.data.errors[firstKey][0];

                    EventBus.emit('show-toast', {
                        severity: 'error',
                        summary: '',
                        detail: firstMsg,
                        life: 2000
                    });
                }
                this.submitLoading = false;
            }
        }
    },
    mounted() {
        this.getBankAccounts();
    }
}
</script>
