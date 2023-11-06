import { createRouter, createWebHistory } from 'vue-router'
import Index from './pages/Index.vue'
import Login from './pages/Login.vue'

const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
