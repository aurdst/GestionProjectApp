import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/LoginComponent.vue'
import Register from '../components/RegisterComponent.vue'
import TaskBoard from '../components/TaskBoard.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/about', component: AboutView },
  { path: '/taskboard', component: TaskBoard }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
