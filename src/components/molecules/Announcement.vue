<template>
    <nav class="flex items-center justify-between pl-3 border rounded-md border-gold">
        <img :src="require('@/assets/icons/announcement.webp')" alt="speaker" class="w-[20px]" />
        <div class="flex items-center px-3">
            <marquee :class="marqueeStyle" class="text-sm text-primary md:text-md" style="font-family: lato"
                scrolldelay="100" scrollamount="3" onmouseover="this.stop();" onmouseout="this.start();">
                မြန်မာနိုင်ငံအနှံ့ကိုယ်စားလှယ်အလိုရှိသည်။အရေအတွက်ကန့်သတ်ထားပါသည်။စိတ်ဝင်စားသောမိတ်ဆွေများဖုန်းကိုဆက်သွယ်လိုက်ပါ။
                09123456789</marquee>
        </div>
        <div class="py-1 md:py-2 text-[13px] px-3 rounded-md bg-gold">
            ALADIN
        </div>
    </nav>
</template>

<script setup>
import { defineProps } from 'vue'
// import DownloadIcon from '@/components/icons/DownloadIcon.vue'

defineProps({
    marqueeStyle: {
        type: String,
        default: 'text-light'
    }
})
</script>

<style>
@keyframes marquee {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(-100%);
    }
}

.animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 10s linear infinite;
}
</style>
