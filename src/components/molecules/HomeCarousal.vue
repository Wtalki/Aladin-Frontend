<template>
    <swiper :modules="modules" :slides-per-view="1" :space-between="30" :centeredSlides="true" :autoplay="{
        delay: 2000,
        disableOnInteraction: true
    }" :pagination="{ clickable: true }">
        <swiper-slide>
            <img src="@/assets/images/webp/banner1.jpg"
                class="shadow-md cursor-pointer rounded-lg object-cover w-full h-[200px]" />
        </swiper-slide>
        <swiper-slide>
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/source/ad858352683347.591968d3be907.jpg"
                class="shadow-md cursor-pointer rounded-lg object-cover w-full h-[200px]" />
        </swiper-slide>
    </swiper>
</template>
<script>
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay]
        }
    }
}
</script>
