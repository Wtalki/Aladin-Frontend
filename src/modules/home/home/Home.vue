<template>
    <div class="relative">
        <ProfileBar />
        <div class="absolute modalWidth mx-auto top-20 left-0 right-0 shadow-lg" v-if="token">
            <WalletCard />
        </div>
    </div>
    <section class="space-y-3 p-3 mt-14 min-h-[120vh] overflow-y-scroll" :class="token ? 'mt-14' : 'mt-0'">
        <HomeCarousal />
        <Announcement />
        <HomeCategory />
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileBar from '@/components/molecules/ProfileBar.vue'
import WalletCard from '@/components/molecules/WalletCard.vue'
import HomeCarousal from '@/components/molecules/HomeCarousal.vue'
import HomeCategory from './HomeCategory.vue'
import Announcement from '@/components/molecules/Announcement.vue'
export default {
    components: {
        ProfileBar,
        WalletCard,
        HomeCarousal,
        Announcement,
        HomeCategory
    },
    computed: {
        ...mapGetters(["token"]),
    },
}
</script>
