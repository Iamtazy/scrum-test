import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import SummaryView from '../views/SummaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/simulate-test',
      name: 'simulate-test',
      component: TestView
    },
    {
      path: '/all-questions',
      name: 'all-questions',
      component: TestView
    },
    {
      path: '/test-summary',
      name: 'test-summary',
      component: SummaryView
    }
  ]
})

export default router
