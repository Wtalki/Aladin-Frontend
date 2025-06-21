<template>
    <nav class="sticky z-10 h-20 !bg-primary appWidth mx-auto top-0 flex flex-row px-3 justify-between items-center">
        <Button type="link" route="/" class="flex items-center space-x-2">
            <img :src="require('@/assets/icons/logo.png')" class="w-16" alt="Logo" />
        </Button>

        <section class="flex items-center space-x-3">
            <AppDownload />
            <div class="p-2 rounded-lg bg-secondary text-light flex items-center space-x-2" v-if="user">
                <div>{{ user.region == 'my' ? $t('MMK') : $t('THB') }} {{ user.wallet }}</div>
                <router-link to="/deposit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current !h-6 !w-6 text-light cursor-pointer"
                        viewBox="0 0 448 512">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                    </svg>
                </router-link>
            </div>
            <svg @click="reloadPage()" class="!w-6 !h-6 text-gold fill-current cursor-pointer"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
            </svg>
            <div v-if="user" class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button @click="() => (isNotificationModalOpen = !isNotificationModalOpen)"
                    class="py-4 px-1 relative border-2 border-transparent rounded-full transition duration-150 ease-in-out">
                    <BellIcon class="text-gray" id="notificationIcon" />
                    <span class="absolute top-2 -right-2">
                        <div v-if="unreadCount > 0"
                            class="inline-flex items-center px-1.5 py-0.5 border border-white rounded-full text-xs font-semibold leading-4 bg-danger text-light">
                            {{ unreadCount }}
                        </div>
                    </span>
                </button>
                <div ref="notificationModal" id="notificationModal"
                    class="bg-secondary w-[97%] h-[500px] overflow-auto shadow-lg rounded-lg z-[100] absolute top-[100%] right-2"
                    :class="isNotificationModalOpen ? 'opacity-100' : 'opacity-0 invisible'">
                    <div class="flex px-3 py-3 items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="font-bold text-xl text-light">{{ $t('Notifications') }}</div>
                            <div
                                class="!w-6 !h-6 flex items-center justify-center text-sm font-bold text-white bg-danger rounded-full">
                                {{ unreadCount }}
                            </div>
                        </div>
                        <Cancel @click="() => (isNotificationModalOpen = !isNotificationModalOpen)"
                            class="!w-8 !h-8 cursor-pointer text-light" />
                    </div>
                    <p @click="markAsAllRead" v-if="unreadCount > 0"
                        class="text-right text-xs font-semibold text-gray-500 hover:underline py-1 cursor-pointer mr-2">
                        Mark
                        As All Read</p>
                    <div v-if="notifications.length">
                        <div v-for="notification in notifications" :key="notification.id">
                            <div @click="() => markAsRead(notification)"
                                class="flex hover:bg-gray-300 gap-3 pr-3 cursor-pointer border-b-[1px] py-2 items-center">
                                <NotificationCard :notification="notification" />
                            </div>
                        </div>
                    </div>
                    <p v-else class="text-md mt-24 text-danger text-center">{{ $t('No_Notifications_Yet') }}</p>
                </div>
            </div>
        </section>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import BellIcon from '@/components/icons/BellIcon.vue'
import Cancel from '@/components/icons/Cancel.vue'
import Button from '@/components/atoms/Button.vue'
import NotificationCard from '@/components/molecules/NotificationCard.vue'
import AppDownload from './AppDownload.vue';

export default {
    components: {
        BellIcon,
        Cancel,
        Button,
        NotificationCard,
        AppDownload
    },
    data() {
        return {
            notifications: [],
            isNotificationModalOpen: false,
            observer: null,
            next_page_url: null,
            page: 1,
            unreadCount: 0,
            isFetching: false,
        }
    },
    computed: {
        ...mapGetters(["token", "user"]),
    },
    watch: {
        isNotificationModalOpen(value) {
            setTimeout(() => value && document.addEventListener('click', this.handleClickOutside), 0)
            this.$nextTick(() => value && document.getElementById('notificationModal').addEventListener('scroll', this.checkScroll))
            !value && document.getElementById('notificationModal').removeEventListener('scroll', this.checkScroll)
            !value && document.removeEventListener('click', this.handleClickOutside)
        }
    },
    methods: {
        reloadPage() {
            window.location.reload()
        },
        handleClickOutside(e) {
            const notificationContainer = document.getElementById('notificationModal')
            if (notificationContainer && !notificationContainer.contains(e.target)) {
                this.isNotificationModalOpen = false
            }
        },
        async fetchNotification() {
            this.isFetching = true
            const notificationsResponse = await this.$axios.get(
                "/auth/notifications?page=" + this.page,
                {
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            this.next_page_url =
                notificationsResponse.data.notifications.next_page_url;
            this.notifications = [
                ...this.notifications,
                ...notificationsResponse.data.notifications.data,
            ];
            this.unreadCount = notificationsResponse.data.unreadCount;
            this.page += 1;
            this.isFetching = false
        },
        checkScroll() {
            const notificationContainer = this.$refs.notificationModal
            const { clientHeight, scrollTop, scrollHeight } = notificationContainer
            if (scrollTop + clientHeight >= scrollHeight - 50 && this.next_page_url && !this.isFetching) {
                this.fetchNotification()
            }
        },
        async markAsAllRead() {
            if (this.unreadCount === 0) return
            await this.$axios.post(
                '/auth/user/notifications/markasallread',
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                }
            )
            this.notifications = this.notifications.map((notification) => {
                return {
                    ...notification,
                    read_at: Date.now()
                }
            })
            this.unreadCount = 0
        },
        async markAsRead(notification) {
            if (notification.read_at !== null) return
            await this.$axios.post(
                `/auth/user/notifications/${notification.id}/markasread`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                }
            )
            this.notifications = this.notifications.map((noti) => {
                if (noti.id === notification.id) {
                    return {
                        ...noti,
                        read_at: Date.now()
                    }
                }
                return noti
            })
            this.unreadCount -= 1
        }
    },

    async mounted() {
        if (this.token) {
            this.fetchNotification()
        }
    }
}
</script>
