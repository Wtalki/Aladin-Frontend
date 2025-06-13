import { createStore } from 'vuex'
import axios from '@/libs/axios/index'
import EventBus from '@/libs/AppEventBus'

export default createStore({
    state: {
        isLoggedIn: false,
        user: null,
        token: null,
        twodSetting: null,
        threedSetting: null
    },
    mutations: {
        login(state, { token, user }) {
            state.isLoggedIn = true
            state.token = token
            state.user = user
        },
        logout(state) {
            state.isLoggedIn = false
            state.token = null
            state.user = null
        },
        SET_TWOD_SETTING(state, payload) {
            state.twodSetting = payload
        },
        SET_THREED_SETTING(state, payload) {
            state.threedSetting = payload
        }
    },
    actions: {
        async getUser({ commit }, { token, user }) {
            localStorage.setItem('jwt_token', token)
            const headers = {
                Authorization: `Bearer ${token}`
            }
            if (!user) {
                let userRes = await axios.post('/auth/me', null, { headers })
                user = userRes.data
            }
            localStorage.setItem('user', JSON.stringify(user))
            commit('login', { token, user })
        },
        async refreshToken(state, token) {
            const headers = {
                Authorization: `Bearer ${token}`
            }
            let res = await axios.post('/auth/refresh', null, { headers })
            let newToken = res.data.access_token
            localStorage.setItem('jwt_token', newToken)
            return newToken
        },
        async fetchTwodSetting({ commit, state }) {
            const res = await axios.get('/auth/twod-setting', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            commit('SET_TWOD_SETTING', res.data)
            return res.data
        },
        async fetchThreedSetting({ commit, state }) {
            const res = await axios.get('/auth/threed-setting', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            commit('SET_THREED_SETTING', res.data[0])
            return res.data
        },
        async logout({ commit }) {
            try {
                let token = localStorage.getItem('jwt_token')
                if (token) {
                    const headers = {
                        Authorization: `Bearer ${token}`
                    }
                    const res = await axios.post('/auth/logout', null, { headers })
                    if (res.data.status == 200) {
                        localStorage.removeItem('jwt_token')
                        localStorage.removeItem('user')
                        EventBus.emit('show-toast', {
                            severity: 'info',
                            summary: '',
                            detail: res.data.message,
                            life: 2000
                        })
                    }
                }
                commit('logout')
                this.$router.push('/')
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        user: (state) => state.user,
        token: (state) => state.token,
        twodSetting: (state) => state.twodSetting,
        threedSetting: (state) => state.threedSetting
    }
})
