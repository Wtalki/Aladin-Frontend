import AppLayout from '@/layouts/default/AppLayout.vue'

const threedRoutes = [
    {
        path: '/threed',
        component: AppLayout,
        children: [
            {
                path: '',
                component: () => import('./threed/Threed.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'threed-rules',
                component: () => import('./threed/ThreedRule.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet',
                component: () => import('./threed/ThreedBet.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet-confirm',
                component: () => import('./threed/ThreedBetConfirm.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'winners',
                component: () => import('./threed/ThreedWinners.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'history',
                component: () => import('./threed/ThreedHistory.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'betting_records',
                component: () => import('./threed/ThreedBetHistory.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'bet/:id/details',
                component: () => import('./threed/ThreedBetDetail.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'dreams-number',
                component: () => import('./threed/ThreedDreamNumber.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

export default threedRoutes
