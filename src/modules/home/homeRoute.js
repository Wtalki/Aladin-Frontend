import AppLayout from '@/layouts/default/AppLayout.vue'

const homeRoutes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/modules/home/home/Home.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'game/:categoryName',
        name: 'game',
        component: () => import('@/modules/home/home/HomeGame.vue'),
        meta: { requiresAuth: false }
      }
    ]
  }
]

export default homeRoutes
