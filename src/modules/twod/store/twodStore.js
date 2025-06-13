import { defineStore } from 'pinia'
import { fetchTwodResults } from "@/modules/twod/services/twodService";

export const useTwodStore = defineStore('twodNumbers', {
    state: () => ({
        twodNumbers: [],
        value: null
    }),
    actions: {
        async loadTwodResults() {
            this.value = await fetchTwodResults();
        },
        SET_TWOD_NUMBERS(payload) {
            if (typeof payload === 'object') {
                this.twodNumbers = payload
            } else {
                if (payload && this.twodNumbers.includes(payload)) {
                    this.twodNumbers = this.twodNumbers.filter((twodNumber) => twodNumber !== payload)
                    return
                }
                this.twodNumbers.push(payload)
            }
        },
        REMOVE_TWOD_NUMBERS(payload) {
            setTimeout(() => {
                this.twodNumbers = this.twodNumbers.filter((item) => !payload.includes(item))
            }, 100)
        }
    }
})
