const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./login/Login'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./register/Register'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/forgetPassword',
        name: 'forgetPassword',
        component: () => import('./forgetPassword/ForgetPassword'),
        meta: {
            requiresAuth: false
        }
    }
]

export default authRoutes
