<template>
    <section class="flex flex-col w-full min-h-screen mx-auto rounded bg-secondary">
        <div class="flex items-center justify-between px-4 mt-4 font-bold text-white">
            <div>{{ currentDate }}</div>
        </div>

        <form class="w-full px-4 pb-24 mx-auto shadow-md">
            <table class="w-full mt-4 text-white border border-collapse border-gray-700">
                <thead>
                    <tr class="bg-gray-800">
                        <th class="p-3 text-center border border-gray-700">{{ $t('number') }}</th>
                        <th class="p-3 text-center border border-gray-700">{{ $t('bet_amount') }}</th>
                        <th class="w-20 p-3 text-center border border-gray-700">{{ $t('cancel') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(threedNumber, index) in threedStore.threedNumbers" :key="index" class="bg-gray-900">
                        <td class="py-2 font-semibold text-center border border-gray-700">{{ threedNumber.number }}</td>
                        <td class="text-center border border-gray-700">
                            <input v-model="threedNumber.betting_amount" @input="updateAmount($event, index)"
                                class="w-24 p-2 text-center text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none" />
                        </td>
                        <td class="border border-gray-700">
                            <div @click="removeThreedNumber(index)"
                                class="flex items-center justify-center cursor-pointer text-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    viewBox="0 0 384 512">
                                    <path
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-gray-800">
                        <td class="py-2 font-semibold text-center border border-gray-700">{{ $t('total') }}</td>
                        <td class="text-center border border-gray-700">
                            <div class="flex items-center justify-center">
                                <input :value="totalAmount()" disabled
                                    class="w-24 p-2 text-center text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-gold focus:outline-none" />
                            </div>
                            <span v-if="errors?.wallet" class="block text-sm font-medium text-danger">{{ errors?.wallet
                                }}</span>
                        </td>
                        <td class="border border-gray-700"></td>
                    </tr>
                </tbody>
            </table>

            <button :disabled="submitLoading" @click="submitThreedBet"
                class="flex items-center justify-center w-full py-2 mt-4 font-semibold text-black transition-all rounded-lg bg-gold">
                <div v-if="submitLoading" class="flex items-center justify-center">
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
import { useThreedStore } from '@/modules/threed/threedStore'

export default {
    data() {
        return {
            errors: {
                time: null
            },
            submitLoading: false
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
                return this.threedStore.threedNumbers.some((threedNumber) => parseFloat(threedNumber.betting_amount) < 100)
            } else {
                return this.threedStore.threedNumbers.some((threedNumber) => parseFloat(threedNumber.betting_amount) < 1)
            }
        }
    },
    methods: {
        ...mapActions(["getUser"]),
        removeThreedNumber(index) {
            const newThreedNumbers = [...this.threedStore.threedNumbers]
            newThreedNumbers.splice(index, 1)
            this.threedStore.SET_THREED_NUMBERS(newThreedNumbers)
            localStorage.setItem('threedNumbers', JSON.stringify(newThreedNumbers))

            if (this.threedStore.threedNumbers.length < 1) {
                localStorage.removeItem('threedNumbers')
                this.$router.push({
                    path: '/threed/bet'
                })
            }
        },
        updateAmount(e, index) {
            const newThreedNumbers = [...this.threedStore.threedNumbers]
            newThreedNumbers[index] = {
                number: this.threedStore.threedNumbers[index]['number'],
                betting_amount: parseFloat(e.target.value) || 0
            }
            this.threedStore.SET_THREED_NUMBERS(newThreedNumbers)
            localStorage.setItem('threedNumbers', JSON.stringify(newThreedNumbers))
        },
        totalAmount() {
            return this.threedStore.threedNumbers?.reduce((total, threedNumber) => {
                return total + (parseFloat(threedNumber.betting_amount) || 0)
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
        async submitThreedBet(event) {
            event.preventDefault()

            if (!this.validateForm()) {
                return
            }

            try {
                this.submitLoading = true
                let data = {
                    threedNumbers: this.threedStore.threedNumbers
                };

                const res = await this.$axios.post(
                    `/auth/threed-bet`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );

                if (res.data.code == 400) {
                    EventBus.emit('show-toast', {
                        severity: 'error',
                        summary: '',
                        detail: res.data.message,
                        life: 2000
                    })
                }

                if (res.data.code == 200) {
                    await this.getUser({ token: this.token });
                    EventBus.emit('show-toast', {
                        severity: 'info',
                        summary: '',
                        detail: res.data.message,
                        life: 2000
                    })
                    localStorage.removeItem('threedNumbers');
                    this.threedStore.SET_THREED_NUMBERS([])
                    this.submitLoading = false
                    this.$router.push("/threed")
                }
            } catch (e) {
                this.submitLoading = false
            }
        }
    },
    created() {
        this.threedStore = useThreedStore()
    },
    async mounted() {
        let threeds = JSON.parse(localStorage.getItem('threedNumbers'))
        if (threeds) {
            this.threedStore.SET_THREED_NUMBERS(threeds)
        } else {
            this.$router.push('/threed/bet')
            this.threedStore.SET_THREED_NUMBERS([])
        }
    }
}
</script>
