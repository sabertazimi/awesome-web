import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import Board from 'src/views/Board.vue'
import Task from 'src/views/Task.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'board',
    component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task,
        props: true,
      },
    ],
  },
]

const useAppRoute = () => useRoute()
const useAppRouter = () => useRouter()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { useAppRoute, useAppRouter }
export default router
