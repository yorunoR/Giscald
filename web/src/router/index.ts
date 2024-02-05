import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'ping',
          name: 'ping',
          meta: {
            title: 'ping'
          },
          component: async () => await import(/* webpackChunkName: "ping" */ '@/views/PingView.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/ping'
    }
  ]
})

router.afterEach((to) => {
  const title = to.meta.title as string
  document.title = title
})

export default router
