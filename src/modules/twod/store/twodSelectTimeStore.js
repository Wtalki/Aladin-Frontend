import { defineStore } from 'pinia'

export const useTwodSelectTimeStore = defineStore('twodSelectTime', {
    state: () => ({
        selectedTime: null,
        currentDay: '',
        twodSetting: []
    }),
    getters: {
        isWeekend: (state) => state.currentDay === 'Sat' || state.currentDay === 'Sun',
        getSettingByTime: (state) => (time) => {
            return state.twodSetting.find((s) => s.result_time === time) || {}
        },
        canBetForEarlyMorning: (state) => state.getSettingByTime('early_morning')?.status === true,
        canBetForMorning: (state) => state.getSettingByTime('morning')?.status === true,
        canBetForEarlyEvening: (state) => state.getSettingByTime('early_evening')?.status === true,
        canBetForEvening: (state) => state.getSettingByTime('evening')?.status === true
    },
    actions: {
        initDay() {
            this.currentDay = new Date().toLocaleString('default', { weekday: 'short' })
        },
        setSelectedTime(time) {
            this.selectedTime = time
        },
        setTwodSetting(data) {
            this.twodSetting = data
        }
    }
})
