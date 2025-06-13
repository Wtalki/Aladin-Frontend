<template>
    <section class="space-y-3 p-5 pb-40 h-[120vh]">
        <h1 class="text-center text-lg text-light font-semibold">
            ငွေထုတ်မှတ်တမ်းအသေးစိတ်
        </h1>

        <div v-if="transaction" class="text-light flex flex-col space-y-3">
            <div class="flex flex-col space-y-2 justify-center items-center">
                <img v-if="transaction?.bank_account" :src="transaction?.bank_account.bank_type.image"
                    class="w-20 h-20 rounded-md cursor-pointer" />
                <p class="font-bold">{{ transaction?.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB') }}</p>
                <h1 :class="[
                    transaction.status == 'approved'
                        ? '!text-green-500'
                        : transaction.status == 'rejected'
                            ? '!text-red-500'
                            : '!text-yellow-500',
                    'font-bold text-center',
                ]">
                    {{
                        transaction.status == "approved"
                            ? $t('transaction_successful')
                            : transaction.status == "rejected"
                                ? $t('transaction_rejected')
                                : $t('checking_transaction')
                    }}
                </h1>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ဘောင်ချာအိုင်ဒီ</span>
                <span>{{ transaction?.uuid }}</span>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ထုတ်ခဲ့သည့်ရက်စွဲ / အချိန်</span>
                <span>{{
                    $formatDate(transaction?.created_at, null, "DD-MM-YYYY HH:mm A")
                }}</span>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">လုပ်ဆောင်မှုအမျိုးအစား</span>
                <span>ငွေထုတ်မှတ်တမ်း</span>
            </div>
            <div v-if="transaction?.bank_account"
                class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ငွေထုတ်အကောင့်</span>
                <div class="flex flex-col">
                    <span>{{ transaction?.bank_account.acc_name }}</span>
                    <span>{{ transaction?.bank_account.acc_number }}</span>
                </div>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ငွေပမာဏ</span>
                <span>{{ transaction?.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB') }}</span>
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "@/components/Loading.vue";

export default {
    components: {
        Loading,
    },
    inject: ["$formatDate"],
    data() {
        return {
            transaction: null,
        };
    },
    computed: mapGetters(["token", "user"]),
    methods: {
        async getTopupDetail(transactionId) {
            const response = await this.$axios.get(
                `/auth/out-transactions/${transactionId}/detail`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token} `,
                    },
                }
            );
            this.transaction = response.data;
        },
    },
    mounted() {
        const transactionId = this.$route.params.uuid;
        this.getTopupDetail(transactionId);
    },
};
</script>
