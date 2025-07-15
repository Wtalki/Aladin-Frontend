<template>
    <div class="h-auto  space-y-3 p-3 appWidth">
       <div class="px-2 mb-8">
         <div class="relative w-full aspect-square overflow-hidden rounded-lg mt-2" v-for="n in 3" :key="n" >
            <img
                src="@/assets/images/webp/promo2.webp"
                class="absolute top-0 left-0 w-full h-full object-cover"
                alt=""
                />
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
