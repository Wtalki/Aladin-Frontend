<template>
  <div class="p-4">
    <div v-for="game in gameLists" :key="game.id" class="mb-2 p-2 border">
      {{ game.game_name }}
      <img :src="game.image" alt="">
    </div>
    <div v-if="loading" class="text-center text-sm text-gray-500">Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: '',
      gameLists: [],
      page: 1,
      loading: false,
      hasMore: true,
    }
  },
  methods: {
    getRouteData() {
      this.categoryName = this.$route.params.categoryName
    },
    async fetchGames() {
      if (this.loading || !this.hasMore) return
      this.loading = true

      try {
        const res = await this.$axios.get('game/lists', {
          params: {
            categoryName: this.categoryName,
            page: this.page
          }
        })

        this.gameLists.push(...res.data.data)

        this.page++
        this.hasMore = res.data.current_page < res.data.last_page
      } catch (e) {
        console.error('Failed to load games', e)
      } finally {
        this.loading = false
      }
    },
    handleScroll() {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      if (bottom) {
        this.fetchGames()
      }
    }
  },
  mounted() {
    this.getRouteData()
    this.fetchGames()
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
</style>
