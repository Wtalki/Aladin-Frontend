<template>
  <button v-if="showInstallPrompt" @click="installApp" type="button"
    class="bg-light font-semibold text-xs text-dark md:w-auto w-full flex justify-center p-2 rounded-full">
    Download
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone

  if (!isStandalone) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      showInstallPrompt.value = true
      console.log('beforeinstallprompt captured')
    })
  }
})

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome === 'accepted') {
      alert('User accepted the install prompt');
    } else {
      alert('User dismissed the install prompt');
    }
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }
}
</script>