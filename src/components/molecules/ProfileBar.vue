<template>
    <section class="flex justify-between items-start p-3" :class="token ? 'h-[70px]' : 'h-auto'">
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
    <div>
        <!-- Toggle display between actual wallet and hidden mask -->
        {{ user.region == 'my' ? $t('MMK') : $t('THB') }}
        {{ showWallet ? user.wallet : '•••••' }}
    </div>
    <div @click.stop.prevent="toggleWallet">
    <svg
      v-if="showWallet"
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-light cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-light cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.642-4.243M9.88 9.88a3 3 0 104.243 4.243"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 3l18 18"
      />
    </svg>
  </div>
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
    computed: mapGetters(['user', 'token']),
    data() {
    return {
      showWallet: false
    }
  },
  methods: {
    toggleWallet() {
      this.showWallet = !this.showWallet
    }
  }
}
</script>
