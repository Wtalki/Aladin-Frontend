import AppLayout from '@/layouts/default/AppLayout.vue'

const twodRoutes = [
    {
        path: '/twod',
        component: AppLayout,
        children: [
            {
                path: '',
                component: () => import('./twod/Twod.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'twod-rules',
                component: () => import('./twod/TwodRule.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet-select-time',
                component: () => import('./twod/TwodSelectTime.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet',
                component: () => import('./twod/TwodBet.vue'),
                props: (route) => ({ selectedTime: route.query.selectedTime }),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet-confirm',
                component: () => import('./twod/TwodBetConfirm.vue'),
                props: (route) => ({ selectedTime: route.query.selectedTime }),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'winners',
                component: () => import('./twod/TwodWinners.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'history',
                component: () => import('./twod/TwodHistory.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'betting_records',
                component: () => import('./twod/TwodBetHistory.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet/:id/details',
                component: () => import('./twod/TwodBetDetail.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'holidays',
                component: () => import('./twod/TwodHoliday.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'dreams-number',
                component: () => import('./twod/TwodDreamNumber.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

export default twodRoutes
