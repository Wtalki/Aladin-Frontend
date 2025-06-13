import AppLayout from '@/layouts/default/AppLayout.vue'

const depositRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/deposit',
                name: 'deposit',
                component: () => import('@/modules/deposit/deposit/Deposit.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/deposit-submit',
                component: () => import('@/modules/deposit/deposit/DepositSubmit.vue'),
                props: (route) => ({ type: route.query.type }),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/deposit-waiting',
                component: () => import('@/modules/deposit/deposit/DepositWaiting.vue'),
                props: (route) => ({ type: route.query.uuid }),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/deposit/:uuid/detail',
                component: () => import('@/modules/deposit/deposit/TopupDeatil.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

export default depositRoutes
