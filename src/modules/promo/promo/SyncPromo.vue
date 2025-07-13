<template>
    <div class="h-auto  space-y-3 p-3 appWidth">
       <div class="px-2 mb-8">
         <div class="w-full shadow-lg gap-2 mt-2 rounded-2xl" v-for="n in 3" :key="n">
            <img src="@/assets/images/webp/promo.webp" class="rounded-2xl h-[400px] w-full"  alt="">
        </div>
       </div>
    </div>
</template>
<script>
import promo3 from '@/assets/images/webp/promo3.jpg'
// import promo4 from '@/assets/images/webp/promo4.jpg'
// import banner1 from '@/assets/images/webp/banner1.jpg'
export default {
    components: {
    },
    data() {
        return {
            promos: [
        { image: promo3 },
        // { image: promo4 },
        // { image: banner1 }
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
