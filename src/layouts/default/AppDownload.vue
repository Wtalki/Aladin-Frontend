<template>
  <button v-if="!isStandalone" @click="installApp" type="button"
    class="bg-light font-semibold text-xs text-dark md:w-auto w-full flex justify-center p-2 !rounded-full">
    Download
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isStandalone = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  isStandalone.value = window.matchMedia('(display-mode: standalone)').matches

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    console.log('beforeinstallprompt fired and captured')
  })
})

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const result = await deferredPrompt.value.userChoice
    if (result.outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    deferredPrompt.value = null
  }
}
</script>