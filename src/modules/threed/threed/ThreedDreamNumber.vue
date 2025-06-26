<template>
    <section class="flex flex-col items-center p-3">
        <h1 class="text-center text-xl text-primary mb-5">{{ $t('dream_numbers') }}</h1>
        <div class="grid grid-cols-4 gap-2">
            <div v-for="item in items" :key="item.id" class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-light rounded-lg space-y-3 shadow-md p-2">
                <h2 class="text-lg text-center font-semibold">{{ item.name }}</h2>
                <img :src="item.img" :alt="item.name" class="w-full object-cover rounded-md" />
                <div class="flex space-x-2">
                    <span v-for="child in item.children" :key="child.number"
                        class="bg-secondary cursor-pointer text-white p-2 rounded-md text-sm font-medium">
                        {{ child.number }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex justify-center space-x-4 mt-10 mb-24">
            <button @click="changePage(previousPageUrl)" :disabled="!previousPageUrl"
                class="px-4 py-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">{{
                    $t('prev') }}</button>
            <button @click="changePage(nextPageUrl)" :disabled="!nextPageUrl"
                class="px-4 py-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">{{
                    $t('next') }}</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            currentPage: 1,
            previousPageUrl: null,
            nextPageUrl: null
        }
    },
    mounted() {
        this.fetchData(this.currentPage)
    },
    methods: {
        async fetchData(page) {
            try {
                const response = await fetch(`https://api.2dboss.com/api/v2/v1/threed/book?page=${page}`)
                const json = await response.json()

                this.items = json.data
                this.currentPage = json.current_page
                this.previousPageUrl = json.previous_page_url
                this.nextPageUrl = json.next_page_url
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },
        changePage(url) {
            if (url) {
                const urlParams = new URL(url).searchParams
                const page = urlParams.get('page')
                this.fetchData(page)
            }
        }
    }
}
</script>
