import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomePage from '../views/Homepage.vue'
import TripQuery from '../views/TripQuery.vue'
import HowManyPeople from '../components/filters/HowManyPeople.vue'
import DaysAndDate from '../components/filters/DaysAndDate.vue'
import Budget from '../components/filters/Budget.vue'
import Keywords from '../components/filters/Keywords.vue'
import SignIn from '../views/SignIn.vue'
import Register from '../views/Register.vue'
import Results from '../views/Results.vue'
import ResultsTester from '../views/ResultsTester.vue'
import UserDashboard from '../views/UserDashboard.vue'
import Database from '../database/DatabaseTest.vue'

// routes to vue components
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/register', name: 'Register', component: Register },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/tripquery', name: 'TripQuery', component: TripQuery, meta: { requiresAuth: true } },
    { path: '/howmanypeople', name: 'HowManyPeople', component: HowManyPeople, meta: { requiresAuth: true } },
    { path: '/daysanddate', name: 'DaysAndDate', component: DaysAndDate, meta: { requiresAuth: true } },
    { path: '/budget', name: 'Budget', component: Budget, meta: { requiresAuth: true } },
    { path: '/keywords', name: 'Keywords', component: Keywords, meta: { requiresAuth: true } },
    { path: '/results', name: 'Results', component: Results, meta: { requiresAuth: true } },
    { path: '/resultstester', name: 'ResultsTester', component: ResultsTester, meta: { requiresAuth: true } },
    { path: '/userdashboard', name: 'Dashboard', component: UserDashboard, meta: { requiresAuth: true } },
    { path: '/database', name: 'Database', component: Database, meta: { requiresAuth: true } }
  ]
})

// listens for changes in user authintication status and updates when it is changed
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

// validates that user is signed in before accessing parts of web app
router.beforeEach(async (to, from, next) => {
  if (to.path === '/' || to.path === '/signin' || to.path === './register') {
    if (await getCurrentUser()) {
      next('/tripquery')
    }
    // else {
    //   next();
    // }
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

// exports the router to the rest of web app
export default router
