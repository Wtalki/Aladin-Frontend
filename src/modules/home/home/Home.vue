<template>
    <div class="relative">
        <ProfileBar />
        <div class="absolute modalWidth mx-auto top-20 left-0 right-0 shadow-lg" v-if="token">
            <WalletCard />
        </div>
    </div>
    <section class="space-y-3 p-3 mt-14 min-h-screen overflow-y-auto" :class="token ? 'mt-14' : 'mt-0'">
        <HomeCarousal />
        <Announcement />

        <div class="flex items-center gap-3">
            <router-link to="/twod" class="!bg-primary rounded-lg p-3 flex justify-center items-center cursor-pointer">
                <img :src="require('@/assets/images/svg/2D.svg')" class="!w-16 relative" />
            </router-link>
            <router-link to="/threed"
                class="!bg-primary rounded-lg p-3 flex justify-center items-center cursor-pointer">
                <img :src="require('@/assets/images/svg/3D.svg')" class="!w-16 relative" />
            </router-link>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileBar from '@/components/molecules/ProfileBar.vue'
import WalletCard from '@/components/molecules/WalletCard.vue'
import HomeCarousal from '@/components/molecules/HomeCarousal.vue'
import Announcement from '@/components/molecules/Announcement.vue'
export default {
    components: {
        ProfileBar,
        WalletCard,
        HomeCarousal,
        Announcement
    },
    computed: {
        ...mapGetters(["token"]),
    },
}
</script>
