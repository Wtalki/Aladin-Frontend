<template>
    <div class="h-screen overflow-y-scroll space-y-3 p-3 appWidth">
        <nav class="custom-tabs w-100 text-center">
            <div :class="['tab-item', { 'active-tab': tab === 'tab1' }]" @click="selectTab('tab1')">{{
                $t('service_phone_numbers') }}</div>
            <div :class="['tab-item', { 'active-tab': tab === 'tab2' }]" @click="selectTab('tab2')">{{
                $t('official_channels') }}</div>
        </nav>

        <div class="w-100">
            <div v-if="tab == 'tab1'" class="mt-4 flex flex-col items-center justify-center">
                <p class="text-lg text-center text-gold">{{ $t('service_description') }}</p>

                <div v-for="(contact, index) in contacts" :key="index"
                    class="border-2 rounded p-3 flex justify-between items-center w-[350px] mt-4 !bg-primary !border-gold shadow-md">
                    <a v-if="contact.phone" :href="'tel:' + contact.phone"
                        class="text-xl font-bold tracking-wider text-light">{{ contact.phone }}</a>
                    <div class="flex items-center gap-2">
                        <a v-if="contact.telegram" :href="contact.telegram" target="blank"
                            class="transition-transform hover:scale-110">
                            <img src="@/assets/images/webp/telegram.webp" width="30" alt="Telegram" />
                        </a>
                        <a v-if="contact.viber" :href="contact.viber" target="blank"
                            class="transition-transform hover:scale-110">
                            <img src="@/assets/images/svg/viber.svg" width="35" alt="Viber" />
                        </a>
                        <a v-if="contact.line" :href="contact.line" target="blank"
                            class="transition-transform hover:scale-110">
                            <img src="@/assets/icons/line.png" width="30" alt="Line" />
                        </a>
                    </div>
                </div>

                <div v-if="loading" class="mt-6 text-lg text-center text-gold">Loading contacts...</div>
            </div>
            <div v-if="tab == 'tab2'" class="mt-4 flex flex-col items-center justify-center">
                <p class="text-lg text-center text-gold">{{ $t('official_channel_info') }}</p>

                <div
                    class="border-2 rounded p-3 flex justify-between items-center w-[350px] mt-4 !bg-primary !border-gold shadow-md">
                    <img src="@/assets/images/webp/facebook.webp" width="30" alt="Facebook" />
                    <a href="https://www.facebook.com/ALADINmm01" target="blank"
                        class="bg-gold p-2 rounded-lg cursor-pointer">{{ $t('follow_page') }}</a>
                </div>
                <div
                    class="border-2 rounded p-3 flex justify-between items-center w-[350px] mt-4 !bg-primary !border-gold shadow-md">
                    <img src="@/assets/images/webp/youtube.png" width="30" alt="Telegram" />
                    <a href="https://www.youtube.com/@LottoMM2D" target="blank"
                        class="bg-danger p-2 rounded-lg cursor-pointer">{{ $t('subscribe_channel') }}</a>
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
                    phone: '+959770340091',
                    telegram: 'https://t.me/lotto88mm',
                    viber: 'viber://chat?number=+959770340091',
                    line: 'https://lin.ee/VYpYXtG'
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
