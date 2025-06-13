import AppLayout from '@/layouts/default/AppLayout.vue'

const editProfileRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/editProfile',
                name: 'editProfile',
                component: () => import('@/modules/manageProfile/editProfile/EditProfile.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]
const changePasswordRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/changePassword',
                name: 'changePassword',
                component: () => import('@/modules/manageProfile/changePassword/ChangePassword.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]

export { editProfileRoutes, changePasswordRoutes }
