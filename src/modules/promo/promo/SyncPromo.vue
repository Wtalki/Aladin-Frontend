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

export default {
    components: {
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
