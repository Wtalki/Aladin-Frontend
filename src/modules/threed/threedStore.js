import { defineStore } from 'pinia'

export const useThreedStore = defineStore('threedNumbers', {
    state: () => ({
        threedNumbers: []
    }),
    actions: {
        SET_THREED_NUMBERS(payload) {
            if (typeof payload === 'object') {
                this.threedNumbers = payload
            } else {
                if (payload && this.threedNumbers.includes(payload)) {
                    this.threedNumbers = this.threedNumbers.filter((threedNumber) => threedNumber !== payload)
                    return
                }
                this.threedNumbers.push(payload)
            }
        },
        REMOVE_THREED_NUMBERS(payload) {
            setTimeout(() => {
                this.threedNumbers = this.threedNumbers.filter((item) => !payload.includes(item))
            }, 100)
        }
    }
})
