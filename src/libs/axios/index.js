import axios from 'axios'
import store from '@/store/index'
import router from '@/routers/index'
import EventBus from '@/libs/AppEventBus'

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('user')

            store.commit('logout')
            EventBus.emit('show-toast', {
                severity: 'warn',
                detail: 'Session expired. Please login again.',
                life: 2000
            })
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export default axios
