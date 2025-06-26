<template>
    <div class="flex justify-center min-h-screen">
        <div class="w-full max-w-3xl rounded-lg shadow-lg p-3">
            <h1 class="text-gold text-center text-2xl font-semibold">စည်းကမ်းချက်များ</h1>

            <div v-for="(item, index) in accordionItems" :key="index">
                <div class="border border-gray-700 p-3 mx-2 mt-3 rounded-lg transition-all duration-300 cursor-pointer flex justify-between items-center bg-secondary hover:!bg-primary"
                    @click="toggleAccordion(index)">
                    <span class="text-light text-lg font-medium">{{ item.title }}</span>
                    <img v-if="activeIndex !== index" src="@/assets/images/svg/arrowRight.svg" width="25" alt="" />
                    <img v-else src="@/assets/images/svg/arrowDown.svg" width="25" alt="" />
                </div>

                <transition name="fade">
                    <div v-if="activeIndex === index"
<<<<<<< HEAD
                        class="border border-gray-700 p-4 mx-2 rounded-lg mt-2 bg-primary">
=======
                        class="border border-gray-700 p-4 mx-2 rounded-lg mt-2 [background:linear-gradient(to_bottom,#01adec_70%,#0260bf_150%,#0260bf_100%)]">
>>>>>>> 032a9fb (change color)
                        <div v-for="(section, secIndex) in item.content" :key="secIndex" class="mb-4">
                            <h6 class="text-gold font-semibold">{{ section.title }}</h6>
                            <ul class="list-disc ml-5 space-y-2 text-light">
                                <li v-for="(point, pIndex) in section.points" :key="pIndex">{{ point }}</li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            activeIndex: null
        };
    },
    computed: {
        ...mapGetters(['twodSetting']),
        accordionItems() {
            const timeLabels = {
                early_morning: '11:00 AM',
                morning: '12:01 PM',
                early_evening: '03:00 PM',
                evening: '04:30 PM'
            };

            const safeSettings = this.twodSetting || [];

            return [
                {
                    title: '2D ထိုးချိန် (မြန်မာစံတော်ချိန်)',
                    content: [
                        {
                            title: 'မနက်ပိုင်း (၁၁:၀၀ AM)',
                            points: ['ထိုးချိန်ပိတ်ချိန်: ၁၀:၄၅ AM', 'ရလဒ်ထွက်ချိန်: ၁၁:၀၀ AM']
                        },
                        {
                            title: 'မနက်ပိုင်း (၁၂:၀၁ PM)',
                            points: ['ထိုးချိန်ပိတ်ချိန်: ၁၁:၄၅ AM', 'ရလဒ်ထွက်ချိန်: ၁၂:၀၁ PM']
                        },
                        {
                            title: 'ညနေပိုင်း (၀၃:၀၀ PM)',
                            points: ['ထိုးချိန်ပိတ်ချိန်: ၀၂:၄၅ PM', 'ရလဒ်ထွက်ချိန်: ၀၃:၀၀ PM']
                        },
                        {
                            title: 'ညနေပိုင်း (၀၄:၃၀ PM)',
                            points: ['ထိုးချိန်ပိတ်ချိန်: ၀၄:၀၀ PM', 'ရလဒ်ထွက်ချိန်: ၀၄:၃၀ PM']
                        }
                    ]
                },
                {
                    title: 'အလျော်အစား',
                    content: safeSettings.map(item => {
                        const timeLabel = timeLabels[item.result_time] || item.result_time;
                        return {
                            title: `${timeLabel} အတွက်အလျော်အစား ${item.compensation_percentage} ဆ`,
                            points: [
                                `ထိုးထားသည့်နံပါတ်သည်ပေါက်စဉ်နံပါတ်နှင့်ကိုက်ညီပါက ${item.compensation_percentage}% ရရှိမည်ဖြစ်သည်။`
                            ]
                        };
                    })
                },
                {
                    title: 'အကြံပြုချက်',
                    content: [
                        {
                            title: 'ထိုးချိန်များကိုစနစ်တကျလိုက်နာခြင်း',
                            points: [
                                'ထိုးချိန်ပိတ်ပြီးနောက် ပေါ်တင်မှုများကို လက်ခံမည်မဟုတ်ပါ။',
                                'ထွက်ဂဏန်းရလဒ်ကိုဆော့ဝဲမှတိုက်ရိုက်ကြည့်ရှုနိုင်သလို သင့်ထံသို့အကြောင်းကြားစာပို့ပါမည်။'
                            ]
                        }
                    ]
                }
            ];
        }
    },
    methods: {
        ...mapActions(['fetchTwodSetting']),
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        }
    },
    mounted() {
        this.fetchTwodSetting();
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
