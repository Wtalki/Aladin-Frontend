<template>
    <section class="mx-auto space-y-5 p-5 !pb-32 w-full">
        <WalletCard />
        <div class="bg-light p-5 rounded-md shadow-md flex justify-between items-center">
            <Button type="link" route="/deposit"
                class="flex flex-col items-center text-sm text-primary font-semibold cursor-pointer">
                <div class="bg-secondary rounded-full !w-12 !h-12 flex justify-center items-center">
                    <img class="!w-7 !h-7" :src="require('@/assets/icons/wallet_topup.png')" />
                </div>
                {{ $t('deposit') }}
            </Button>
            <Button type="link" route="/withdraw"
                class="flex flex-col items-center text-sm text-primary font-semibold cursor-pointer">
                <div class="bg-secondary rounded-full !w-12 !h-12 flex justify-center items-center">
                    <img class="!w-7 !h-7" :src="require('@/assets/icons/wallet_withdraw.png')" />
                </div>
                {{ $t('withdraw') }}
            </Button>
            <Button type="link" to="/payment-history"
                class="flex flex-col items-center text-sm text-primary font-semibold cursor-pointer">
                <div class="bg-secondary rounded-full !w-12 !h-12 flex justify-center items-center">
                    <img class="!w-7 !h-7" :src="require('@/assets/icons/transaction_history.png')" />
                </div>
                {{ $t('history') }}
            </Button>
        </div>
        <div
            class="p-4 !bg-primary rounded-md font-semibold shadow-md text-white border border-3 !border-gold flex flex-col space-y-3">
            <h1>{{ $t('topup_instructions.title') }}</h1>
            <span>{{ $t('topup_instructions.step_1') }}</span>
            <span>{{ $t('topup_instructions.step_2') }}</span>
            <span>{{ $t('topup_instructions.step_3') }}</span>
        </div>
        <a href="https://youtube.com/shorts/cen5Z2YrPP4?si=tSaCTMgKLiFzB7gg" target="blank"
            class="p-2 !bg-primary cursor-pointer rounded-md font-semibold shadow-md text-white border border-3 !border-gold flex items-center space-x-3">
            <img src="@/assets/images/webp/youtube.webp" width="30" alt="Telegram" />
            <span>{{ $t('topup_instructions.how_to_topup') }}</span>
        </a>
        <div
            class="p-4 !bg-primary rounded-md font-semibold shadow-md text-white border border-3 !border-gold flex flex-col space-y-3">
            <h1>{{ $t('withdraw_instructions.title') }}</h1>
            <span>{{ $t('withdraw_instructions.step_1') }}</span>
            <span>{{ $t('withdraw_instructions.step_2') }}</span>
        </div>
        <a href="https://youtube.com/shorts/I7nLF4m-5_M?si=AB69joJtDlz52-a2" target="blank"
            class="p-2 !bg-primary cursor-pointer rounded-md font-semibold shadow-md text-white border border-3 !border-gold flex items-center space-x-3">
            <img src="@/assets/images/webp/youtube.webp" width="30" alt="Telegram" />
            <span>{{ $t('withdraw_instructions.how_to_withdraw') }}</span>
        </a>
    </section>
</template>

<script>
import WalletCard from '@/components/molecules/WalletCard.vue'
import Button from '@/components/atoms/Button.vue'

export default {
    components: {
        Button,
        WalletCard
    }
}
</script>
