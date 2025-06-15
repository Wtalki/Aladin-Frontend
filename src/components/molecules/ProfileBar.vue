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
        <div>
            <AppLocale />
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from '@/components/atoms/Button.vue'
import AppLocale from '@/layouts/default/AppLocale.vue'

export default {
    components: {
        Button,
        AppLocale
    },
    computed: mapGetters(['user', 'token'])
}
</script>
