<template>
    <section class="d-flex flex-column align-items-center p-3 pb-5 !bg-secondary">
        <h1 class="text-center text-xl text-gold mb-3">{{$t('2d_records')}}</h1>
        <nav class="custom-tabs w-100 mb-3 text-center">
            <div :class="['tab-item', { 'active-tab': tab === 'tab1' }]" @click="selectTab('tab1')">{{$t('betting_records')}}</div>
            <div :class="['tab-item', { 'active-tab': tab === 'tab2' }]" @click="selectTab('tab2')">{{$t('winning_records')}}</div>
            <div :class="['tab-item', { 'active-tab': tab === 'tab3' }]" @click="selectTab('tab3')">{{$t('result_histories')}}</div>
        </nav>

        <div class="w-100">
            <div v-if="tab == 'tab1'">
                <TwodBetHistory />
            </div>
            <div v-if="tab == 'tab2'">
                <TwodWinHistory />
            </div>
            <div v-if="tab == 'tab3'">
                <TwodResultHistory />
            </div>
        </div>
    </section>
</template>

<script>
import TwodBetHistory from './TwodBetHistory.vue'
import TwodWinHistory from './TwodWinHistory.vue'
import TwodResultHistory from './TwodResultHistory.vue'

export default {
    components: {
        TwodBetHistory,
        TwodWinHistory,
        TwodResultHistory
    },
    data() {
        return {
            tab: 'tab1'
        }
    },
    methods: {
        selectTab(tabName) {
            this.tab = tabName
        }
    }
}
</script>
