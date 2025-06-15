<template>
    <section>
        <div class="h-[150vh]" :loading="loading" v-if="loading">
            <Loading />
        </div>
        <main v-else>
            <div class="flex flex-col w-full mx-auto rounded-lg overflow-auto min-h-screen">
                <div class="flex justify-between px-3 items-center">
                    <div class="cursor-pointer flex justify-center items-center text-primary font-semibold"
                        @click="handleColorModal">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="blue" class="w-8 h-8" viewBox="0 0 512 512">
                                <path
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                        </div>
                        <h1>{{ $t('color_clarification') }}</h1>
                    </div>
                    <select v-model="selectedGroup" class="p-2 w-[100px] border rounded bg-white text-black">
                        <option value="all">{{ $t('all') }}</option>
                        <option v-for="group in numberGroups" :key="group" :value="group">
                            {{ group }}
                        </option>
                    </select>
                </div>

                <div class="flex flex-wrap justify-center mt-4 pb-52">
                    <button v-for="number in filteredNumbers" :key="number.number" @click="addThreedNumbers(number)"
                        :class="[
                            'm-2 border rounded flex flex-col justify-between items-center w-14 h-14 cursor-pointer transition-all',
                            (threedNumbers.includes(number.number) && number.remaining_limit_amount > 0) ? '!bg-gold text-white' : '!bg-light',
                            number.remaining_limit_amount == 0 ? 'opacity-50 cursor-not-allowed' : ''
                        ]" :disabled="number.remaining_limit_amount == 0">
                        <div class="mt-1 text-lg font-semibold">{{ number.number }}</div>
                        <div class="w-full rounded" :class="{
                            '!bg-success h-1': number.remaining_limit_amount >= (number.original_limit_amount / 2),
                            '!bg-gold h-1': number.remaining_limit_amount < (number.original_limit_amount / 2) && number.remaining_limit_amount > (number.original_limit_amount / 10),
                            '!bg-danger h-1': number.remaining_limit_amount <= (number.original_limit_amount / 10) && number.remaining_limit_amount > 0,
                            '!bg-gray h-1': number.remaining_limit_amount == 0
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
                            class="w-full !bg-gold text-black py-2 rounded-lg font-semibold">{{ $t('section')
                            }}</button>
                        <button @click="handleManualModal"
                            class="w-full bg-gray text-white py-2 rounded-lg font-semibold">{{ $t('enter')
                            }}</button>
                        <button @click="handleReversedRoundBet"
                            class="w-full !bg-black text-white py-2 rounded-lg font-semibold">{{ $t('add_r')
                            }}</button>
                        <button @click="handleQuickModal"
                            class="w-full !bg-blue-500 text-white py-2 rounded-lg font-semibold">{{
                                $t('quick_select') }}</button>
                    </div>

                    <div class="flex space-x-2 mt-3">
                        <button @click="handleRemoveNumbers"
                            class="w-full !bg-danger text-white py-2 rounded-lg font-semibold">{{ $t('clear_all')
                            }}</button>
                        <button @click="handleBetThreedSubmit"
                            class="w-full !bg-gold text-white py-2 rounded-lg font-semibold flex items-center justify-center">
                            {{ $t('order_numbers') }} -
                            <span class="!bg-danger text-white ml-2 px-2 rounded-full text-sm">
                                {{ threedNumbers?.length }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </section>

    <Dialog v-model:visible="showDialog" modal :closable="false" class="modalWidth" :pt="{
        content: 'shadow-lg rounded-b-lg'
    }"
        :style="{ backgroundColor: '#f8fafc', borderWidth: '1px', borderColor: '#bdbbbb71', borderStyle: 'solid', borderRadius: '6px', padding: '20px', backdropFilter: 'blur(12px)' }">
        <template #header>
            <div class="w-full flex justify-between items-center">
                <h2 class="text-xl font-bold">{{ modal.title }}</h2>
                <Button icon="pi pi-times" @click="showDialog = false"
                    class="p-1 flex justify-center items-center p-button-danger" />
            </div>
        </template>
        <ColorModal v-if="modal.id == 'ColorModal'" />
        <RoundModal v-if="modal.id == 'RoundModal'" />
        <ManualModal v-if="modal.id == 'ManualModal'" />
        <ThreedQuickNumberModal v-if="modal.id == 'ThreedQuickNumberModal'" />
    </Dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useThreedStore } from '@/modules/threed/threedStore'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import ColorModal from '@/components/molecules/ColorModal.vue'
