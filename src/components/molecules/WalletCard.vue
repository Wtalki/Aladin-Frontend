<template>
    <Card class="flex justify-between items-center !bg-light font-bold">
        <div class="flex">
            <WalletIcon class="mr-1 text-gold" />
            <span class="text-gold">{{ $t('Wallet') }}</span>
        </div>
        <div class="flex items-center" v-if="user">
            <div class="text-gold mr-1">{{ showWallet ? user.wallet : '****' }}</div>
            <EyeIcon v-if="!showWallet" @click="showWallet = true" />
            <EyeClose v-else @click="showWallet = false" />
        </div>
    </Card>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/common/Card.vue'
import WalletIcon from '@/components/icons/WalletIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeClose from '@/components/icons/EyeClose.vue'

export default {
    components: {
        Card,
        WalletIcon,
        EyeIcon,
        EyeClose
    },
    data() {
        return {
            showWallet: true
        }
    },
    computed: mapGetters(['user'])
}
</script>
