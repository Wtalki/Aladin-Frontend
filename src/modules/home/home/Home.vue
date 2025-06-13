<template>
    <div class="relative">
        <ProfileBar />
        <div class="absolute modalWidth mx-auto top-20 left-0 right-0 shadow-lg" v-if="token">
            <WalletCard />
        </div>
    </div>
    <section class="space-y-3 p-3 mt-14" :class="token ? 'mt-14' : 'mt-0'">
        <HomeCarousal />
        <Announcement />
        <router-link to="/twod"
            class="text-danger !bg-primary rounded-lg p-3 flex justify-between items-center cursor-pointer overflow-hidden relative">
            <img :src="require('@/assets/images/webp/2d_lottery.png')" class="absolute w-[900px] left-[0px]" alt="" />
            <div class="absolute w-[900px] h-[200px] bg-[#20202031] left-0 backdrop-blur-sm"></div>
            <img :src="require('@/assets/images/svg/2D.svg')" class="!w-16 relative" />
            <h1 class="text-xl font-semibold relative">{{ $t('2D_Lottery') }}</h1>
        </router-link>
        <router-link to="/threed"
            class="text-danger !bg-primary rounded-lg p-3 flex justify-between items-center cursor-pointer overflow-hidden relative">
            <img :src="require('@/assets/images/webp/2d_lottery.png')" class="absolute w-[900px] left-[0px]" alt="" />
            <div class="absolute w-[900px] h-[200px] bg-[#8b66215b] left-0 backdrop-blur-sm"></div>
            <img :src="require('@/assets/images/svg/3D.svg')" class="!w-16 relative" />
            <h1 class="text-xl font-semibold relative">{{ $t('3D_Lottery') }}</h1>
        </router-link>
        <LotteryGift />
        <Winners />
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileBar from '@/components/molecules/ProfileBar.vue'
import WalletCard from '@/components/molecules/WalletCard.vue'
import HomeCarousal from '@/components/molecules/HomeCarousal.vue'
import Announcement from '@/components/molecules/Announcement.vue'
import LotteryGift from '@/components/molecules/LotteryGift.vue'
import Winners from '@/components/molecules/Winners.vue'
export default {
    components: {
        ProfileBar,
        WalletCard,
        HomeCarousal,
        Announcement,
        LotteryGift,
        Winners
    },
    computed: {
        ...mapGetters(["token"]),
    },
}
</script>

<style lang="stylus" scoped>

</style>
