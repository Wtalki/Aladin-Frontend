import AppLayout from '@/layouts/default/AppLayout.vue'

const withdrawRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/withdraw',
                name: 'withdraw',
                component: () => import('@/modules/withdraw/withdraw/Withdraw.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/withdraw-waiting',
                component: () => import('@/modules/withdraw/withdraw/WithdrawWaiting.vue'),
                props: (route) => ({ type: route.query.uuid }),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/withdraw/:uuid/detail',
                component: () => import('@/modules/withdraw/withdraw/CashOutDetail.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

export default withdrawRoutes
