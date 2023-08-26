import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimulateTestView from '../views/SimulateTestView.vue'
import AllQuestionsView from '../views/AllQuestionsView.vue'

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
      component: SimulateTestView
    },
    {
      path: '/all-questions',
      name: 'all-questions',
      component: AllQuestionsView
    }
  ]
})

export default router
