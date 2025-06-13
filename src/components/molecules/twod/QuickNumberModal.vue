<template>
    <div>
        <div class="mb-4 overflow-auto max-h-80">
            <div class="flex flex-wrap justify-center gap-2">
                <div v-for="(item, index) in quickKeys" :key="index" @click="handleQuickKeys(item)"
                    class="p-2 rounded flex justify-center items-center w-[65px] h-[65px] cursor-pointer text-white"
                    :class="item.isSelected ? 'bg-gold' : 'bg-gray-500'">
                    {{ item.key }}
                </div>
            </div>
            <hr class="my-4 border-gray-300" />
            <div v-for="(type, index) in quickNumbertypes" :key="index">
                <div>
                    <h5 class="mt-2 mb-4 font-semibold">
                        {{ $t(type) }}
                    </h5>
                    <div class="flex flex-wrap justify-center gap-2">
                        <div v-for="number in quickNumbers[type]" :key="number"
                            class="p-2 rounded flex justify-center items-center w-[65px] h-[65px] cursor-pointer text-white"
                            :class="number.isSelected ? 'bg-gold' : 'bg-gray-500'"
                            @click="handleQuickNumbers(type, number)">
                            {{ number.key }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTwodStore } from '@/modules/twod/store/twodStore'

export default {
    props: {
        removeSelectedQuickKeys: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            quickNumbertypes: ['front', 'end', 'brake'],
            quickNumbers: {
                front: [
                    { key: '0', isSelected: false },
                    { key: '1', isSelected: false },
                    { key: '2', isSelected: false },
                    { key: '3', isSelected: false },
                    { key: '4', isSelected: false },
                    { key: '5', isSelected: false },
                    { key: '6', isSelected: false },
                    { key: '7', isSelected: false },
                    { key: '8', isSelected: false },
                    { key: '9', isSelected: false }
                ],
                end: [
                    { key: '0', isSelected: false },
                    { key: '1', isSelected: false },
                    { key: '2', isSelected: false },
                    { key: '3', isSelected: false },
                    { key: '4', isSelected: false },
                    { key: '5', isSelected: false },
                    { key: '6', isSelected: false },
                    { key: '7', isSelected: false },
                    { key: '8', isSelected: false },
                    { key: '9', isSelected: false }
                ],
                brake: [
                    { key: '1', isSelected: false },
                    { key: '2', isSelected: false },
                    { key: '3', isSelected: false },
                    { key: '4', isSelected: false },
                    { key: '5', isSelected: false },
                    { key: '6', isSelected: false },
                    { key: '7', isSelected: false },
                    { key: '8', isSelected: false },
                    { key: '9', isSelected: false },
                    { key: '0', isSelected: false }
                ]
            },
            quickKeys: [
                { key: 'စုံစုံ', value: 'ss', isSelected: false },
                { key: 'မမ', value: 'mm', isSelected: false },
                { key: 'စုံမ', value: 'sm', isSelected: false },
                { key: 'မစုံ', value: 'ms', isSelected: false },
                { key: 'စုံပူး', value: 'sp', isSelected: false },
                { key: 'မပူး', value: 'mp', isSelected: false },
                { key: 'အပူးစုံ', value: 'aps', isSelected: false },
                { key: 'ညီကို', value: 'nk', isSelected: false },
                { key: 'ကိုညီ', value: 'kn', isSelected: false },
                { key: 'ပါဝါ', value: 'pw', isSelected: false },
                { key: 'ပါဝါ-R', value: 'pwr', isSelected: false },
                { key: 'နက္ခတ်', value: 'nkt', isSelected: false },
                { key: 'နက္ခတ်-R', value: 'nktr', isSelected: false }
            ],
            evenNums: [],
            oddNums: [],
            evenOddNumbers: [],
            oddEvenNumbers: [],
            evenSquareNumbers: [],
            oddSquareNumbers: [],
            sameNumbers: [],
            smallBigNumbers: [],
            bigSmallNumbers: [],
            powerNumbers: ['05', '16', '27', '38', '49'],
            powerRNumbers: ['50', '61', '72', '83', '94'],
            constellationNumbers: ['07', '18', '24', '35', '69'],
            constellationRNumbers: ['70', '81', '42', '53', '96']
        }
    },
    watch: {
        removeSelectedQuickKeys(newValue) {
            if (newValue) {
                this.quickKeys = this.quickKeys.map((item) => {
                    item.isSelected = false
                    return item
                })

                this.quickNumbers = Object.keys(this.quickNumbers).reduce((acc, type) => {
                    acc[type] = this.quickNumbers[type].map((item) => {
                        item.isSelected = false
                        return item
                    })
                    return acc
                }, {})
            }
        }
    },
    computed: {
        twodNumbers() {
            return this.twodStore.twodNumbers
        }
    },
    methods: {
        handleQuickKeys(item) {
            switch (item.value) {
                case 'ss':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.evenNums)
                    } else {
                        for (let i = 0; i < 100; i += 2) {
                            this.evenNums.push(i < 10 ? `0${i}` : `${i}`)
                        }
                        this.uniqueCombinedGenerator(this.evenNums)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'mm':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.oddNums)
                    } else {
                        for (let i = 1; i < 100; i += 2) {
                            this.oddNums.push(i < 10 ? `0${i}` : `${i}`)
                        }
                        this.uniqueCombinedGenerator(this.oddNums)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'sm':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.evenOddNumbers)
                    } else {
                        for (let i = 0; i < 100; i++) {
                            const evenDigit = i % 10 // Even
                            const oddDigit = Math.floor(i / 10) // Odd

                            if (oddDigit % 2 === 1 && evenDigit % 2 === 0) {
                                this.evenOddNumbers.push(`${evenDigit}${oddDigit}`)
                            }
                        }
                        this.uniqueCombinedGenerator(this.evenOddNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'ms':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.oddEvenNumbers)
                    } else {
                        for (let i = 0; i < 100; i++) {
                            const oddDigit = Math.floor(i / 10) // Odd
                            const evenDigit = i % 10 // Even

                            if (oddDigit % 2 === 1 && evenDigit % 2 === 0) {
                                this.oddEvenNumbers.push(`${oddDigit}${evenDigit}`)
                            }
                        }
                        this.uniqueCombinedGenerator(this.oddEvenNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'sp':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.evenSquareNumbers)
                    } else {
                        for (let i = 0; i <= 9; i += 2) {
                            this.evenSquareNumbers.push(`${i}${i}`)
                        }
                        this.uniqueCombinedGenerator(this.evenSquareNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'mp':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.oddSquareNumbers)
                    } else {
                        for (let i = 1; i <= 9; i += 2) {
                            this.oddSquareNumbers.push(`${i}${i}`)
                        }
                        this.uniqueCombinedGenerator(this.oddSquareNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'aps':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.sameNumbers)
                    } else {
                        for (let i = 0; i < 100; i++) {
                            const number = ('0' + i).slice(-2) // Add leading zero and take last two digits
                            if (number[0] === number[1]) {
                                this.sameNumbers.push(number)
                            }
                        }
                        this.uniqueCombinedGenerator(this.sameNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'nk':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.smallBigNumbers)
                    } else {
                        for (let i = 0; i < 9; i++) {
                            this.smallBigNumbers.push(`${i}${i + 1}`)
                        }
                        this.uniqueCombinedGenerator(this.smallBigNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'kn':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.bigSmallNumbers)
                    } else {
                        for (let i = 0; i < 9; i++) {
                            this.bigSmallNumbers.push(`${i + 1}${i}`)
                        }
                        this.uniqueCombinedGenerator(this.bigSmallNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break

                case 'pw':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.powerNumbers)
                    } else {
                        this.uniqueCombinedGenerator(this.powerNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break
                case 'pwr':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.powerRNumbers)
                    } else {
                        this.uniqueCombinedGenerator(this.powerRNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break
                case 'nkt':
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.constellationNumbers)
                    } else {
                        this.uniqueCombinedGenerator(this.constellationNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break
                default:
                    if (item.isSelected) {
                        this.twodStore.REMOVE_TWOD_NUMBERS(this.constellationRNumbers)
                    } else {
                        this.uniqueCombinedGenerator(this.constellationRNumbers)
                    }

                    item.isSelected = !item.isSelected
                    break
            }
        },
        uniqueCombinedGenerator(numbers) {
            const uniqueTwodNumbers = new Set(this.twodNumbers)
            const uniqueGeneratedNumbers = new Set(numbers)

            // Combine the unique sets
            const combinedSet = new Set([...uniqueTwodNumbers, ...uniqueGeneratedNumbers])

            // Convert the set back to an array
            const combinedArray = Array.from(combinedSet)
            this.twodStore.SET_TWOD_NUMBERS(combinedArray)
        },
        generateNumbers(type, number) {
            if (type === 'brake') {
                if (number == 1) {
                    return ['01', '10']
                }
                if (number == 2) {
                    return ['02', '20', '11', '56', '65', '47', '74', '83', '38', '29', '92']
                }
                if (number == 3) {
                    return ['03', '30', '12', '21', '66', '57', '75', '84', '48', '39', '93']
                }
                if (number == 4) {
                    return ['04', '40', '13', '31', '67', '76', '58', '85', '49', '94', '22']
                }
                if (number == 5) {
                    return ['05', '50', '23', '32', '14', '41', '68', '86', '77', '59', '95']
                }
                if (number == 6) {
                    return ['06', '60', '15', '51', '24', '42', '33', '78', '87', '69', '96']
                }
                if (number == 7) {
                    return ['07', '70', '16', '61', '25', '52', '34', '43', '88', '79', '97']
                }
                if (number == 8) {
                    return ['08', '80', '17', '71', '26', '62', '35', '53', '44', '89', '98']
                }
                if (number == 9) {
                    return ['09', '90', '18', '81', '27', '72', '36', '63', '45', '54', '99']
                }
                if (number == 0) {
                    return ['00', '19', '28', '37', '46', '55', '64', '73', '82', '91']
                }
            }

            return Array.from({ length: 10 }, (_, index) => (type === 'front' ? number + '' + index : index + '' + number))
        },
        handleQuickNumbers(type, number) {
            let generatedNumbers = this.generateNumbers(type, number.key)
            if (number.isSelected) {
                this.twodStore.REMOVE_TWOD_NUMBERS(generatedNumbers)
            } else {
                this.uniqueCombinedGenerator(generatedNumbers)
            }
            number.isSelected = !number.isSelected
        }
    },
    created() {
        this.twodStore = useTwodStore()
    }
}
</script>
