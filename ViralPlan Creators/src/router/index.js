import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/stores/auth.js'
import HomeView from '../views/HomeView.vue'
import CompaniesView from '../views/Companies/CompaniesView.vue'
import CompaniesEditorView from '../views/Companies/CompaniesEditorView.vue'
import CompaniesCreatorView from '../views/Companies/CompaniesCreatorView.vue'
import CompaniesEraserView from '../views/Companies/CompaniesEraserView.vue'
import PlansView from '../views/Plans/PlansView.vue'
import PlansEditorView from '../views/Plans/PlansEditorView.vue'
import PlansCreatorView from '../views/Plans/PlansCreatorView.vue'
import PlansEraserView from '../views/Plans/PlansEraserView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
    },
    {
      path: '/companies/editor',
      name: 'companies-editor',
      component: CompaniesEditorView
    },
    {
      path: '/companies/creator',
      name: 'companies-creator',
      component: CompaniesCreatorView
    },
    {
      path: '/companies/eraser',
      name: 'companies-eraser',
      component: CompaniesEraserView
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
    },
    {
      path: '/plans/editor',
      name: 'plans-editor',
      component: PlansEditorView
    },
    {
      path: '/plans/creator',
      name: 'plans-creator',
      component: PlansCreatorView
    },
    {
      path: '/plans/eraser',
      name: 'plans-eraser',
      component: PlansEraserView
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = authStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
})

export default router
