<template>
    <section class="flex flex-col w-full min-h-screen mx-auto rounded">
        <div class="flex items-center justify-between px-4 mt-4 font-bold text-primary">
            <div>{{ currentDate }}</div>
            <div>
                <span v-if="selectedTime == 'early_morning'">11:00 AM</span>
                <span v-if="selectedTime == 'morning'">12:01 PM</span>
                <span v-if="selectedTime == 'early_evening'">03:00 PM</span>
                <span v-if="selectedTime == 'evening'">04:30 PM</span>
            </div>
        </div>

        <form class="w-full px-4 pb-24 mx-auto">
            <table class="w-full mt-4 text-white border border-collapse border-light">
                <thead>
<<<<<<< HEAD
                    <tr class="bg-primary">
=======
                    <tr class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)]">
>>>>>>> 032a9fb (change color)
                        <th class="p-3 text-center border border-light">{{ $t('number') }}</th>
                        <th class="p-3 text-center border border-light">{{ $t('bet_amount') }}</th>
                        <th class="w-20 p-3 text-center border border-light">{{ $t('cancel') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(twodNumber, index) in twodStore.twodNumbers" :key="index" class="!bg-secondary">
                        <td class="py-2 font-semibold text-center border border-light">{{ twodNumber.number }}</td>
                        <td class="text-center border border-light">
                            <input v-model="twodNumber.betting_amount" @input="updateAmount($event, index)"
                                class="w-24 p-2 text-center text-white bg-secondary border border-gray-600 rounded-md focus:outline-none" />
                        </td>
                        <td class="border border-light">
                            <div @click="removeTwodNumber(index)"
                                class="flex items-center justify-center cursor-pointer text-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    viewBox="0 0 384 512">
                                    <path
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                        </td>
                    </tr>
<<<<<<< HEAD
                    <tr class="bg-primary">
=======
                    <tr class="[background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)]">
>>>>>>> 032a9fb (change color)
                        <td class="py-2 font-semibold text-center border border-light">{{ $t('total') }}</td>
                        <td class="text-center border border-light">
                            <div class="flex items-center justify-center">
                                <input :value="totalAmount()" disabled
                                    class="w-24 p-2 text-center text-white bg-secondary border border-gray-600 rounded-md focus:ring-2 focus:ring-gold focus:outline-none" />
                            </div>
                            <span v-if="errors?.wallet" class="block text-sm font-medium text-danger">{{ errors?.wallet
                            }}</span>
                        </td>
                        <td class="border border-light"></td>
                    </tr>
                </tbody>
            </table>

            <button :disabled="loading" @click="submitTwodBet"
                class="flex items-center justify-center w-full py-3 mt-4 font-semibold text-black transition-all rounded-lg bg-gold">
                <div v-if="loading" class="flex items-center justify-center">
                    <div>
                        <svg class="w-8 h-8 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    </div>
                    <div>{{ $t('submitting') }}</div>
                </div>
                <div v-else>
                    <span>{{ $t('order_numbers') }}</span>
                </div>
            </button>
        </form>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from '@/libs/AppEventBus'
import { useTwodStore } from '@/modules/twod/store/twodStore'

export default {
    props: {
        selectedTime: {
            type: String
        }
    },
    data() {
        return {
            errors: {
                time: null
            },
            loading: false
        }
    },
    computed: {
        ...mapGetters(["token", "user"]),
        currentDate() {
            const date = new Date()
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = String(date.getFullYear()).slice(-2)
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const dayOfWeek = daysOfWeek[date.getDay()]
            return `${day}-${month}-${year} (${dayOfWeek})`
        },
        hasZeroBettingAmount() {
            if (this.user?.region == 'my') {
                return this.twodStore.twodNumbers.some((twodNumber) => parseFloat(twodNumber.betting_amount) < 100)
            } else {
                return this.twodStore.twodNumbers.some((twodNumber) => parseFloat(twodNumber.betting_amount) < 1)
            }
        }
    },
    methods: {
        ...mapActions(["getUser"]),
        removeTwodNumber(index) {
            const newTwodNumbers = [...this.twodStore.twodNumbers]
            newTwodNumbers.splice(index, 1)
            this.twodStore.SET_TWOD_NUMBERS(newTwodNumbers)
            localStorage.setItem('twodNumbers', JSON.stringify(newTwodNumbers))

            if (this.twodStore.twodNumbers.length < 1) {
                localStorage.removeItem('twodNumbers')
                this.$router.push({
                    path: '/twod/bet',
                    query: { selectedTime: this.selectedTime }
                })
            }
        },
        updateAmount(e, index) {
            const newTwodNumbers = [...this.twodStore.twodNumbers]
            newTwodNumbers[index] = {
                number: this.twodStore.twodNumbers[index]['number'],
                betting_amount: parseFloat(e.target.value) || 0
            }
            this.twodStore.SET_TWOD_NUMBERS(newTwodNumbers)
            localStorage.setItem('twodNumbers', JSON.stringify(newTwodNumbers))
        },
        totalAmount() {
            return this.twodStore.twodNumbers?.reduce((total, twodNumber) => {
                return total + (parseFloat(twodNumber.betting_amount) || 0)
            }, 0)
        },
        validateForm() {
            if (this.hasZeroBettingAmount) {
                const messageKey = this.user?.region === 'my' ? 'mm_minimum_required' : 'th_minimum_required';

                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: this.$t(messageKey),
                    life: 2000
                });

                return false;
            }
            if (this.totalAmount() > this.user.wallet) {
                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: this.$t('insufficient_funds'),
                    life: 2000
                })
                return false
            }
            return true
        },
        async submitTwodBet(event) {
            event.preventDefault()

            if (!this.validateForm()) {
                return
            }

            const data = {
                numbers: this.twodStore.twodNumbers.map((twodNumber) => ({
                    number: twodNumber.number,
                    betting_price: twodNumber.betting_amount
                })),
                totalAmount: this.totalAmount(),
                time: this.selectedTime
            }

            this.loading = true

            try {
                const res = await this.$axios.post("auth/twod-bet-place", data, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })

                EventBus.emit('show-toast', {
                    severity: 'success',
                    detail: res.data.message,
                    life: 2000
                })
                await this.getUser({ token: this.token });
                this.twodStore.SET_TWOD_NUMBERS([])
                localStorage.removeItem('twodNumbers')
                this.$router.push('/')
            } catch (error) {
                this.loading = false
                const msg = error.response?.data?.message || 'Bet placement failed'
                EventBus.emit('show-toast', {
                    severity: 'error',
                    detail: msg,
                    life: 2000
                })
            }
        }

    },
    created() {
        this.twodStore = useTwodStore()
    },
    async mounted() {
        if (!this.selectedTime) {
            this.$router.push('/twod/bet-select-time')
        }

        let twods = JSON.parse(localStorage.getItem('twodNumbers'))
        if (twods) {
            this.twodStore.SET_TWOD_NUMBERS(twods)
        } else {
            this.$router.push('/twod/bet')
            this.twodStore.SET_TWOD_NUMBERS([])
        }
    }
}
</script>
