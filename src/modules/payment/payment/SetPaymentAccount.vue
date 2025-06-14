<template>
    <section class="space-y-5 p-5 appWidth mx-auto bg-secondary h-[150vh]">
        <h1 class="text-center text-lg text-light font-semibold">ဘဏ်အကောင့်သတ်မှတ်မည်</h1>
        <ul class="font-semibold list-disc text-gold px-4">
            <li>ငွေထုတ်မည့်ဘဏ်အကောင့်သတ်မှတ်ပါ။</li>
            <li>ဘဏ်တစ်ခုကိုအကောင့်တစ်ခုသာသတ်မှတ်နိုင်ပါသည်။</li>
            <li>သတ်မှတ်ထားသောဘဏ်အကောင့်များကိုပြောင်းလဲလိုပါကဝန်ဆောင်မှုဌာနသို့ဆက်သွယ်ပါ။</li>
        </ul>
        <div class="rounded-md shadow-md bg-white py-3 flex flex-wrap justify-center items-center gap-3">
            <div v-for="(payment, index) in bankTypes" :key="index"
                :class="selectedBankType === payment.id ? 'border-[2.5px] border-primary' : ''"
                class="text-center p-2 bg-gray rounded-md cursor-pointer" @click="selectBankType(payment.id)">
                <img :src="payment.image" :alt="payment.name" class="w-20 h-20 rounded-md" />
                <span class="text-sm font-medium">{{ payment.name }}</span>
            </div>
        </div>
        <form class="space-y-2" @submit="addBankAccount">
            <Input
                class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                placeholder="သင်၏ဘဏ်အကောင့်အမည်ကိုထည့်ပါ" v-model="bankAccName" />
            <Input type="number"
                class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                placeholder="ငွေလက်ခံမည့်အကောင့်သတ်မှတ်ပါ" v-model="bankAccNo" />
            <Input type="number"
                class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-secondary outline-none"
                placeholder="ငွေလက်ခံမည့်အကောင့်ကိုအတည်ပြုပါ" v-model="confirmBankAccNo" />
            <Button type="submit"
                class="py-3 w-full px-4 text-center rounded-lg leading-5 text-primary bg-gold border border-secondary">အတည်ပြုသည်</Button>
        </form>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'
import EventBus from '@/libs/AppEventBus'

export default {
    components: {
        Input,
        Button
    },
    data() {
        return {
            bankTypes: [],
            selectedBankType: null,
            bankAccName: null,
            bankAccNo: null,
            confirmBankAccNo: null,
            loading: false,
        }
    },
    computed: mapGetters(["token"]),
    methods: {
        async addBankAccount(e) {
            e.preventDefault()
            if (this.bankAccNo !== this.confirmBankAccNo) {
                EventBus.emit('show-toast', {
                    severity: 'error',
                    summary: '',
                    detail: "Bank Acc No Doesn't match",
                    life: 2000
                })
                return
            }
            try {
                const response = await this.$axios.post('/auth/bankacc/store',
                    {
                        bankAccName: this.bankAccName,
                        bankAccNo: this.bankAccNo,
                        confirmBankAccNo: this.confirmBankAccNo,
                        selectedBankType: this.selectedBankType
                    },
                    {
                        headers: {
                            Authorization: 'Bearer' + this.token
                        }
                    }
                )
                if (response.status === 200) {
                    EventBus.emit('show-toast', {
                        severity: 'info',
                        summary: '',
                        detail: response.data.message,
                        life: 2000
                    })
                    this.$router.push('/')
                    this.loading = false;
                }
            } catch (e) {
                const errors = e.response.data.errors

                for (const field in errors) {
                    errors[field].forEach(errorMessage => {
                        EventBus.emit('show-toast', {
                            severity: 'error',
                            summary: '',
                            detail: errorMessage,
                            life: 2000
                        })
                    })
                }
                this.loading = false;
            }
        },
        selectBankType(bankTypeId) {
            this.selectedBankType = bankTypeId
        },
        async getBankTypes() {
            const res = await this.$axios.get(`/auth/all/banktypes`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })

            this.bankTypes = res.data
        },
    },
    mounted() {
        this.getBankTypes()
    }
}
</script>
