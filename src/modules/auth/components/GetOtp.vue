<template>
    <div class="p-4 w-full max-w-md mb-14">
        <div class="flex justify-center mb-6">
            <img alt="Illustration of a hand holding a phone with a shield in the background" class="w-40 h-40" height="150" src="https://storage.googleapis.com/a1aa/image/Jl1O8hEOOHWxH5GJb1Zd3lmzbUj1CTKN65BAjZZ5kLw.jpg" width="150" />
        </div>
        <h1 class="text-2xl font-bold text-center mb-2">{{ $t('otp_verification') }}</h1>
        <p class="text-gray-200 text-center mb-6">{{ $t('enter_verification_code') }}</p>

        <form @submit.prevent="handleVerify">
            <div class="flex justify-center space-x-2 mb-6">
                <input
                    v-for="(digit, index) in otp"
                    :key="index"
                    class="w-12 h-12 text-center border rounded-lg text-lg"
                    maxlength="1"
                    type="text"
                    v-model="otp[index]"
                    @input="handleInput($event, index)"
                    @keydown.backspace="handleBackspace(index)"
                />
            </div>
            <button class="w-full bg-success text-white py-3 rounded-lg mb-4">{{ $t('verify') }}</button>
        </form>

        <p class="text-center text-gray-200">
            {{ $t('didnt_receive_code') }}
            <a class="text-blue-600 cursor-pointer" @click="resendOtp"> {{ $t('resend') }} </a>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const otp = ref(Array(6).fill(''))

const emit = defineEmits(['verify-otp'])

const handleInput = (event, index) => {
    const value = event.target.value

    if (!/^\d$/.test(value)) {
        event.target.value = ''
        return
    }

    otp.value[index] = value

    if (index < otp.value.length - 1) {
        document.querySelectorAll("input[type='text']")[index + 1].focus()
    }
}

const handleBackspace = (index) => {
    if (!otp.value[index] && index > 0) {
        document.querySelectorAll("input[type='text']")[index - 1].focus()
    }
}

const handleVerify = () => {
    const enteredOtp = otp.value.join('')
    emit('verify-otp', enteredOtp)
}

const resendOtp = () => {
    otp.value = Array(6).fill('')
}
</script>
