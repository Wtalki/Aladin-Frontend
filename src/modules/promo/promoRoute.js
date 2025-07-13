import AppLayout from '@/layouts/default/AppLayout.vue'

const promoRoutes = [
    {
        path: '/promo',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'promotion',
                component: () => import('./promo/Promo.vue'),
                meta: {
                    requiresAuth: false
                }
            }
        ]
    }
]

export default promoRoutes
