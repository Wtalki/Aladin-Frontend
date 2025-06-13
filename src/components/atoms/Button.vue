<template>
    <router-link v-if="type === 'link'" :to="route">
        <span v-if="name">{{ name }}</span>

        <slot v-else />
    </router-link>

    <button v-else :type="type" class="py-2 px-4 text-center rounded flex justify-center items-center leading-5" :disabled="disabled">
        <svg v-if="loading" class="animate-spin h-5 w-5 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <span v-if="name">{{ name }}</span>
        <slot v-else />
    </button>
</template>

<script>
export default {
    props: {
        loading: Boolean,
        name: String,
        route: String,
        disabled: Boolean,
        type: {
            type: String,
            default: 'button'
        }
    }
}
</script>
