import AppLayout from '@/layouts/default/AppLayout.vue'

const profileRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/modules/profile/profile/Profile.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

export default profileRoutes
