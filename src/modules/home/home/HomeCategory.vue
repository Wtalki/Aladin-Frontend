<template>
    <div class="overflow-x-auto whitespace-nowrap p-1 bg-gray-50 rounded flex space-x-2 scroll-smooth">
        <div v-for="(category, index) in popularCategories" :key="'cat-' + index" @click="platformGame(category.category_name)" class="text-white bg-primary rounded min-w-[100px] flex justify-center items-center">
            <img :src="category.image" :alt="category.product_name" class="h-8 object-contain" />
        </div>
        <div v-for="(platform, index) in platformLists" :key="'plat-' + index" @click="platformGame(platform.product_name)" class="text-white bg-primary rounded min-w-[100px] flex justify-center items-center">
            <img :src="platform.image" :alt="platform.product_name" class="h-8 object-contain" />
        </div>
    </div>
    <div class="">
        <div ref="scrollContainer" class="overflow-x-auto">
            <div class="flex flex-wrap flex-col gap-3 content-start" style="height: 450px; min-width: max-content">
                <div v-for="game in gameLists" :key="game.id" @click="playGame(game)" class="p-[2px] rounded-md bgGradient shadow-md cursor-pointer transition-transform hover:scale-105">
                    <div class="w-28 h-32 rounded-md bg-white overflow-hidden">
                        <img :src="game.image" :alt="game.game_name" class="w-full h-24 object-cover" />
                        <div class="p-2 text-center">
                            <h2 class="text-sm font-semibold text-primary truncate">
                                {{ game.game_name }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="px-2 grid grid-cols-2 gap-2 mb-8">
        <div v-for="(category, n) in categoryFilterLists" :key="n" class=" rounded-lg">
            <router-link to="/twod" v-if="category.category_name == '2D'" class="bg-primary text-light rounded-lg py-2 px-1 flex justify-between items-center cursor-pointer">
                <div>
                    <h2 class="font-semibold tracking-wider text-md text-white">2D</h2>
                    <p class="text-[10px] text-gray-200">{{ formattedMoney }}</p>
                </div>
                <img :src="category.image" class="w-14 h-10 object-cover" />
            </router-link>

            <router-link to="/threed" v-else-if="category.category_name == '3D'" class="bg-primary text-light rounded-lg py-2 px-1 flex justify-between items-center cursor-pointer">
                <div>
                    <h2 class="font-semibold tracking-wider text-md text-white">3D</h2>
                    <p class="text-[10px] text-gray-200">{{ formattedMoney }}</p>
                </div>
                <img :src="category.image" class="w-14 h-10 object-cover" />
            </router-link>

            <div v-else class="bg-primary text-light rounded-lg py-2 px-1 flex justify-between items-center cursor-pointer" @click="showGame(category.category_name)">
                <div>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'POPULAR'">Popular</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'SLOT'">Slots</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'FISHING'">Fishings</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'LIVE_CASINO'">Live Casino</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'LIVE_CASINO_PREMIUM'">PRE Live Casino</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'POKER'">Poker</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'SPORT_BOOK'">Sports</h2>
                    <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name == 'VIRTUAL_SPORT'">Virtual Sport</h2>
                    <p class="text-[10px] text-gray-200">{{ category.randomMoney.toLocaleString() }} Users</p>
                </div>
                <img :src="category.image" class="w-14 h-10 object-cover" />
            </div>
        </div>
    </div>
    <GameModal :iframe-url="iframeUrl" v-if="showIframe" @close="closeIframe" />
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import GameModal from '@/components/gameIframe/GameIframe.vue'

export default {
    components: {
        GameModal
    },
    data() {
        return {
            categoryLists: [],
            platformLists: [],
            randomMoney: 0,
            intervalId: null,

            gameLists: [],
            page: 1,
            loading: false,
            hasMore: true,
            selectedPlatform: '',
            platforms: [],
            debouncedSearch: null,
            searchQuery: '',
            showIframe: false,
            iframeUrl: '',
            categoryName: 'POPULAR' // Added to track selected category
        }
    },
    computed: {
        ...mapGetters(['token', 'user']),
        formattedMoney() {
            return this.randomMoney.toLocaleString() + ' Users'
        },
        popularCategories() {
            return this.categoryLists.filter((c) => c.category_name === 'POPULAR')
        },
        categoryFilterLists() {
            return this.categoryLists.filter((c) => c.category_name !== 'POPULAR')
        }
    },
    methods: {
        generateRandomMoney() {
            const min = 1000
            const max = 100000
            this.randomMoney = Math.floor(Math.random() * (max - min + 1)) + min
        },
        async fetchCategory() {
            const res = await this.$axios.get('/categories/lists')
            this.categoryLists = res.data.map((category) => {
                const min = 1000
                const max = 1000000
                const randomMoney = Math.floor(Math.random() * (max - min + 1)) + min
                return {
                    ...category,
                    randomMoney
                }
            })
        },
        async fetchPlatform() {
            const res = await this.$axios.get('/platform/lists')
            this.platformLists = res.data
        },
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
                    this.gameLists = res.data.gamelist.data
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
            const el = this.$refs.scrollContainer
            if (!el) return

            const nearRightEdge = el.scrollLeft + el.clientWidth >= el.scrollWidth - 100

            if (nearRightEdge) {
                this.fetchGames()
            }
        },
        async playGame(game) {
            if (!this.token) {
                console.log('Not logged in')
                return
            }
            this.showIframe = true

            const params = {
                game_code: game.game_code,
                game_type: game.game_type,
                product_code: game.product_id,
                member_account: this.user.phone
            }

            try {
                const res = await this.$axios.post('/get/callback/key', params)
                this.iframeUrl = res.data.url
            } catch (err) {
                console.error('Launch game error', err)
            }
        },

        // ✅ Fixed platformGame method
        platformGame(productName) {
            console.log(productName)
            this.categoryName = productName
            this.page = 1
            this.hasMore = true
            this.gameLists = []
            this.fetchGames()
        },

        showGame(categoryName) {
            this.$router.push({ name: 'game', params: { categoryName } })
        },
        closeIframe() {
            this.showIframe = false
            this.iframeUrl = ''
        }
    },
    mounted() {
        this.fetchPlatform()
        this.fetchCategory()
        this.fetchGames()
        this.generateRandomMoney()

        this.intervalId = setInterval(() => {
            this.generateRandomMoney()
        }, 60000)

        this.getRouteData()
        this.fetchGames()

        const el = this.$refs.scrollContainer
        if (el) {
            el.addEventListener('scroll', this.handleScroll)
        }
    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    },
    created() {
        this.debouncedSearch = debounce(() => {
            this.page = 1
            this.gameLists = []
            this.hasMore = true
            this.fetchGames()
        }, 300)
    },
    unmounted() {
        const el = this.$refs.scrollContainer
        if (el) {
            el.removeEventListener('scroll', this.handleScroll)
        }
    }
}
</script>
<style scoped>
.horizontal-scroll-3rows {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 300px; /* Adjust for 3 rows */
    max-height: 300px;
    overflow-x: auto;
    white-space: normal;
    row-gap: 10px;
    column-gap: 10px;
}

.game-card {
    width: 120px;
    flex-shrink: 0;
    margin-right: 10px;
}
.bgGradient {
    background: linear-gradient(90deg, rgba(253, 248, 128, 1) 0%, rgba(101, 59, 17, 1) 19%, rgba(255, 255, 255, 1) 43%, rgba(255, 255, 255, 1) 62%, rgba(250, 225, 140, 1) 80%, rgba(213, 179, 99, 1) 100%);
}
</style>
