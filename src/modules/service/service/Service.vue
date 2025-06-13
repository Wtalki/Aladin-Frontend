<script setup>
import { defineAsyncComponent } from 'vue'

const SyncService = defineAsyncComponent({
    loader: () => import('./SyncService'),
    loadingComponent: () => import('@/components/Loading.vue'),
    delay: 20000, 
    timeout: 10000, 
    errorComponent: () => import('@/components/Error.vue')
  });

</script>

<template>
    <SyncService />
</template>