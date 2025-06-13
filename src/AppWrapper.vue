<template>
    <div v-if="!showRouterView" class="relative mx-auto appWidth">
        <div class="absolute top-3 right-3 rounded-full px-2 py-1 bg-primary cursor-pointer" @click="skipCountdown">{{
            $t('Skip') }} {{ countdown }}</div>
        <img src="/banners/banner1.jpg" class="w-full" alt="Wallpaper" />
    </div>

    <router-view v-else />

    <Toast position="bottom-right"></Toast>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import EventBus from '@/libs/AppEventBus'

const showRouterView = ref(process.env.VUE_APP_ENV == 'production' ? false : true)
const countdown = ref(3)
let countdownTimer = null

onMounted(() => {
    EventBus.on('show-toast', showToast)
    startCountdown()
})

onBeforeUnmount(() => {
    EventBus.off('show-toast', showToast)
    clearInterval(countdownTimer)
})

const showToast = (event) => {
    if (event.severity === 'error') {
        toast.error(event.detail, {
            autoClose: 8000,
            dangerouslyHTMLString: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    } else if (event.severity === 'warn') {
        toast.warn(event.detail, {
            autoClose: 8000,
            dangerouslyHTMLString: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    } else if (event.severity === 'info') {
        toast.info(event.detail, {
            autoClose: 8000,
            dangerouslyHTMLString: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    } else {
        toast.success(event.detail, {
            autoClose: 8000,
            dangerouslyHTMLString: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
}

const startCountdown = () => {
    countdownTimer = setInterval(() => {
        if (countdown.value > 1) {
            countdown.value--
        } else {
            clearInterval(countdownTimer)
            showRouterView.value = true
        }
    }, 1000)
}

const skipCountdown = () => {
    clearInterval(countdownTimer)
    showRouterView.value = true
}
</script>
