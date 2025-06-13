import AppLayout from '@/layouts/default/AppLayout.vue'

const paymentRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/payment',
                name: 'payment',
                component: () => import('@/modules/payment/payment/Payment.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/payment-history',
                component: () => import('@/modules/payment/payment/PaymentHistory.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/set-payment-accounts',
                component: () => import('@/modules/payment/payment/SetPaymentAccount.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
    // {
    //     path: '/set-payment-accounts',
    //     component: () => import('@/modules/payment/payment/SetPaymentAccount.vue'),
    //     meta: {
    //         requiresAuth: true
    //     }
    // }
]

export default paymentRoutes
