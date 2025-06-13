<template>
    <section class="mb-4">
        <div
            class="flex justify-center items-center gap-2 border-r rounded-tr-lg rounded-tl-lg border-l border-gold bg-primary py-2">
            <img class="!w-10" :src="require('@/assets/images/svg/winner.svg')" />
            <h1 class="mb-2 text-xl font-semibold text-center text-gold">{{ $t('winners') }}</h1>
        </div>

        <swiper :modules="[Autoplay]" :direction="'vertical'" :slidesPerView="'auto'" :spaceBetween="6" :loop="true"
            :autoplay="{ delay: 1000, disableOnInteraction: false }" :freeMode="true" :grabCursor="true"
            class="px-2 py-1 h-[250px]">
            <swiper-slide v-for="(winner, n) in isLoading ? skeletonData : winnerList" :key="n"
                class="w-full transition-transform transform scale-0 animate-scale h-auto"
                :style="{ animationDelay: `${n * 100}ms` }">
                <div v-if="isLoading"
                    class="flex items-center justify-between w-full p-2 bg-gray-800 rounded shadow-md animate-pulse">
                    <div class="flex items-center gap-2">
                        <div class="bg-gray-700 rounded-full w-14 h-14"></div>
                        <div class="flex flex-col">
                            <span class="w-24 h-4 bg-gray-700 rounded"></span>
                            <span class="w-20 h-4 mt-1 bg-gray-700 rounded"></span>
                        </div>
                    </div>
                    <div class="w-16 h-8 bg-gray-700 rounded"></div>
                </div>

                <div v-else class="w-full p-2 rounded shadow-md bg-primary">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="flex items-center justify-center gap-2">
                                <img :src="winner.image" class="rounded-full" style="width: 2.5rem; height: 2.5rem"/>
                                <div>
                                    <span class="text-lg opacity-75">{{ winner.phone }}</span>
                                    <span class="text-xs font-thin line-clamp-1 text-warning"> {{ winner.amount }} {{
                                        $t('MMK') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <router-link v-if="winner.betType === '2D'" to="/twod/bet-select-time"
                                class="px-2 py-1 text-white transition-all duration-300 rounded-lg bg-gradient-to-tr from-green-400 to-yellow-400">{{
                                    $t('2D_Bet')
                                }}</router-link>
                            <router-link v-else to="/threed/bet"
                                class="px-2 py-1 text-white transition-all duration-300 rounded-lg bg-gradient-to-tr from-green-400 to-yellow-400">{{
                                    $t('3D_Bet')
                                }}</router-link>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

const winnerList = ref([])

function getRandomPhone() {
    const prefix = Math.floor(100 + Math.random() * 900)
    return `******${prefix}`
}

function getRandomAmount() {
    const firstTwoDigits = Math.floor(Math.random() * 89) + 11;
    const amount = firstTwoDigits * 10000;
    return amount.toLocaleString();
}

function getRandomBetType() {
    return Math.random() > 0.5 ? '2D' : '3D'
}

onMounted(() => {
    winnerList.value = Array.from({ length: 60 }, () => ({
        phone: getRandomPhone(),
        amount: getRandomAmount(),
        betType: getRandomBetType(),
        image: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    }))
})
</script>

<style scoped>
@keyframes scaleUp {
    from {
        transform: scale(0);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-scale {
    animation: scaleUp 0.3s ease-out forwards;
}

.swiper-slide {
    width: 100% !important;
}
</style>
