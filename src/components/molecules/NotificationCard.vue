<template>
    <section v-if="notification.data.type == 'user_topup_approved'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <TopupIcon class="text-success w-6 h-6" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">သင့်ငွေဖြည့်သွင်းမှုကိုအတည်ပြုခဲ့သည်။သင့်ပိုက်ဆံအိတ်ကိုစစ်ဆေးပါ</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-sm text-gray-500">
                ငွေပမာဏ :
                <span class="font-bold">{{ notification.data.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB')
                    }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>

    <section v-if="notification.data.type == 'user_topup_rejected'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <TopupIcon class="text-danger w-6 h-6" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">သင့်ငွေပေးချေမှုကိုပယ်ချခဲ့ပါသည်။အကြောင်းအရာကိုစစ်ဆေးပါ။</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-danger text-sm">
                {{ notification.data?.note }}
            </p>
            <p class="text-sm text-gray-500">
                ငွေပမာဏ :
                <span class="font-bold">{{ notification.data.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB')
                    }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>

    <section v-if="notification.data.type == 'user_withdraw_approved'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <TopupIcon class="text-success w-6 h-6" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">သင့်ငွေထုတ်ခြင်းကိုအတည်ပြုခဲ့သည်။သင့်ပိုက်ဆံအိတ်ကိုစစ်ဆေးပါ</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-sm text-gray-500">
                ငွေပမာဏ :
                <span class="font-bold">{{ notification.data.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB')
                    }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>

    <section v-if="notification.data.type == 'user_withdraw_rejected'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <TopupIcon class="text-danger w-6 h-6" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">သင့်ငွေထုတ်ခြင်းကိုပယ်ချခဲ့ပါသည်။အကြောင်းအရာကိုစစ်ဆေးပါ။</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-danger text-sm">
                {{ notification.data?.note }}
            </p>
            <p class="text-sm text-gray-500">
                ငွေပမာဏ :
                <span class="font-bold">{{ notification.data.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB')
                    }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>

    <section v-if="notification.data.type == 'user_threed_win'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <img :src="require('@/assets/icons/badge.png')" class="w-7 h-7" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">ဂုဏ်ယူပါတယ်🎉🎉🎉သုံးလုံးထီနံပတ် <span class="text-success">{{
                        notification.data.number }}</span>
                    အတွက်သင်အနိုင်ရရှိခဲ့ပါသည်။</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-sm text-gray-500">
                အနိုင်ရငွေပမာဏ :
                <span class="font-bold">{{ notification.data.compensationAmount }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>

    <section v-if="notification.data.type == 'threed_refund'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <img :src="require('@/assets/icons/refund.png')" class="w-7 h-7" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">စိတ်မကောင်းပါဘူး။ထီနံပတ် <span class="text-success">{{
                        notification.data.number }}</span> အတွက်ငွေပြန်အမ်းခဲ့ပါသည်။အကြောင်းအရာကိုစစ်ဆေးပါ။</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-danger text-sm">
                {{ notification.data?.note }}
            </p>
            <p class="text-sm text-gray-500">
                ပြန်အမ်းငွေပမာဏ :
                <span class="font-bold">{{ notification.data.amount }} {{ user.region == 'my' ? $t('MMK') : $t('THB')
                    }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>

    <section v-if="notification.data.type == 'user_twod_win'" class="flex items-start">
        <div class="basis-[12%] flex justify-center">
            <img :src="require('@/assets/icons/badge.png')" class="w-7 h-7" />
        </div>
        <div class="basis-[88%] relative text-left">
            <div class="flex items-center justify-between">
                <p class="text-md font-semibold">ဂုဏ်ယူပါတယ်🎉🎉🎉နှစ်လုံးထီနံပတ် <span class="text-success">{{
                        notification.data.number }}</span>
                    အတွက်သင်အနိုင်ရရှိခဲ့ပါသည်။</p>
                <p class="text-xs font-medium text-gray-500">
                    {{ $formatDate(notification.created_at) }}
                </p>
            </div>
            <p class="text-sm text-gray-500">
                အနိုင်ရငွေပမာဏ :
                <span class="font-bold">{{ notification.data.compensationAmount }}</span>
            </p>
            <div v-if="notification.read_at === null"
                class="absolute right-0 !w-2 !h-2 rounded-full bg-danger top-[50%]">
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import TopupIcon from "@/components/icons/TopupIcon.vue";

export default {
    components: {
        TopupIcon,
    },
    props: {
        notification: {
            type: Object
        }
    },
    inject: ["$formatDate"],
    computed: mapGetters(["user"])
}
</script>
