<template>
    <section>
        <span class="block mb-2 text-red-500">{{ $t('duplicate_numbers_not_allowed') }} ({{ $t('eg') }} - 020 , 121 ,
            ...)</span>
        <input v-model="numbers" type="number" :maxlength="10" :placeholder="$t('number_range')"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': error }" />
        <div v-if="error" class="text-danger text-sm mt-1">{{ error }}</div>
        <div class="flex mt-3 gap-2">
            <button @click="removePairs" class="w-1/2 px-4 py-2 bg-danger text-white rounded-md ">{{
                $t('delete') }}</button>
            <button @click="generateDigitPairs" class="w-1/2 px-4 py-2 bg-success text-white rounded-md ">{{
                $t('confirm')
            }}</button>
        </div>
    </section>
</template>

<script>
import { useTwodStore } from '@/modules/twod/store/twodStore'

export default {
    data() {
        return {
            numbers: null,
            error: null,
            pairs: []
        }
    },
    methods: {
        generateDigitPairs() {
            if (!this.numbers || this.numbers.length < 2) {
                this.error = this.$t('minimum_two_digits')
                this.$EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: this.error,
                    life: 2000
                })
                return
            }
            if (this.checkRepeatedNumbers(this.numbers)) {
                this.error = this.$t('duplicate_numbers_not_allowed')
                this.$EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: this.error,
                    life: 2000
                })
                return
            }

            this.pairs = []

            const uniquePairs = new Set()
            const digits = this.numbers.toString().split('')

            for (let i = 0; i < digits.length; i++) {
                for (let j = i + 1; j < digits.length; j++) {
                    uniquePairs.add(digits[i] + digits[j])
                    uniquePairs.add(digits[j] + digits[i])
                }
            }

            this.pairs = Array.from(uniquePairs)
            this.twodStore.SET_TWOD_NUMBERS(this.pairs)
            this.numbers = null
            this.error = null
        },
        checkRepeatedNumbers(input) {
            if (!input) return false

            const chars = input.toString().split('')
            const frequency = {}

            for (const char of chars) {
                if (frequency[char]) {
                    return true
                } else {
                    frequency[char] = 1
                }
            }
            return false
        },
        removePairs() {
            this.error = null
            this.numbers = null
            this.pairs = []
        }
    },
    created() {
        this.twodStore = useTwodStore()
    }
}
</script>
