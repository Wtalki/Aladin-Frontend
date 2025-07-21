<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="30"
    :centeredSlides="true"
    :autoplay="{ delay: 2000, disableOnInteraction: true }"
    :pagination="{ clickable: true }"
  >
    <!-- Static fallback slide -->
    <swiper-slide v-if="bannerLists.length === 0">
      <div class="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500">
        No banners available
      </div>
    </swiper-slide>

    <!-- Dynamic slides -->
    <swiper-slide
      v-for="(banner, index) in bannerLists"
      :key="index"
    >
      <div class="w-[100%] h-[200px] relative p-1 rounded-lg overflow-hidden">
        <img
          :src="banner.image"
          class="w-full h-full object-cover shadow-md rounded-lg cursor-pointer"
          alt="banner"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ref, onMounted } from 'vue'
import axios from 'axios' // ✅ Fix: import axios
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
    const bannerLists = ref([])
    const modules = [Navigation, Pagination, Autoplay]

    const fetchBanners = async () => {
      try {
        const res = await axios.get('/banner/lists')
        bannerLists.value = res.data || []
      } catch (error) {
        console.error('Failed to fetch banners:', error)
      }
    }

    onMounted(() => {
      fetchBanners()
    })

    return {
      modules,
      bannerLists
    }
  }
}
</script>
