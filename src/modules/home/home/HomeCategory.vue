<template>
  <div class="p-2 grid grid-cols-2 gap-2">
    <router-link to="/twod"
      class="!bg-primary text-light rounded-lg p-3 flex justify-center items-center cursor-pointer">
      2D
    </router-link>
    <router-link to="/threed"
      class="!bg-primary text-light rounded-lg p-3 flex justify-center items-center cursor-pointer">
      3D
    </router-link>
    <div v-for="(category, n) in categoryLists" :key="n"
      class="!bg-primary text-light rounded-lg p-3 flex justify-center items-center cursor-pointer"
      @click="showGame(category.category_name)">
      {{ category.category_name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      categoryLists: []
    }
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  methods: {
    async fetchCategory() {
      const res = await this.$axios.get('/categories/lists')
      this.categoryLists = res.data
    },
    showGame(categoryName) {
      this.$router.push({ name: 'game', params: { categoryName } })
    }
  },
  mounted() {
    this.fetchCategory()
  }
}
</script>
