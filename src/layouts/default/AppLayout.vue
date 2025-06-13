<template>
    <div class="appWidth mx-auto bg-secondary">
        <AppNavbar />
        <router-view />
        <AppFooter />
    </div>
</template>

<script setup>
import AppNavbar from './AppNavbar.vue'
import AppFooter from './AppFooter.vue'
</script>
