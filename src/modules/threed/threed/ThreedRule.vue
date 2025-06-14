<template>
    <div class="flex justify-center min-h-screen bg-gray-900">
        <div class="bg-secondary w-full max-w-3xl rounded-lg shadow-lg p-3">
            <h1 class="text-gold text-center text-2xl font-semibold">စည်းကမ်းချက်များ</h1>

            <div v-for="(item, index) in accordionItems" :key="index">
                <div class="border border-gray-700 p-3 mx-2 mt-3 rounded-lg transition-all duration-300 cursor-pointer flex justify-between items-center hover:!bg-primary"
                    @click="toggleAccordion(index)">
                    <span class="text-white text-lg font-medium">{{ item.title }}</span>
                    <img v-if="activeIndex !== index" src="@/assets/images/svg/arrowRight.svg" width="25" alt="" />
                    <img v-else src="@/assets/images/svg/arrowDown.svg" width="25" alt="" />
                </div>

                <transition name="fade">
                    <div v-if="activeIndex === index"
                        class="border border-gray-700 p-4 mx-2 rounded-lg mt-2 !bg-primary">
                        <div v-for="(section, secIndex) in item.content" :key="secIndex" class="mb-4">
                            <h6 class="text-gold font-semibold">{{ section.title }}</h6>
                            <ul class="list-disc ml-5 space-y-2 text-white">
                                <li v-for="(point, pIndex) in section.points" :key="pIndex">
                                    {{ point }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            activeIndex: null,
        }
    },
    computed: {
        ...mapGetters(["token", "threedSetting"]),
        accordionItems() {
            return [
                {
                    title: '3D ထိုးချိန် (မြန်မာစံတော်ချိန်)',
                    content: [
                        {
                            title: '',
                            points: [
                                '3D သည်တစ်လတွင်နှစ်ကြိမ်သာကစားရသော ထီအမျိုးအစားဖြစ်ပါသည်။',
                                '1 ရက်နေ့နှင့် 16 ရက်နေ့တွင်သာဂဏန်းထွက်ပါသည်။မြန်မာစံတော်ချိန် 03:30 မိနစ်တွင်ဂဏန်းထွက်မည်ဖြစ်ပြီး ကစားသမားများအနေနှင့် 02:45 မိနစ်အထိသာ နောက်ဆုံးတင်နိုင်မည်ဖြစ်သည်။',
                                'အရေးပေါ်ပိတ်ရက်များနှင့် ဂဏန်းထွက်ရက်အပြောင်းအလဲများရှိခဲ့လျှင် ကြိုတင်အကြောင်းကြားပါမည်။',
                                'ဂဏန်းတင်ပြီး အရေးပေါ်အကြောင်းကြောင့် ဂဏန်းမထွက်ခဲ့လျှင် ထိုးငွေအပြည့်ပြန်အမ်းပါမည်။'
                            ]
                        }
                    ]
                },
                {
                    title: 'အလျော်အစား',
                    content: [
                        {
                            title: `ပေါက်ဂဏန်းများအတွက်အလျော်အစား ${this.threedSetting?.compensation_percentage || '-'} ဆ`,
                            points: [
                                `သင်၏ထိုးထားသည့်နံပါတ်သည်ပေါက်စဉ်နံပါတ်နှင့်ကိုက်ညီပါကပမာဏ ${this.threedSetting?.compensation_percentage || '-'}% ရရှိမည်ဖြစ်သည်။`
                            ]
                        },
                        {
                            title: 'ပျမ်းမျှအမြတ်',
                            points: [
                                `ဥပမာ - 1000 ဖိုးထိုးထားပါက ${this.threedSetting?.compensation_percentage * 1000} ရရှိမည်ဖြစ်သည်။`
                            ]
                        },
                        {
                            title: `သွပ်ဂဏန်းများအတွက်အလျော်အစား ${this.threedSetting?.round_compensation_percentage || ' -'} ဆ`,
                            points: ['ပတ်လည်သွပ်တစ်မျိုးသာအလျော်အစားလုပ်ပါသည်။', 'ထွက်ဂဏန်းရဲ့ တစ် ပေါင်းခြင်း၊နှုတ်ခြင်း စသောလုံးတူသွပ်များအလျော်အစားမလုပ်ပါ။']
                        }
                    ]
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
        ...mapActions(['fetchThreedSetting']),
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index
        }
    },
    created() {
        if (this.token) {
            this.fetchThreedSetting();
        }
    }
}
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
