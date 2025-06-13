<template>
    <div class="w-full min-h-screen pb-4">
        <div class="flex flex-col items-center py-6">
            <img alt="Profile" class="rounded-full object-cover w-28 h-28" :src="user?.profile" width="100" />
            <h2 class="text-xl font-bold mt-2 text-light">{{ user?.name }}</h2>
            <span class="text-md font-semibold mt-2 text-light">{{ user?.phone }}</span>
        </div>
        <div class="!bg-primary rounded-t-2xl p-4 mt-[-15px]">
            <router-link to="/editProfile"
                class="flex items-center justify-between mb-4 !hover:bg-gray-500 transaction-all durition-100 p-1 rounded-lg cursor-pointer">
                <div class="flex items-center">
                    <div class="!bg-pink-200 p-2 md:p-3 rounded-full">
                        <img src="../../../assets/images/svg/user.svg" width="20" alt="" />
                    </div>
                    <span class="ml-4 text-light tracking-wider font-semibold">{{ $t('Edit_Profile') }}</span>
                </div>
                <img src="../../../assets/images/svg/rightarrow.svg" width="20" alt="" />
            </router-link>
            <router-link to="/changePassword"
                class="flex items-center justify-between mb-4 !hover:bg-gray-500 transaction-all durition-100 p-1 rounded-lg cursor-pointer">
                <div class="flex items-center">
                    <div class="!bg-purple-200 p-2 md:p-3 rounded-full">
                        <img src="../../../assets/images/svg/password.svg" width="20" alt="" />
                    </div>
                    <span class="ml-4 text-light tracking-wider font-semibold">{{ $t('Change_Password') }}</span>
                </div>
                <img src="../../../assets/images/svg/rightarrow.svg" width="20" alt="" />
            </router-link>
            <router-link to="/payment-history"
                class="flex items-center justify-between mb-4 !hover:bg-gray-500 transaction-all durition-100 p-1 rounded-lg cursor-pointer">
                <div class="flex items-center">
                    <div class="!bg-orange-200 p-2 md:p-3 rounded-full">
                        <img src="../../../assets/images/svg/sandwatch.svg" width="20" alt="" />
                    </div>
                    <span class="ml-4 text-light tracking-wider font-semibold">{{ $t('Transaction_Record') }}</span>
                </div>
                <img src="../../../assets/images/svg/rightarrow.svg" width="20" alt="" />
            </router-link>
            <div v-for="(item, index) in accordionItems" :key="index">
                <div class="flex items-center justify-between mb-4 !hover:bg-gray-500 transaction-all durition-100 p-1 rounded-lg cursor-pointer"
                    @click="toggleAccordion(index)">
                    <div class="flex items-center">
                        <div class="!bg-gray-200 p-2 md:p-3 rounded-full">
                            <img src="../../../assets/images/svg/record.svg" width="20" alt="" />
                        </div>
                        <span class="ml-4 text-light tracking-wider font-semibold">{{ $t(item.title) }}</span>
                    </div>
                    <img v-if="activeIndex !== index" src="../../../assets/images/svg/rightarrow.svg" width="20"
                        alt="" />
                    <img v-else src="../../../assets/images/svg/rightarrow.svg" width="20" class="rotate-90" />
                </div>

                <transition name="fade">
                    <div v-if="activeIndex === index"
                        class="flex flex-col space-y-4 text-lg border border-gray-700 p-4 rounded-lg -mt-2 mb-3 text-light !bg-primary">
                        <router-link to="twod/betting_records">2D {{ $t('betting_records') }}</router-link>
                        <router-link to="threed/betting_records">3D {{ $t('betting_records') }}</router-link>
                    </div>
                </transition>
            </div>
            <!-- <div
                class="flex items-center justify-between mb-4 !hover:bg-gray-500 transaction-all durition-100 p-1 rounded-lg cursor-pointer">
                <div class="flex items-center">
                    <div class="!bg-gray-200 p-2 md:p-3 rounded-full">
                        <img src="../../../assets/images/svg/group.svg" width="20" alt="" />
                    </div>
                    <span class="ml-4 text-light tracking-wider font-semibold">{{ $t('Share_Friend') }}</span>
                </div>
                <img src="../../../assets/images/svg/rightarrow.svg" width="20" alt="" />
            </div> -->
            <div class="flex items-center justify-between !hover:bg-gray-500 transaction-all durition-100 p-1 rounded-lg cursor-pointer mb-10"
                @click="toggleLogoutModal">
                <div class="flex items-center">
                    <div class="!bg-gray-200 p-2 md:p-3 rounded-full">
                        <img src="../../../assets/images/svg/logout.svg" width="21" alt="" />
                    </div>
                    <span class="ml-4 text-light tracking-wider font-semibold">{{ $t('logout') }}</span>
                </div>
            </div>
        </div>

        <Dialog v-if="logoutModal" v-model:visible="logoutModal" modal :closable="false" class="modalWidth" :pt="{
            content: 'shadow-lg rounded-b-lg'
        }"
            :style="{ backgroundColor: '#f8fafc', borderWidth: '1px', borderColor: '#bdbbbb71', borderStyle: 'solid', borderRadius: '6px', padding: '20px', backdropFilter: 'blur(12px)' }">
            <div class="space-y-3 flex flex-col items-center justify-center">
                <span
                    class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 !border-yellow-50 !bg-yellow-100 !text-yellow-500">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path
                            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z">
                        </path>
                    </svg>
                </span>

                <h3 class="text-lg font-semibold">{{ $t('account_logout') }}</h3>
                <p class="text-gray-500">{{ $t('confirm_logout') }}</p>

                <div class="flex justify-center gap-x-4">
                    <CustomButton @click="toggleLogoutModal"
                        class="w-full py-1 px-2.5 inline-flex justify-center items-center rounded-md border border-transparent font-semibold !bg-secondary text-light transition-all text-sm"
                        :name="$t('cancel')" />
                    <CustomButton @click="handleLogout"
                        class="w-full py-1 px-2.5 inline-flex justify-center items-center rounded-md border font-medium !bg-danger text-light shadow-sm align-middle transition-all text-sm"
                        :name="$t('logout')" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Dialog from 'primevue/dialog'
import CustomButton from '@/components/atoms/Button.vue'

export default {
    components: {
        Dialog,
        CustomButton
    },
    data() {
        return {
            activeIndex: null,
            logoutModal: false,
            accordionItems: [
                {
                    title: 'Betting_Record'
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(["logout"]),
        async handleLogout() {
            this.toggleLogoutModal();
            await this.logout();
            this.$router.push("/login");
        },
        toggleLogoutModal() {
            this.logoutModal = !this.logoutModal
        },
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index
        }
    }
}
</script>
