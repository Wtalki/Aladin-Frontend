<template>
    <section class="flex justify-between items-start p-3" :class="token ? 'h-[100px]' : 'h-auto'">
        <div class="flex items-center">
            <div v-if="user" class="flex items-center">
                <img :src="user.profile" class="!w-12 !h-12 border rounded-full mr-2" />
                <div class="flex flex-col text-sm font-semibold text-primary">
                    <span class="text-xl">{{ user.name }}</span>
                    <span>{{ user.phone }}</span>
                </div>
            </div>
            
            <div v-else class="flex items-center">
                <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    class="!w-10 border rounded-full mr-2" />
                <Button type="link" route="/login" className="py-1 px-2 bg-gold text-primary font-semibold rounded-md">
                    အကောင့်ဝင်ပါ </Button>
            </div>
        </div>
        <div v-if="user" class="p-2 rounded-lg bg-secondary text-light flex items-center space-x-2">
                <div>{{ user.region == 'my' ? $t('MMK') : $t('THB') }} {{ user.wallet }}</div>
                <router-link to="/deposit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current !h-6 !w-6 text-light cursor-pointer"
                        viewBox="0 0 448 512">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                    </svg>
                </router-link>
            </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from '@/components/atoms/Button.vue'

export default {
    components: {
        Button,
     
    },
    computed: mapGetters(['user', 'token'])
}
</script>
