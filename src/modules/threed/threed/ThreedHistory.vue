<template>
    <section class="d-flex flex-column align-items-center p-3 pb-5">
        <h1 class="text-center text-xl text-primary mb-3">{{ $t('3d_records') }}</h1>
        <nav class="custom-tabs w-100 mb-3 text-center">
            <div :class="['tab-item', { 'active-tab': tab === 'tab1' }]" @click="selectTab('tab1')">
                {{ $t('betting_records') }}</div>
            <div :class="['tab-item', { 'active-tab': tab === 'tab2' }]" @click="selectTab('tab2')">
                {{ $t('winning_records') }}</div>
            <div :class="['tab-item', { 'active-tab': tab === 'tab3' }]" @click="selectTab('tab3')">
                {{ $t('result_histories') }}</div>
        </nav>

        <div class="w-100">
            <div v-if="tab == 'tab1'">
                <ThreedBetHistory />
            </div>
            <div v-if="tab == 'tab2'">
                <ThreedWinHistory />
            </div>
            <div v-if="tab == 'tab3'">
                <ThreedResultHistory />
            </div>
        </div>
    </section>
</template>

<script>
import ThreedBetHistory from './ThreedBetHistory.vue'
import ThreedWinHistory from './ThreedWinHistory.vue'
import ThreedResultHistory from './ThreedResultHistory.vue'

export default {
    components: {
        ThreedBetHistory,
        ThreedWinHistory,
        ThreedResultHistory
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
