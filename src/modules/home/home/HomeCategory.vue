<template>
  <div class="p-2 grid grid-cols-2 gap-2">
    <div v-for="(category, n) in categoryLists" :key="n">
      <router-link to="/twod" v-if="category.category_name == '2D'"
        class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-light rounded-lg p-2 flex justify-center items-center cursor-pointer">
        <img :src="category.image" class="w-24 h-24 object-cover" />
      </router-link>

      <router-link to="/threed" v-else-if="category.category_name == '3D'"
        class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-light rounded-lg p-2 flex justify-center items-center cursor-pointer">
        <img :src="category.image" class="w-24 h-24 object-cover" />
      </router-link>

      <div v-else class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-light rounded-lg p-2 flex justify-center items-center cursor-pointer"
        @click="showGame(category.category_name)">
        <img :src="category.image" class="w-24 h-24 object-cover" />
      </div>
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
