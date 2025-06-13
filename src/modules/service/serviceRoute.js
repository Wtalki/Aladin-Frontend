import AppLayout from '@/layouts/default/AppLayout.vue'

const serviceRoutes = [
    {
        path: '/service',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'service',
                component: () => import('./service/Service'),
                meta: {
                    requiresAuth: false
                }
            }
        ]
    }
]

export default serviceRoutes
