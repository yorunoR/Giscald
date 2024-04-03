import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BoardLayout from '@/layouts/BoardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/board/createGenerationTask'
    },
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
        },
        {
          path: 'signin',
          name: 'signin',
          meta: {
            title: 'signin'
          },
          component: async () =>
            await import(/* webpackChunkName: "signin" */ '@/views/SigninView.vue')
        }
      ]
    },
    {
      path: '/board',
      component: BoardLayout,
      children: [
        {
          path: 'createGenerationTask',
          name: 'createGenerationTask',
          meta: {
            title: 'createGenerationTasks'
          },
          component: async () =>
            await import(
              /* webpackChunkName: "craeteGenerationTask" */ '@/views/board/CreateGenerationTaskView.vue'
            )
        },
        {
          path: 'generationTasks',
          name: 'generationTasks',
          meta: {
            title: 'generationTasks'
          },
          component: async () =>
            await import(
              /* webpackChunkName: "generationTasks" */ '@/views/board/GenerationTasksView.vue'
            )
        },
        {
          path: 'evaluationTasks',
          name: 'evaluationTasks',
          meta: {
            title: 'evaluationTasks'
          },
          component: async () =>
            await import(
              /* webpackChunkName: "evaluationTasks" */ '@/views/board/EvaluationTasksView.vue'
            )
        },
        {
          path: 'generationTask/:id(\\d+)',
          props: (route) => ({ id: route.params.id }),
          name: 'generationTask',
          meta: {
            title: 'generationTask'
          },
          component: async () =>
            await import(
              /* webpackChunkName: "generationTask" */ '@/views/board/GenerationTaskView.vue'
            )
        },
        {
          path: 'evaluationTask/:id(\\d+)',
          props: (route) => ({ id: route.params.id }),
          name: 'evaluationTask',
          meta: {
            title: 'evaluationTask'
          },
          component: async () =>
            await import(
              /* webpackChunkName: "evaluationTask" */ '@/views/board/EvaluationTaskView.vue'
            )
        },
        {
          path: 'benches',
          name: 'benches',
          meta: {
            title: 'benches'
          },
          component: async () =>
            await import(/* webpackChunkName: "benches" */ '@/views/board/BenchesView.vue')
        },
        {
          path: 'bench/:id(\\d+)',
          props: (route) => ({ id: route.params.id }),
          name: 'bench',
          meta: {
            title: 'bench'
          },
          component: async () =>
            await import(/* webpackChunkName: "bench" */ '@/views/board/BenchView.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/board/generationTasks'
    }
  ]
})

router.afterEach((to) => {
  const title = to.meta.title as string
  document.title = title
})

export default router
