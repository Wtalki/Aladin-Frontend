<template>
    <section class="flex flex-col items-center p-3 !bg-secondary">
        <h1 class="text-center text-xl text-gold mb-5">{{ $t('dream_numbers') }}</h1>

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
                class="px-4 py-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                {{ $t('prev') }}
            </button>
            <button @click="changePage(nextPageUrl)" :disabled="!nextPageUrl"
                class="px-4 py-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                {{ $t('next') }}
            </button>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTwodDreamNumber } from '@/modules/twod/composables/useTwodDreamNumber'

const { items, previousPageUrl, nextPageUrl, loadDreamNumbers, changePage } = useTwodDreamNumber()

onMounted(async () => {
    await loadDreamNumbers()
})
</script>
