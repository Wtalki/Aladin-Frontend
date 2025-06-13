<template>
    <div class="mb-4 overflow-auto max-h-80">
        <div v-for="(type, index) in quickNumbertypes" :key="index">
            <div>
                <h5 class="mt-2 mb-4 font-semibold">
                    {{ $t(type) }}
                </h5>
                <div class="flex flex-wrap justify-center gap-2">
                    <div
                        v-for="number in quickNumbers[type]"
                        :key="number.key"
                        class="p-2 rounded flex justify-center items-center w-[65px] h-[65px] cursor-pointer text-white"
                        :class="number.isSelected ? 'bg-success' : 'bg-gray-500'"
                        @click="handleQuickNumbers(type, number)"
                    >
                        {{ number.key }}
                    </div>
                </div>
            </div>
            <hr class="my-4 border-gray-300" />
        </div>
    </div>
</template>

<script>
import { useThreedStore } from '@/modules/threed/threedStore'

export default {
    data() {
        return {
            quickNumbertypes: ['hundred', 'same', 'brake'],
            quickNumbers: {
                hundred: [
                    { key: '100', isSelected: false },
                    { key: '200', isSelected: false },
                    { key: '300', isSelected: false },
                    { key: '400', isSelected: false },
                    { key: '500', isSelected: false },
                    { key: '600', isSelected: false },
                    { key: '700', isSelected: false },
                    { key: '800', isSelected: false },
                    { key: '900', isSelected: false }
                ],
                same: [
                    { key: '000', isSelected: false },
                    { key: '111', isSelected: false },
                    { key: '222', isSelected: false },
                    { key: '333', isSelected: false },
                    { key: '444', isSelected: false },
                    { key: '555', isSelected: false },
                    { key: '666', isSelected: false },
                    { key: '777', isSelected: false },
                    { key: '888', isSelected: false },
                    { key: '999', isSelected: false }
                ],
                brake: [
                    { key: '0', isSelected: false },
                    { key: '1', isSelected: false },
                    { key: '2', isSelected: false },
                    { key: '3', isSelected: false },
                    { key: '4', isSelected: false },
                    { key: '5', isSelected: false },
                    { key: '6', isSelected: false },
                    { key: '7', isSelected: false },
                    { key: '8', isSelected: false },
                    { key: '9', isSelected: false },
                    { key: '10', isSelected: false },
                    { key: '11', isSelected: false },
                    { key: '12', isSelected: false },
                    { key: '13', isSelected: false },
                    { key: '14', isSelected: false },
                    { key: '15', isSelected: false },
                    { key: '16', isSelected: false },
                    { key: '17', isSelected: false },
                    { key: '18', isSelected: false },
                    { key: '19', isSelected: false },
                    { key: '20', isSelected: false },
                    { key: '21', isSelected: false },
                    { key: '22', isSelected: false },
                    { key: '23', isSelected: false },
                    { key: '24', isSelected: false },
                    { key: '25', isSelected: false },
                    { key: '26', isSelected: false },
                    { key: '27', isSelected: false }
                ]
            }
        }
    },
    computed: {
        threedNumbers() {
            return this.threedStore.threedNumbers
        }
    },
    methods: {
        uniqueCombinedGenerator(numbers) {
            const uniqueTwodNumbers = new Set(this.threedNumbers)
            const uniqueGeneratedNumbers = new Set(numbers)
            const combinedSet = new Set([...uniqueTwodNumbers, ...uniqueGeneratedNumbers])
            this.threedStore.SET_THREED_NUMBERS(Array.from(combinedSet))
        },
        generateNumbers(type, number) {
            if (type === 'hundred' || type === 'same') {
                return [number]
            }

            if (type === 'brake') {
                let sumValue = parseInt(number)
                let result = []

                for (let i = 0; i <= 9; i++) {
                    for (let j = 0; j <= 9; j++) {
                        for (let k = 0; k <= 9; k++) {
                            if (i + j + k === sumValue) {
                                result.push(`${i}${j}${k}`)
                            }
                        }
                    }
                }
                return result
            }

            return []
        },
        handleQuickNumbers(type, number) {
            let generatedNumbers = this.generateNumbers(type, number.key)

            if (number.isSelected) {
                this.threedStore.REMOVE_THREED_NUMBERS(generatedNumbers)
            } else {
                this.uniqueCombinedGenerator(generatedNumbers)
            }

            number.isSelected = !number.isSelected
        }
    },
    created() {
        this.threedStore = useThreedStore()
    }
}
</script>
