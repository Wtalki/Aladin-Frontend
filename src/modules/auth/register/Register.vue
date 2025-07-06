<template>
    <div class="bg-primary min-h-screen flex flex-col mx-auto items-center justify-between appWidth">
        <div class="flex justify-start items-start w-full mt-2 ps-4">
                <router-link to="/"
                    class="hover:bg-gray-200 border border-[#b6b6b6] p-2 rounded-2xl shadow-sm transition-all duration-200">
                    <img src="../../../assets/images/svg/leftarrow1.svg" width="25" alt="" />
                </router-link>
            </div>
        <div class="w-full max-w mb-14 space-y-4">
            <div class="flex justify-center bg-light p-5"
                style="border-bottom-left-radius: 40%; border-bottom-right-radius: 40%;">
                <img :src="require('@/assets/icons/logo.png')" width="150" alt="Logo" />
            </div>

            <h1 class="text-3xl font-bold text-gold text-center">{{ $t('register') }}</h1>
            <p class="text-light text-center">{{ $t('enter_personal_info') }}</p>

            <form @submit.prevent="SignUp" class="p-4">
                <!-- <div class="mb-4">
                        <label class="block text-gray-200 mb-2">{{ $t('select_region') }}</label>
                        <div class="flex space-x-3">
                            <label @click="handleSelectRegion('my')"
                                class="flex items-center gap-2 p-3 rounded-lg cursor-pointer bg-gray-100 border border-3 w-full"
                                :class="selectedRegion == 'my' ? '!border-green-500' : '!border-gray-300'">
                                <input type="radio" v-model="selectedRegion" value="my" class="hidden" />
                                <img :src="require('@/assets/icons/mm.png')" width="30" alt="Myanmar Flag" />
                                <span class="text-gray-800">{{ $t('myanmar') }}</span>
                            </label>
                            <label @click="handleSelectRegion('th')"
                                class="flex items-center gap-2 p-3 rounded-lg cursor-pointer bg-gray-100 border border-3 w-full"
                                :class="selectedRegion == 'th' ? '!border-green-500' : '!border-gray-300'">
                                <input type="radio" v-model="selectedRegion" value="th" class="hidden" />
                                <img :src="require('@/assets/icons/thailand.png')" width="30" alt="Thailand Flag" />
                                <span class="text-gray-800">{{ $t('thailand') }}</span>
                            </label>
                        </div>
                    </div> -->

                <div class="mb-3">
                    <label class="block text-gray-200 mb-2">{{ $t('name') }}</label>
                    <input v-model="name"
                        class="w-full px-4 py-3 text-black rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-success"
                        :placeholder="$t('enter_name')" type="text" />
                </div>

                <div class="mb-3">
                    <label class="block text-gray-200 mb-2">{{ $t('phone') }}</label>
                    <input v-model="phone" @input="validateInput"
                        class="w-full px-4 py-3 text-black rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-success"
                        :placeholder="$t('enter_phone')" type="tel" />
                </div>

                <div class="mb-3 relative">
                    <label class="block text-gray-200 mb-2">{{ $t('password') }}</label>
                    <input v-model="pin" @input="validatePin"
                        class="w-full px-4 py-3 text-black rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-success"
                        :placeholder="$t('enter_password')" :type="showPassword ? 'text' : 'password'" />
                    <button type="button" class="absolute right-4 top-2/3 transform -translate-y-1/2"
                        @click="showPassword = !showPassword">
                        <img :src="showPassword ? require('@/assets/images/svg/hideeye.svg') : require('@/assets/images/svg/openeye.svg')"
                            width="30" alt="" />
                    </button>
                </div>

                <div class="mb-3 relative">
                    <label class="block text-gray-200 mb-2">{{ $t('confirm_password') }}</label>
                    <input v-model="pin_confirmation" @input="validatePinConfirmation"
                        class="w-full px-4 py-3 text-black rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-success"
                        :placeholder="$t('enter_confirm_password')" :type="showConfirmPassword ? 'text' : 'password'" />
                    <button type="button" class="absolute right-4 top-2/3 transform -translate-y-1/2"
                        @click="showConfirmPassword = !showConfirmPassword">
                        <img :src="showConfirmPassword ? require('@/assets/images/svg/hideeye.svg') : require('@/assets/images/svg/openeye.svg')"
                            width="30" alt="" />
                    </button>
                </div>

                <button
                    class="mt-5 w-full py-3 rounded-full bg-gold text-white font-bold flex items-center justify-center"
                    type="submit" :disabled="loading">
                    <div v-if="loading" class="flex items-center">
                        <svg aria-hidden="true" class="inline w-5 h-5 text-primary animate-spin fill-gray-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <div class="w-[100px]">{{ $t('submitting') }}</div>
                    </div>
                    <div v-else>{{ $t('register') }}</div>
                </button>
            </form>

            <p class="text-light text-center">
                {{ $t('already_have_account') }}
                <router-link class="text-gold" to="/login">{{ $t('login') }}</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import EventBus from '@/libs/AppEventBus'
import { mapActions } from "vuex";

export default {
    data() {
        return {
            selectedRegion: "my",
            name: "",
            phone: "",
            pin: "",
            pin_confirmation: "",
            loading: false,
            showPassword: false,
            showConfirmPassword: false,
        };
    },
    methods: {
        ...mapActions(["getUser"]),
        handleSelectRegion(region) {
            this.selectedRegion = region;
        },
        validateInput() {
            this.phone = this.phone.replace(/\D/g, "");
            if (this.phone.length > 11) {
                this.phone = this.phone.slice(0, 11);
            }
        },
        validatePin() {
            this.stripSixNumber("pin");
        },
        validatePinConfirmation() {
            this.stripSixNumber("pin_confirmation");
        },
        stripSixNumber(name) {
            this[name] = this[name].replace(/\D/g, "");
            if (this[name].length > 6) {
                this[name] = this[name].slice(0, 6);
            }
        },
        async SignUp() {
            this.loading = true;
            try {
                const registeredData = await this.registerUser();
                await this.getUser({ token: registeredData.access_token });
                EventBus.emit('show-toast', {
                    severity: 'info',
                    summary: '',
                    detail: "Register Successfully",
                    life: 2000
                })
                this.$router.push("/set-payment-accounts");
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
        async registerUser() {
            const data = {
                region: this.selectedRegion,
                name: this.name,
                phone: this.phone,
                pin: this.pin,
                pin_confirmation: this.pin_confirmation,
            };

            const res = await this.$axios.post("/auth/register", data);

            return res.data;
        },
    },
};
</script>
