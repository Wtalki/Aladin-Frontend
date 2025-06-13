import { ref } from 'vue'

export function useForget() {
    const currentForm = ref('phone')
    const phone = ref('')

    const handleSendCode = () => {
        console.log('Code sent to:', phone.value)
        currentForm.value = 'otp'
    }

    const handleVerifyOtp = () => {
        console.log('OTP verified')
        currentForm.value = 'resetPassword'
    }

    return {
        handleSendCode,
        handleVerifyOtp,
        currentForm,
        phone
    }
}
