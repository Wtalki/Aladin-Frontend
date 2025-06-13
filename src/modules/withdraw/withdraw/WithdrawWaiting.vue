<template>
    <div class="space-y-5 h-screen overflow-y-scroll p-5">
        <img :src="require('@/assets/icons/waiting.png')" class="mx-auto w-32" />
        <h1 class="text-center text-red-600 text-xl font-semibold" v-if="topupFailed">{{ $t('incorrect_withdraw_info')
            }}</h1>
        <template v-else>
            <h1 class="text-center text-xl font-semibold text-light" v-if="!countDownFinished">{{
                $t('withdraw_processing') }}</h1>
            <h1 class="text-center text-xl font-semibold text-light" v-else>{{ $t('admin_response_delay') }}</h1>
        </template>
        <CountDown @finished="stopApiCalling" v-if="!countDownFinished" />
        <Card class="flex items-center space-x-5 font-bold">
            <h3 class="text-center font-semibold">
                {{ $t('service_availability') }}
                <br />
                {{ $t('withdraw_processing_time') }}
            </h3>
        </Card>
        <Button :name="$t('confirmation')"
            class="py-3 w-full px-4 text-center rounded leading-5 text-primary bg-warning border border-secondary"
            @click="$router.push('/')" />
    </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import Card from '@/components/common/Card.vue'
import CountDown from '@/components/molecules/CountDown.vue'
import { mapActions, mapGetters } from "vuex";

export default {
    components: {
        Button,
        Card,
        CountDown
    },
    data() {
        return {
            interval: null,
            countDownFinished: false,
            topupFailed: false
        }
    },
    computed: mapGetters(["token"]),
    methods: {
        ...mapActions(["getUser"]),
        async checkWithDrawStatus(uuid) {
            let res = await this.$axios.post(`/auth/withdraws/${uuid}/status`, null, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            if (res.data.status === 'approved') {
                clearInterval(this.interval)
                await this.getUser({ token: this.token })
                this.$router.push('/')
            }
            if (res.data.status === 'rejected') {
                clearInterval(this.interval)
                this.topupFailed = true
                this.countDownFinished = true
            }
        },
        stopApiCalling() {
            clearInterval(this.interval)
            this.countDownFinished = true
        }
    },
    mounted() {
        clearInterval(this.interval)
        this.interval = setInterval(() => {
            this.checkWithDrawStatus(this.$route.query.uuid)
        }, 3000)
    },
    beforeUnmount() {
        clearInterval(this.interval)
    }
}
</script>
