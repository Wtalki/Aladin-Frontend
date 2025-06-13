<template>
    <section class="space-y-3 p-5 h-[120vh] overflow-y-scroll">
        <h1 class="text-center text-lg text-light font-semibold">
            ငွေဖြည့်မှတ်တမ်းအသေးစိတ်
        </h1>

        <div v-if="topup" class="text-light flex flex-col pb-20 space-y-3">
            <div class="flex flex-col space-y-2 justify-center items-center">
                <img v-if="topup.bank_type" :src="topup.bank_type?.image"
                    class="w-20 h-20 object-cover rounded-md cursor-pointer" />
                <p class="font-bold">{{ topup?.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB') }}</p>
                <h1 :class="[
                    topup.status === 'approved'
                        ? '!text-green-500'
                        : topup.status === 'rejected'
                            ? '!text-red-500'
                            : '!text-yellow-500',
                    'font-bold text-center',
                ]">
                    {{
                    topup.status === "approved"
                    ? $t('transaction_successful')
                    : topup.status === "rejected"
                    ? $t('transaction_rejected')
                    : $t('checking_transaction')
                    }}
                </h1>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ဘောင်ချာအိုင်ဒီ</span>
                <span>{{ topup?.uuid }}</span>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ငွေပမာဏ</span>
                <span>{{ topup?.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB') }}</span>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">လွှဲခဲ့သည့်ရက်စွဲ / အချိန်</span>
                <span>{{
                    $formatDate(topup?.created_at, null, "DD-MMM-YYYY HH:mm A")
                    }}</span>
            </div>
            <div class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">လုပ်ဆောင်မှုအမျိုးအစား</span>
                <span>ငွေဖြည့်မှတ်တမ်း</span>
            </div>
            <div v-if="topup.bank_type" class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ငွေပေးချေမှုဘဏ်အမျိုးအစား</span>
                <span>{{ topup.bank_type?.name }}</span>
            </div>
            <div v-if="topup.bank_account" class="text-sm flex justify-between items-center border-b border-b-gray p-3">
                <span class="font-semibold">ငွေပေးချေခဲ့သည့်အကောင့်</span>
                <div class="flex flex-col">
                    <span>{{ topup.bank_account?.acc_name }}</span>
                    <span>{{ topup.bank_account?.acc_number }}</span>
                </div>
            </div>
            <div v-if="topup.screenshot" class="text-sm flex flex-col items-start space-y-3 p-3">
                <span class="font-semibold">ငွေလွှဲပြေစာ</span>
                <img :src="topup.screenshot" class="w-full">
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
            setPaymentTab: true,
            topup: null,
        };
    },
    computed: mapGetters(["token", "user"]),
    methods: {
        async getTopupDetail(topupUuid) {
            const response = await this.$axios.get(
                `/auth/top-ups/${topupUuid}/detail`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token} `,
                    },
                }
            );
            this.topup = response.data;
        },
    },
    mounted() {
        const topupUuid = this.$route.params.uuid;
        this.getTopupDetail(topupUuid);
    },
};
</script>
