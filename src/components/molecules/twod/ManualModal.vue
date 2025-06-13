<template>
    <section>
        <span class="block mb-2">{{ $t('enter_bet_numbers') }}({{ $t('eg') }} - 01, 02, 03,...)</span>
        <input v-model="inputNumbers" type="text" placeholder="01, 02, 03, 04..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': error }" />
        <div v-if="error" class="text-danger mt-1 text-sm">{{ error }}</div>
        <div class="flex mt-3 gap-2">
            <button @click="clearInput" class="w-1/2 bg-danger text-white py-2 rounded-md  transition">{{ $t('delete')
                }}</button>
            <button @click="generateManualDigit" class="w-1/2 bg-success text-white py-2 rounded-md  transition"
                data-bs-dismiss="modal">{{ $t('confirm') }}</button>
        </div>
    </section>
</template>

<script>
import { useTwodStore } from '@/modules/twod/store/twodStore'

export default {
    data() {
        return {
            inputNumbers: '',
            error: null,
            pairs: []
        }
    },
    watch: {
        inputNumbers(value) {
            this.error = null
            if (!this.isValidInput(value)) {
                this.error = this.$t('invalid_number_sequence') + ' (' + this.$t('eg') + ' - 01, 02, 03, ...)'
            }
        }
    },
    computed: {
        uniqueNumbers() {
            return this.inputNumbers
                .split(',')
                .map((num) => num.trim())
                .filter((num) => this.isValidTwoDigitNumber(num))
                .filter((num, index, self) => self.indexOf(num) === index)
        }
    },
    methods: {
        generateManualDigit() {
            if (this.uniqueNumbers.length < 2) {
                this.error = this.$t('minimum_two_digits') + ' (' + this.$t('eg') + ' - 01, 02, 03, ...)'
                alert(this.error)
                return
            }

            // Use a Set to avoid duplicates
            let uniquePairs = new Set()

            for (let i = 0; i < this.uniqueNumbers.length; i++) {
                for (let j = i + 1; j < this.uniqueNumbers.length; j++) {
                    uniquePairs.add(`${this.uniqueNumbers[i]}`)
                    uniquePairs.add(`${this.uniqueNumbers[j]}`)
                }
            }

            // Convert the Set back to an array
            this.pairs = Array.from(uniquePairs)
            this.twodStore.SET_TWOD_NUMBERS(this.pairs)
            this.inputNumbers = ''
        },
        isValidInput(value) {
            const numbers = value.split(',').map((num) => num.trim())
            return numbers.length >= 2 && numbers.every((num) => this.isValidTwoDigitNumber(num))
        },
        isValidTwoDigitNumber(num) {
            return /^[0-9]{2}$/.test(num)
        },
        clearInput() {
            this.error = null
            this.inputNumbers = ''
            this.pairs = []
        }
    },
    created() {
        this.twodStore = useTwodStore()
    }
}
</script>
