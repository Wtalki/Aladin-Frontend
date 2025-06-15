<template>
    <div class="min-h-screen flex flex-col items-center justify-between appWidth">
        <div class="p-4 w-full max-w-md mb-14">
            <h1 class="text-xl font-bold text-primary mb-4 text-center">{{ $t('Change_Password') }}</h1>
            <form @submit.prevent="changePin">

                <div class="mb-3 relative">
                    <label class="block text-gray-100 mb-2 text-primary">{{ $t('Old_Password') }}</label>
                    <input v-model="pin" @input="validatePin" :type="showPin ? 'text' : 'password'"
                        class="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :placeholder="$t('Enter_Password')" />
                    <button type="button" @click="showPin = !showPin"
                        class="absolute right-4 top-2/3 transform -translate-y-1/2">
                        <img v-if="showPin" src="../../../assets/images/svg/openeye.svg" width="30" alt="Show" />
                        <img v-else src="../../../assets/images/svg/hideeye.svg" width="30" alt="Hide" />
                    </button>
                </div>

                <div class="mb-3 relative">
                    <label class="block text-gray-100 mb-2 text-primary">{{ $t('New_Password') }}</label>
                    <input v-model="new_pin" @input="validateNewPin" :type="showNewPin ? 'text' : 'password'"
                        class="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :placeholder="$t('Enter_New_Password')" />
                    <button type="button" @click="showNewPin = !showNewPin"
                        class="absolute right-4 top-2/3 transform -translate-y-1/2">
                        <img v-if="showNewPin" src="../../../assets/images/svg/openeye.svg" width="30" alt="Show" />
                        <img v-else src="../../../assets/images/svg/hideeye.svg" width="30" alt="Hide" />
                    </button>
                </div>

                <div class="mb-3 relative">
                    <label class="block text-gray-100 mb-2 text-primary">{{ $t('New_Confirm_Password') }}</label>
                    <input v-model="new_pin_confirmation" @input="validateNewPinConfirmation"
                        :type="showNewPinConfirmation ? 'text' : 'password'"
                        class="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :placeholder="$t('Enter_New_Confirm_Password')" />
                    <button type="button" @click="showNewPinConfirmation = !showNewPinConfirmation"
                        class="absolute right-4 top-2/3 transform -translate-y-1/2">
                        <img v-if="showNewPinConfirmation" src="../../../assets/images/svg/openeye.svg" width="30"
                            alt="Show" />
                        <img v-else src="../../../assets/images/svg/hideeye.svg" width="30" alt="Hide" />
                    </button>
                </div>

                <button class="w-full py-3 rounded-full bg-gold text-white font-bold" type="submit" :disabled="loading">
                    {{ $t('Change_Password') }}
                </button>

            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '@/libs/AppEventBus'

export default {
    data() {
        return {
            loading: false,
            pin: null,
            new_pin: null,
            new_pin_confirmation: null,
            showPin: false,
            showNewPin: false,
            showNewPinConfirmation: false
        };
    },
    computed: mapGetters(["user", "token"]),
    methods: {
        stripSixNumber(name) {
            this[name] = this[name].replace(/\D/g, "");
            if (this[name].length > 6) {
                this[name] = this[name].slice(0, 6);
            }
        },
        validatePin() {
            this.stripSixNumber('pin')
        },
        validateNewPin() {
            this.stripSixNumber('new_pin')
        },
        validateNewPinConfirmation() {
            this.stripSixNumber('new_pin_confirmation')
        },
        async changePin() {
            try {
                this.loading = true;
                let res = await this.$axios.post(
                    `/auth/users/${this.user.id}/change-password`,
                    {
                        pin: this.pin,
                        new_pin: this.new_pin,
                        new_pin_confirmation: this.new_pin_confirmation,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    }
                );
                this.loading = false;
                EventBus.emit('show-toast', {
                    severity: 'info',
                    summary: '',
                    detail: res.data.message,
                    life: 2000
                })
                this.$router.push("/profile");
            } catch (e) {
                if (e.response.status === 422) {
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
                }
                this.loading = false;
            }
        },
    },
};
</script>
