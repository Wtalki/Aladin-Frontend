<template>
    <div class="h-screen  space-y-3 p-3 appWidth">
        <nav class="custom-tabs w-100 text-center">
            <div :class="['tab-item', { 'active-tab': tab === 'tab1' }]" @click="selectTab('tab1')">{{ $t('service_phone_numbers') }}</div>
            <div :class="['tab-item', { 'active-tab': tab === 'tab2' }]" @click="selectTab('tab2')">{{ $t('official_channels') }}</div>
        </nav>

        <div class="w-100">
            <div v-if="tab == 'tab1'" class="mt-4 flex flex-col items-center justify-center">
                <p class="text-lg text-center text-gray-700">{{ $t('service_description') }}</p>

                <div v-for="(contact, index) in contacts" :key="index" class="border-2 rounded-2xl p-3 flex justify-center items-center w-[350px] mt-4 bg-primary !border-primary shadow-md">
                    <a v-if="contact.phone" :href="'tel:' + contact.phone" class="text-xl font-bold tracking-wider text-light">{{ contact.phone }}</a>
                    <div class="flex items-center gap-2">
                        <a v-if="contact.telegram" :href="contact.telegram" target="blank" class="transition-transform hover:scale-110">
                            <img src="@/assets/images/webp/telegram.webp" width="30" alt="Telegram" />
                        </a>
                        <!-- <a v-if="contact.viber" :href="contact.viber" target="blank" class="transition-transform hover:scale-110">
                            <img src="@/assets/images/svg/viber.svg" width="35" alt="Viber" />
                        </a>
                        <a v-if="contact.line" :href="contact.line" target="blank" class="transition-transform hover:scale-110">
                            <img src="@/assets/icons/line.png" width="30" alt="Line" />
                        </a> -->
                    </div>
                </div>

                <div v-if="loading" class="mt-6 text-lg text-center text-gray-700">Loading contacts...</div>
            </div>
            <div v-if="tab == 'tab2'" class="mt-4 flex flex-col items-center justify-center">
                <p class="text-lg text-center text-gray-700">{{ $t('official_channel_info') }}</p>

                <div class="mt-4 space-y-3">
                    <div class="flex  sm:flex-row gap-3 w-full">
                        <div class="flex-1 flex items-center gap-3 px-4 py-2 bg-primary border border-primary rounded-2xl shadow hover:shadow-lg transition-all duration-200">
                        <img src="@/assets/images/webp/facebook.webp" width="30" alt="Facebook" />
                        <a href="https://www.facebook.com/share/1G6f1VKyLY/" target="_blank" class="text-sm font-medium text-white">Facebook</a>
                        </div>
                        <div class="flex-1 flex items-center gap-3 px-4 py-2 bg-primary border border-primary rounded-2xl shadow hover:shadow-lg transition-all duration-200">
                        <img src="@/assets/images/svg/viber.svg" width="30" alt="Viber" />
                        <a href="https://www.youtube.com/@LottoMM2D" target="_blank" class="text-sm font-medium text-white">Viber</a>
                        </div>
                    </div>

                    <div class="flex  sm:flex-row gap-3 w-full">
                        <div class="flex-1 flex items-center gap-3 px-4 py-2 bg-primary border border-primary rounded-2xl shadow hover:shadow-lg transition-all duration-200">
                        <img src="@/assets/images/svg/tiktok.svg" width="30" alt="TikTok" />
                        <a href="https://www.youtube.com/@LottoMM2D" target="_blank" class="text-sm font-medium text-white">TikTok</a>
                        </div>
                        <div class="flex-1 flex items-center gap-3 px-4 py-2 bg-primary border border-primary rounded-2xl shadow hover:shadow-lg transition-all duration-200">
                        <img src="@/assets/images/webp/telegram.webp" width="30" alt="Telegram" />
                        <a href="https://t.me/aladinofficalchannel" target="_blank" class="text-sm font-medium text-white">Telegram Channel</a>
                        </div>
                    </div>
                    </div>

                <Loading v-if="loading" />
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Loading
    },
    data() {
        return {
            contacts: [
                {
                    // phone: '+959123456789',
                    telegram: 'https://t.me/aladincustomerservice',
                    viber: 'viber://chat?number=+'
                    // line: 'https://lin.ee/'
                }
            ],
            loading: false,
            tab: 'tab1'
        }
    },
    methods: {
        selectTab(tabName) {
            this.tab = tabName
        }
    }
}
</script>
