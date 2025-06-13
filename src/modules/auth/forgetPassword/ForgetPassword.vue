<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="bg-secondary min-h-screen flex flex-col items-center p-2 justify-between appWidth">
            <div class="flex justify-start items-start w-full mt-2 ps-4">
                <router-link to="/login" class="hover:bg-gray-200 border border-[#808080] p-2 rounded-2xl shadow-sm transication-all duration-200">
                    <img src="../../../assets/images/svg/leftarrow1.svg" width="25" alt="" />
                </router-link>
            </div>
            <div class="p-4 w-full max-w-md mb-14">
                <div v-if="currentForm === 'phone'">
                    <div class="flex justify-center mb-6">
                        <img class="rounded-full" :src="require('@/assets/icons/88Lotto.png')" width="230" alt="Logo" />
                    </div>
                    <h1 class="text-2xl font-bold text-success mb-2">{{ $t('forget_password') }}</h1>
                    <p class="text-gray-100 mb-6">{{ $t('dont_worry') }}</p>
                    <form @submit.prevent="handleSendCode">
                        <div class="mb-4">
                            <label class="block text-gray-200 mb-2"> {{ $t('phone') }} </label>
                            <input class="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-success" :placeholder="$t('enter_phone')" type="phone" v-model="phone" required />
                        </div>

                        <button class="w-full py-3 rounded-full bg-success text-white font-bold" type="submit">{{ $t('send_code') }}</button>
                    </form>
                </div>

                <GetOtp v-if="currentForm === 'otp'" @verify-otp="handleVerifyOtp" />

                <ResetPassword v-if="currentForm === 'resetPassword'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import GetOtp from '../components/GetOtp.vue'
import ResetPassword from '../components/ResetPassword.vue'
import { useForget } from './useForgetPassword'

const { handleSendCode, handleVerifyOtp, currentForm, phone } = useForget()
</script>

<style scoped></style>
