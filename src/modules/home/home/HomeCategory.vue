<template>
  <div class="p-2 grid grid-cols-2 gap-2">
    <div v-for="(category, n) in categoryLists" :key="n">
      <router-link to="/twod" v-if="category.category_name == '2D'"
        class="[background:linear-gradient(to_bottom,#33e9ff57_70%,#0260bfab_150%,#0260bf00_100%)] text-light rounded-lg p-2 flex justify-between items-center cursor-pointer">
          <div>
          <h2 class="font-semibold tracking-wider text-md text-black">2D</h2>
          <p class="text-sm text-gray-700">{{ formattedMoney }}</p>
        </div>
        <img :src="category.image" class="w-14 h-14 object-cover" />
      </router-link>

      <router-link to="/threed" v-else-if="category.category_name == '3D'"
        class="[background:linear-gradient(to_bottom,#33e9ff57_70%,#0260bfab_150%,#0260bf00_100%)] text-light rounded-lg p-2 flex justify-between items-center cursor-pointer">
        <div>
          <h2 class="font-semibold tracking-wider text-md text-black">3D</h2>
          <p class="text-sm text-gray-700">{{ formattedMoney }}Ks</p>
        </div>
        <img :src="category.image" class="w-14 h-14 object-cover" />
      </router-link>

      <div v-else class="[background:linear-gradient(to_bottom,#33e9ff57_70%,#0260bfab_150%,#0260bf00_100%)] text-light rounded-lg p-2 flex justify-between items-center cursor-pointer"
        @click="showGame(category.category_name)">
        <div>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='SLOT'">Slots</h2>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='FISHING'">Fishings</h2>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='LIVE_CASINO'">Live Casino</h2>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='LIVE_CASINO_PREMIUM'">PRE Live Casino</h2>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='POKER'">Poker</h2>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='SPORT_BOOK'">Sport Book</h2>
          <h2 class="font-semibold tracking-wider text-md text-black" v-if="category.category_name =='VIRTUAL_SPORT'">Virtual Sport</h2>
          <p class="text-sm text-gray-700">{{ category.randomMoney.toLocaleString() }} KS</p>
        </div>
        <img :src="category.image" class="w-14 h-14 object-cover" />
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
       randomMoney: 0
    }
  },
  computed: {
    ...mapGetters(["token", "user"]),
    formattedMoney() {
      return this.randomMoney.toLocaleString() + ' MMK'
    }
  },
  methods: {
    generateRandomMoney() {
      const min = 1000
      const max = 1000000
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
  }
}
</script>
