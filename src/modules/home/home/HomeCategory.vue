<template>
    <div class="grid grid-cols-2 gap-2">
        <div v-for="(category,n) in categoryLists" :key="n" @click="showGame(category.category_name)">
            {{category.category_name}}
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
      this.$router.push({ name: 'game', params: { categoryName } }) // ✅
    }
  },
  mounted() {
    this.fetchCategory()
  }
}
</script>

<style lang="stylus" scoped>

</style>
