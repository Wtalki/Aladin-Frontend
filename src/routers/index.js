import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/authRoute'
import homeRoutes from '@/modules/home/homeRoute'
import profileRoutes from '@/modules/profile/profileRoute'
import { editProfileRoutes } from '@/modules/manageProfile/manageProfileRoute'
import { changePasswordRoutes } from '@/modules/manageProfile/manageProfileRoute'
import twodRoutes from '@/modules/twod/twodRoute'
import threedRoutes from '@/modules/threed/threedRoute'
import paymentRoutes from '@/modules/payment/paymentRoute'
import depositRoutes from '@/modules/deposit/depositRoute'
import withdrawRoutes from '@/modules/withdraw/withdrawRoute'
import serviceRoutes from '@/modules/service/serviceRoute'

const routes = [
    ...authRoutes,
    ...homeRoutes,
    ...profileRoutes,
    ...editProfileRoutes,
    ...changePasswordRoutes,
    ...twodRoutes,
    ...threedRoutes,
    ...paymentRoutes,
    ...depositRoutes,
    ...withdrawRoutes,
    ...serviceRoutes,
    {
        path: '/error-404',
        name: 'error404',
        component: () => import('@/pages/NotFound.vue')
    },
    {
        path: '/not-authorized',
        name: 'not-authorized',
        component: () => import('@/pages/Access.vue')
    },
    {
        path: '/:catchAll(.*)*',
        redirect: 'error-404'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, left: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    const userToken = localStorage.getItem('jwt_token')
    const isAuthenticated = !!userToken

    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({ name: 'login' })
    }

    window.scrollTo(0, 0)
    next()
})

export default router
