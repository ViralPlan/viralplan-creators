import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';
import HomeView from '../views/HomeView.vue';
import CompaniesView from '../views/Companies/CompaniesView.vue';
import CompaniesEditorView from '../views/Companies/CompaniesEditorView.vue';
import CompaniesCreatorView from '../views/Companies/CompaniesCreatorView.vue';
import CompaniesEraserView from '../views/Companies/CompaniesEraserView.vue';
import PlansView from '../views/Plans/PlansView.vue';
import PlansEditorView from '../views/Plans/PlansEditorView.vue';
import PlansCreatorView from '../views/Plans/PlansCreatorView.vue';
import PlansEraserView from '../views/Plans/PlansEraserView.vue';
import PlansClientView from '../views/Plans/PlansClientView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: authGuard,
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
      beforeEnter: authGuard,
    },
    {
      path: '/companies/editor',
      name: 'companies-editor',
      component: CompaniesEditorView,
      beforeEnter: authGuard,
    },
    {
      path: '/companies/creator',
      name: 'companies-creator',
      component: CompaniesCreatorView,
      beforeEnter: authGuard,
    },
    {
      path: '/companies/eraser',
      name: 'companies-eraser',
      component: CompaniesEraserView,
      beforeEnter: authGuard,
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
      beforeEnter: authGuard,
    },
    {
      path: '/plans/editor',
      name: 'plans-editor',
      component: PlansEditorView,
      beforeEnter: authGuard,
    },
    {
      path: '/plans/creator',
      name: 'plans-creator',
      component: PlansCreatorView,
      beforeEnter: authGuard,
    },
    {
      path: '/plans/eraser',
      name: 'plans-eraser',
      component: PlansEraserView,
      beforeEnter: authGuard,
    },
    {
      path: '/plans/clientview/:id/:date',
      name: 'plansClientView',
      component: PlansClientView,
    }
  ],
});

export default router;
