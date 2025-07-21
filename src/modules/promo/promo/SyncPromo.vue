<template>
  <div class="h-screen space-y-3 p-3 appWidth">
    <div class="px-2 mb-8">
      <div
        class="relative w-full aspect-square overflow-hidden rounded-lg mt-2"
        v-for="(promo, n) in promos"
        :key="n"
      >
        <img
          :src="promo.image"
          class="absolute top-0 left-0 w-full h-full object-cover"
          alt="promo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      promos: [],
      loading: false,
      tab: 'tab1'
    }
  },
  mounted() {
    this.fetchPromos()
  },
  methods: {
    selectTab(tabName) {
      this.tab = tabName
    },
    async fetchPromos() {
      this.loading = true
      try {
        const res = await axios.get('/promo/lists')
        this.promos = res.data || []
      } catch (error) {
        console.error('Failed to fetch promos:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
