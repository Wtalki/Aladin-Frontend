import { useTwodSelectTimeStore } from '@/modules/twod/store/twodSelectTimeStore'
import { useStore } from 'vuex'
import { ref } from 'vue'

export const useTwodSelectTime = () => {
    const store = useTwodSelectTimeStore()
    const vuexStore = useStore()

    const loading = ref(false)

    const initialize = async () => {
        store.initDay()
        loading.value = true
        try {
            await vuexStore.dispatch('fetchTwodSetting')
            store.setTwodSetting(vuexStore.getters.twodSetting)
        } catch (error) {
            console.error('Failed to fetch 2D settings:', error)
        } finally {
            loading.value = false
        }
    }

    const selectTime = (time) => {
        store.setSelectedTime(time)
    }

    return {
        store,
        initialize,
        selectTime,
        loading
    }
}
