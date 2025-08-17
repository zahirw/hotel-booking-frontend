import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import SelectRoomView from '@/views/SelectRoomView.vue'
import ContactInformationView from '@/views/ContactInformationView.vue'
import BookingConfirmationView from '@/views/BookingConfirmationView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Cookies from 'js-cookie'
// import { useStore } from '@/stores'

const publicRoutes = ['home', 'signin', 'signup']
const authPage = ['signin', 'signup']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: '/select-room',
          name: 'select-room',
          component: SelectRoomView,
        },
        {
          path: '/contact-information',
          name: 'contact-information',
          component: ContactInformationView,
        },
        {
          path: '/booking-confirmation',
          name: 'booking-confirmation',
          component: BookingConfirmationView,
        },
      ],
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  // const store = useStore()
  // const isAuthenticated = store.currentUser !== undefined
  const isAuthenticated = !!Cookies.get('token') // Check if token exists in cookies
  if (typeof to.name === 'string' && !publicRoutes.includes(to.name) && !isAuthenticated)
    next({ name: 'signin' })
  else if (typeof to.name === 'string' && authPage.includes(to.name) && isAuthenticated)
    next({ path: '/' })
  else next()
})
export default router
