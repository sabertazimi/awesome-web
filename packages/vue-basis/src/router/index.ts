import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import EventDetails from '../views/EventDetails.vue'
import EventList from '../views/EventList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: async () =>
      import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
