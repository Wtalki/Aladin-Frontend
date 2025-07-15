<template>
    <div class="h-screen  space-y-3 p-3 appWidth">
       <div class="px-2 mb-8">
         <div class="relative w-full aspect-square overflow-hidden rounded-lg mt-2" v-for="(promo,n) in promos" :key="n" >
            <img
                :src="promo.image"
                class="absolute top-0 left-0 w-full h-full object-cover"
                alt=""
                />
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
