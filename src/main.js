import '../public/registerSW'
import '@/plugins/global-css'
import '@/plugins/abality'
import '@/plugins/confirmation-service'
import '@/plugins/global-components'
import '@/plugins/moment'
import '@/plugins/pinia'
import '@/plugins/primevue'
import '@/plugins/router'
import '@/plugins/toast-service'
import '@/assets/index.css'
import '@/assets/output.css'
import EventBus from '@/libs/AppEventBus'
import formatDate from '@/helpers/formatDate'
import en from './locales/en.json'
import mm from './locales/my.json'
import { app } from '@/plugins/main-app'
import store from '@/store/index'
import axios from '@/libs/axios/index'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import './registerServiceWorker'

const pinia = createPinia()
const messages = {
    en: en,
    mm: mm
}
if (!localStorage.getItem('locale')) {
    localStorage.setItem('locale', 'mm')
}
const i18n = createI18n({
    locale: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'mm',
    messages
})

app.config.globalProperties.$formatLangForSBO = (lang) => {
    if (lang === 'en') {
        return 'en'
    } else if (lang === 'mm') {
        return 'mm'
    }
    return 'mm'
}

let handleAuth = async () => {
    try {
        let token = localStorage.getItem('jwt_token')
        if (token) {
            let newToken = await store.dispatch('refreshToken', token)
            await store.dispatch('getUser', { token: newToken })
        } else {
            await store.dispatch('logout')
        }
    } catch (e) {
        await store.dispatch('logout')
    }
}

let renderApp = async () => {
    await handleAuth()
    app.use(pinia)
    app.use(i18n)
    app.provide('$formatDate', formatDate)
    app.use(store)
    app.config.globalProperties.$EventBus = EventBus
    app.config.globalProperties.$axios = axios
    app.mount('#app')
}

renderApp()
