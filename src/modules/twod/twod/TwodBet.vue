<template>
    <section class="flex flex-col w-full mx-auto rounded-lg bg-secondary">
        <!-- <section v-if="currentDay == 'Sat' || currentDay == 'Sun'"
            class="text-center flex justify-center items-center h-screen">
            <h5 class="text-danger font-bold text-xl">{{ $t('today_2d_closed') }}</h5>
        </section> -->
        <!-- v-else -->
        <section>
            <div v-if="loading" class="h-screen">
                <Loading :loading="loading" />
            </div>
            <main v-else>
                <div class="flex flex-col w-full mx-auto rounded-lg overflow-auto min-h-screen">
                    <h6 class="cursor-pointer flex justify-center items-center text-success font-semibold mt-3 w-full"
                        @click="handleColorModal">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="green" class="w-8 h-8" viewBox="0 0 512 512">
                                <path
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                        </div>
                        <h1>{{ $t('color_clarification') }}</h1>
                    </h6>

                    <div class="flex flex-wrap justify-center mt-4 pb-52">
                        <button v-for="number in numbersData" :key="number.number" @click="addTwodNumbers(number)"
                            :class="[
                                'm-2 border rounded flex flex-col justify-between items-center w-14 h-14 cursor-pointer transition-all',
                                (twodNumbers.includes(number.number) && number.remaining_limit_amount > 0) ? 'bg-success text-white' : '!bg-gray-200',
                                number.remaining_limit_amount == 0 ? 'opacity-50 cursor-not-allowed' : ''
                            ]" :disabled="number.remaining_limit_amount == 0 || number.status == false">
                            <div class="mt-1 text-lg font-semibold">{{ number.number }}</div>
                            <div class="w-full rounded" :class="{
                                'bg-success h-1': number.remaining_limit_amount >= (number.original_limit_amount / 2),
                                'bg-gold h-1': number.remaining_limit_amount < (number.original_limit_amount / 2) && number.remaining_limit_amount > (number.original_limit_amount / 10),
                                'bg-danger h-1': number.remaining_limit_amount <= (number.original_limit_amount / 10) && number.remaining_limit_amount > 0,
                                'bg-gray-500 h-1': (number.remaining_limit_amount == 0 || number.status == false)
                            }"></div>
                        </button>
                    </div>
                </div>

                <div class="relative pb-[60px]">
                    <div class="p-3 bet-container appWidth">
                        <input type="number" v-model="amount"
                            :placeholder="`${$t('enter_bet_amount')} ${$t(user?.region === 'my' ? 'mm_min_amount' : 'th_min_amount')}`"
                            class="w-full p-2 border border-gray-400 rounded-md" :class="{ 'border-danger': error }" />

                        <div v-if="error" class="text-danger text-sm mt-1">{{ error }}</div>

                        <div class="flex space-x-2 mt-3">
                            <button @click="handleRoundModal"
                                class="w-full bg-gold text-black py-2 rounded-lg font-semibold">{{ $t('section')
                                }}</button>
                            <button @click="handleManualModal"
                                class="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold">{{ $t('enter')
                                }}</button>
                            <button @click="handleReversedBet"
                                class="w-full bg-primary text-white py-2 rounded-lg font-semibold">{{ $t('add_r')
                                }}</button>
                            <button @click="handleQuickModal"
                                class="w-full !bg-blue-500 text-white py-2 rounded-lg font-semibold">{{
                                    $t('quick_select') }}</button>
                        </div>

                        <div class="flex space-x-2 mt-3">
                            <button @click="handleRemoveNumbers"
                                class="w-full bg-danger text-white py-2 rounded-lg font-semibold">{{ $t('clear_all')
                                }}</button>
                            <button @click="handleBetTwodSubmit"
                                class="w-full bg-success text-white py-2 rounded-lg font-semibold flex items-center justify-center">
                                {{ $t('order_numbers') }} -
                                <span class="bg-danger text-white ml-2 px-2 rounded-full text-sm">
                                    {{ twodNumbers.length }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </section>

    <Dialog v-model:visible="showDialog" modal :closable="false" class="modalWidth" :pt="{
        content: 'shadow-lg rounded-b-lg'
    }"
        :style="{ backgroundColor: '#f8fafc', borderWidth: '1px', borderColor: '#bdbbbb71', borderStyle: 'solid', borderRadius: '6px', padding: '20px', backdropFilter: 'blur(12px)' }">
        <template #header>
            <div class="w-full flex justify-between items-center mb-3">
                <h2 class="text-xl font-bold">{{ modal.title }}</h2>
                <Button icon="pi pi-times" @click="showDialog = false"
                    class="p-1 flex justify-center items-center p-button-danger" />
            </div>
        </template>
        <ColorModal v-if="modal.id == 'ColorModal'" />
        <RoundModal v-if="modal.id == 'RoundModal'" />
        <ManualModal v-if="modal.id == 'ManualModal'" />
        <QuickNumberModal v-if="modal.id == 'QuickNumberModal'" :removeSelectedQuickKeys="removeSelectedQuickKeys" />
    </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { useTwodStore } from '@/modules/twod/store/twodStore'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import ColorModal from '@/components/molecules/ColorModal.vue'
