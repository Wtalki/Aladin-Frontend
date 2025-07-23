<template>
  <div class="p-2 grid grid-cols-2 gap-2">
    <div v-for="(category, n) in categoryLists" :key="n">
      <router-link to="/twod" v-if="category.category_name == '2D'"
        class="bg-primary text-light rounded-lg py-2 px-1 flex justify-between items-center cursor-pointer">
          <div>
          <h2 class="font-semibold tracking-wider text-md text-white">2D</h2>
          <p class="text-[10px] text-gray-200">{{ formattedMoney }} </p>
        </div>
        <img :src="category.image" class="w-14 h-10 object-cover" />
      </router-link>

      <router-link to="/threed" v-else-if="category.category_name == '3D'"
        class="bg-primary text-light rounded-lg py-2 px-1 flex justify-between items-center cursor-pointer">
        <div>
          <h2 class="font-semibold tracking-wider text-md text-white">3D</h2>
          <p class="text-[10px] text-gray-200">{{ formattedMoney }}</p>
        </div>
        <img :src="category.image" class="w-14 h-10 object-cover" />
      </router-link>

      <div v-else class=" bg-primary text-light rounded-lg py-2 px-1 flex justify-between items-center cursor-pointer"
        @click="showGame(category.category_name)">
        <div>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='POPULAR'">Popular</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='SLOT'">Slots</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='FISHING'">Fishings</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='LIVE_CASINO'">Live Casino</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='LIVE_CASINO_PREMIUM'">PRE Live Casino</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='POKER'">Poker</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='SPORT_BOOK'">Sports</h2>
          <h2 class="font-semibold tracking-wider text-[12px] text-white" v-if="category.category_name =='VIRTUAL_SPORT'">Virtual Sport</h2>
          <p class="text-[10px] text-gray-200">{{ category.randomMoney.toLocaleString() }} Users</p>
        </div>
        <img :src="category.image" class="w-14 h-10 object-cover" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      categoryLists: [],
      randomMoney: 0,
      intervalId: null // for clearing interval
    }
  },
  computed: {
    ...mapGetters(["token", "user"]),
    formattedMoney() {
      return this.randomMoney.toLocaleString() + ' Users'
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
      this.categoryLists = res.data.map(category => {
        const min = 1000
        const max = 1000000
        const randomMoney = Math.floor(Math.random() * (max - min + 1)) + min
        return {
          ...category,
          randomMoney
        }
      })
    },
    showGame(categoryName) {
      this.$router.push({ name: 'game', params: { categoryName } })
    }
  },
  mounted() {
    this.fetchCategory()
    this.generateRandomMoney()

    this.intervalId = setInterval(() => {
      this.generateRandomMoney()
    }, 60000)
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
</script>
