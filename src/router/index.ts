import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/notes'
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../views/NotesView.vue'),
      props: {archivedView: false}
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: () => import('../views/NotesView.vue'),
      props: {archivedView: false}
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/NotesView.vue'),
      props: {archivedView: true}
    },
  ]
})

export default router
