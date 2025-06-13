<template>
    <section>
        <span class="block mb-2 text-danger">{{ $t('duplicate_numbers_not_allowed') }} ({{ $t('eg') }} - 0011
            ...)</span>
        <input v-model="numbers" type="text" :maxlength="10" :placeholder="$t('number_range')"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-danger': error }" />
        <div v-if="error" class="text-danger text-sm mt-1">{{ error }}</div>
        <div class="flex mt-3 gap-2">
            <button @click="removePairs" class="w-1/2 px-4 py-2 bg-danger text-white rounded-md">{{ $t('delete')
            }}</button>
            <button @click="generateDigitPairs" class="w-1/2 px-4 py-2 bg-success text-white rounded-md">{{
                $t('confirm') }}</button>
        </div>
    </section>
</template>

<script>
import { useThreedStore } from '@/modules/threed/threedStore'

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
                alert(this.error)
                return
            }
            if (this.checkRepeatedNumbers(this.numbers)) {
                this.error = this.$t('duplicate_numbers_not_allowed')
                alert(this.error)
                return
            }

            const digits = this.numbers.toString().split('')
            this.pairs = this.getTwoDigitPermutations(digits)

            this.threedStore.SET_THREED_NUMBERS(this.pairs)
            this.numbers = null
            this.error = null
        },

        getTwoDigitPermutations(digits) {
            let result = []

            for (let i = 0; i < digits.length; i++) {
                for (let j = 0; j < digits.length; j++) {
                    for (let k = 0; k < digits.length; k++) {
                        result.push(digits[i] + digits[j] + digits[k])
                    }
                }
            }
            return result
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
        this.threedStore = useThreedStore()
    }
}
</script>
