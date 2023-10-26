import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompaniesView from '../views/Companies/CompaniesView.vue'
import CompaniesEditorView from '../views/Companies/CompaniesEditorView.vue'
import CompaniesCreatorView from '../views/Companies/CompaniesCreatorView.vue'
import CompaniesEraserView from '../views/Companies/CompaniesEraserView.vue'
import PlansView from '../views/Plans/PlansView.vue'
import PlansEditorView from '../views/Plans/PlansEditorView.vue'
import PlansCreatorView from '../views/Plans/PlansCreatorView.vue'
import PlansEraserView from '../views/Plans/PlansEraserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
      children: [
        {
          path: '/editor',
          name: 'companies-editor',
          component: CompaniesEditorView
        },
        {
          path: '/creator',
          name: 'companies-creator',
          component: CompaniesCreatorView
        },
        {
          path: '/eraser',
          name: 'companies-eraser',
          component: CompaniesEraserView
        }
      ]
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
      children: [
        {
          path: '/editor',
          name: 'plans-editor',
          component: PlansEditorView
        },
        {
          path: '/creator',
          name: 'plans-creator',
          component: PlansCreatorView
        },
        {
          path: '/eraser',
          name: 'plans-eraser',
          component: PlansEraserView
        }
      ]
    }
  ]
})

export default router