import RoundModal from '@/components/molecules/twod/RoundModal.vue'
import ManualModal from '@/components/molecules/twod/ManualModal.vue'
import QuickNumberModal from '@/components/molecules/twod/QuickNumberModal.vue'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Dialog,
        Button,
        ColorModal,
        RoundModal,
        ManualModal,
        QuickNumberModal,
        Loading
    },
    props: {
        selectedTime: {
            type: String
        }
    },
    data() {
        return {
            numbersData: [],
            modal: {
                id: null,
                title: null
            },
            amount: null,
            error: null,
            removeSelectedQuickKeys: false,
            currentDay: '',
            loading: false,
            showDialog: false
        }
    },
    computed: {
        ...mapGetters(["token", "user"]),
        twodNumbers() {
            return this.twodStore.twodNumbers
        }
    },
    methods: {
        handleColorModal() {
            this.modal.id = 'ColorModal'
                ; (this.modal.title = this.$t('full_limit_reached')), (this.showDialog = true)
        },
        handleRoundModal() {
            this.modal.id = 'RoundModal'
                ; (this.modal.title = this.$t('enter_numbers_to_select')), (this.showDialog = true)
        },
        handleManualModal() {
            this.modal.id = 'ManualModal'
                ; (this.modal.title = this.$t('enter_bet_slots')), (this.showDialog = true)
        },
        handleQuickModal() {
            this.modal.id = 'QuickNumberModal'
                ; (this.modal.title = this.$t('enter_quick_select')), (this.showDialog = true)
        },
        addTwodNumbers(number) {
            if (number.remaining_limit_price == 0) {
                return
            }
            this.twodStore.SET_TWOD_NUMBERS(number.number)
        },
        handleRemoveNumbers() {
            this.amount = null
            this.removeSelectedQuickKeys = true
            this.twodStore.SET_TWOD_NUMBERS([])
            localStorage.removeItem('twodNumbers')
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        handleBetTwodSubmit() {
            if (this.user?.region == 'my') {
                if (this.amount < 100) {
                    this.error = this.$t('mm_minimum_required')
                    return
                }
            } else {
                if (this.amount < 1) {
                    this.error = this.$t('th_minimum_required')
                    return
                }
            }

            if (this.amount && this.twodNumbers.length > 0) {
                const updatedTransactionData = this.twodNumbers.map((number) => {
                    if (typeof number === 'object') {
                        return {
                            number: number.number,
                            betting_amount: Number(this.amount)
                        }
                    } else {
                        return {
                            number: number,
                            betting_amount: Number(this.amount)
                        }
                    }
                })

                const existingNumbers = JSON.parse(localStorage.getItem('twodNumbers')) || []

                const combinedNumbers = [...existingNumbers, ...updatedTransactionData]

                localStorage.setItem('twodNumbers', JSON.stringify(combinedNumbers))

                setTimeout(() => {
                    this.$router.push({
                        path: '/twod/bet-confirm',
                        query: { selectedTime: this.selectedTime }
                    })
                }, 300)
            }
        },
        reversedNum(num) {
            return parseInt(num.toString().split('').reverse().join(''), 10)
        },
        handleReversedBet() {
            const uniqueNumbers = new Set()
            const finalOrderedNumbers = []

            this.twodNumbers.forEach((number) => {
                const formattedNumber = number.padStart(2, '0')
                const reversedNumber = this.reversedNum(number).toString().padStart(2, '0')
                uniqueNumbers.add(formattedNumber)

                if (!finalOrderedNumbers.includes(formattedNumber)) {
                    finalOrderedNumbers.push(formattedNumber)
                }

                if (!finalOrderedNumbers.includes(reversedNumber) && formattedNumber !== reversedNumber) {
                    finalOrderedNumbers.push(reversedNumber)
                }
            })
            this.twodStore.SET_TWOD_NUMBERS(finalOrderedNumbers)
        },
        async getTwodNumbers() {
            this.loading = true;
            let res = await this.$axios.get(
                `/auth/twod-numbers`,
                {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            this.numbersData = res.data;
            this.loading = false;
        }
    },
    created() {
        this.twodStore = useTwodStore()
        this.currentDay = new Date().toLocaleString('default', {
            weekday: 'short'
        })
    },
    mounted() {
        this.getTwodNumbers();
        if (!this.selectedTime) {
            this.$router.push('/twod/bet-select-time')
        }
    }
}
</script>
<style scoped>
.bet-container {
    position: fixed;
    bottom: 64px;
    background-color: var(--primary-color);
    padding: 1rem;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    border-bottom: 14px solid whitesmoke;
}
</style>