import RoundModal from '@/components/molecules/threed/RoundModal.vue'
import ManualModal from '@/components/molecules/threed/ManualModal.vue'
import ThreedQuickNumberModal from '@/components/molecules/threed/ThreedQuickNumberModal.vue'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Dialog,
        Button,
        ColorModal,
        RoundModal,
        ManualModal,
        ThreedQuickNumberModal,
        Loading
    },
    data() {
        return {
            numbersData: [],
            selectedGroup: 'all',
            modal: {
                id: null,
                title: null
            },
            amount: null,
            error: null,
            loading: false,
            showDialog: false
        }
    },
    computed: {
        ...mapGetters(["token", "user", "threedSetting"]),
        threedNumbers() {
            return this.threedStore.threedNumbers
        },
        numberGroups() {
            return Array.from({ length: 10 }, (_, i) => `${i}00`) // ["000", "100", ..., "900"]
        },
        filteredNumbers() {
            if (this.selectedGroup === 'all') {
                return this.numbersData
            }

            let min = parseInt(this.selectedGroup)
            let max = min + 99 // Ensure it stops at 999

            return this.numbersData.filter((num) => parseInt(num.number) >= min && parseInt(num.number) <= max)
        }
    },
    methods: {
        ...mapActions(['fetchThreedSetting']),
        async getThreedNumbers() {
            this.loading = true;
            let res = await this.$axios.get(
                `/auth/threed-numbers`,
                {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            this.numbersData = res.data;
            this.loading = false;
        },
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
            this.modal.id = 'ThreedQuickNumberModal'
                ; (this.modal.title = this.$t('enter_quick_select')), (this.showDialog = true)
        },
        addThreedNumbers(number) {
            if (number.remaining_limit_amount == 0) {
                return
            }
            this.threedStore.SET_THREED_NUMBERS(number.number)
        },
        handleRemoveNumbers() {
            this.amount = null
            this.threedStore.SET_THREED_NUMBERS([])
            localStorage.removeItem('threedNumbers')
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        handleBetThreedSubmit() {
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

            if (this.amount && this.threedNumbers?.length > 0) {
                const updatedTransactionData = this.threedNumbers.map((number) => {
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

                const existingNumbers = JSON.parse(localStorage.getItem('threedNumbers')) || []

                const combinedNumbers = [...existingNumbers, ...updatedTransactionData]

                localStorage.setItem('threedNumbers', JSON.stringify(combinedNumbers))

                setTimeout(() => {
                    this.$router.push({
                        path: '/threed/bet-confirm'
                    })
                }, 300)
            }
        },
        reversedNum(num) {
            return parseInt(num.toString().split('').reverse().join(''), 10)
        },
        handleReversedRoundBet() {
            const uniqueNumbers = new Set()

            this.threedNumbers.forEach((number) => {
                const formattedNumber = number.padStart(3, '0')
                const permutations = this.getPermutations(formattedNumber)

                permutations.forEach((perm) => uniqueNumbers.add(perm))
            })

            this.threedStore.SET_THREED_NUMBERS(Array.from(uniqueNumbers))
        },
        getPermutations(num) {
            if (num.length !== 3) return [num] // Ensure it's always a 3-digit number

            const result = new Set()

            const permute = (arr, m = '') => {
                if (arr.length === 0) {
                    result.add(m)
                } else {
                    for (let i = 0; i < arr.length; i++) {
                        let current = arr.slice()
                        let next = current.splice(i, 1)
                        permute(current, m + next)
                    }
                }
            }

            permute(num.split(''))
            return Array.from(result)
        }
    },
    created() {
        this.threedStore = useThreedStore()
        if (this.token) {
            this.fetchThreedSetting();
        }
    },
    mounted() {
        this.getThreedNumbers();
        if (!this.threedSetting?.status) {
            this.$router.push("/threed");
        }
    }
}
</script>
<style scoped>
.bet-container {
    position: fixed;
    bottom: 64px;
    background-color: var(--secondary-color);
    padding: 1rem;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    border-bottom: 14px solid whitesmoke;
}
</style>
