import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Board from 'src/views/Board.vue';
import Task from 'src/views/Task.vue';

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
];

const router = createRouter({
  history: createWebHistory('/awesome-web/vue-trello/'),
  routes,
});

export default router;
