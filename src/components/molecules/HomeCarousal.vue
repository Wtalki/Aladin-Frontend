<template>
    <swiper :modules="modules" :slides-per-view="1" :space-between="30" :centeredSlides="true" :autoplay="{
        delay: 2000,
        disableOnInteraction: true
    }" :pagination="{ clickable: true }">
       <swiper-slide>
        <div class="w-[100%] h-[200px] relative p-1 rounded-lg overflow-hidden">
            <img
            src="@/assets/images/webp/banner2.jpg"
            class="  w-[100%] h-full object-cover shadow-md rounded-lg cursor-pointer"
            alt="banner1"
            />
        </div>
        </swiper-slide>

        <swiper-slide>
        <div class="w-[100%] h-[200px] relative p-1  rounded-lg overflow-hidden">
            <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/source/ad858352683347.591968d3be907.jpg"
            class=" top-0 left-0 w-full h-full object-cover rounded-lg cursor-pointer shadow-md"
            alt="banner2"
            />
        </div>
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
