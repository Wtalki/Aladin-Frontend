<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-row gap-2">
      <input v-model="searchQuery" @input="debouncedSearch" type="text" placeholder="Search games..." class="w-full p-2 border rounded" />

      <select v-model="selectedPlatform"  @input="debouncedSearch" class="w-full p-2 border rounded">
        <option value="" selected>All Platforms</option>
        <option v-for="platform in platforms" :key="platform" :value="platform.product_code">
          {{ platform.product_name }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-3 gap-3 pb-20">
      <div v-for="game in gameLists" :key="game.id"
        class="rounded-md shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
        <img :src="game.image" :alt="game.game_name" class="w-full h-32 object-cover" />
        <div class="p-2 text-center">
          <h2 class="text-sm font-semibold text-light truncate">
            {{ game.game_name }}
          </h2>
        </div>
      </div>
    </div>
    <div v-if="loading" class="h-screen text-center text-light">
      Loading...
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      categoryName: '',
      gameLists: [],
      page: 1,
      loading: false,
      hasMore: true,
      selectedPlatform: '',
      platforms: [],
      debouncedSearch: null,
      searchQuery:''

    }
  },

  methods: {
    getRouteData() {
      this.categoryName = this.$route.params.categoryName
    },
   async fetchGames(customPage = null) {
  if (this.loading || !this.hasMore) return
  this.loading = true

  const pageToFetch = customPage ?? this.page

  try {
    const res = await this.$axios.get('game/lists', {
      params: {
        categoryName: this.categoryName,
        page: pageToFetch,
        search: this.searchQuery,
        product_id: this.selectedPlatform || null
      }
    })

    if (pageToFetch === 1) {
      this.gameLists = res.data.gamelist.data // new search = replace
    } else {
      this.gameLists.push(...res.data.gamelist.data)
    }

    this.platforms = res.data.product
    this.page = pageToFetch + 1
    this.hasMore = res.data.gamelist.current_page < res.data.gamelist.last_page
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
  created() {
  this.debouncedSearch = debounce(() => {
    this.page = 1
    this.gameLists = []       // Reset the game list
    this.hasMore = true       // Reset load-more flag
    this.fetchGames()
  }, 300)
},
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
