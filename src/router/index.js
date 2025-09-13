import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trade',
      component: () => import('@/pages/TradePage.vue'),
    },
    {
      path: '/pool',
      name: 'pool',
      component: () => import('@/pages/PoolPage.vue'),
      children: [
        {
          path: 'create',
          name: 'create',
          component: () => import('@/pages/CreatePoolPage.vue'),
        },
      ],
    },
    {
      path: '/bridge',
      name: 'bridge',
      component: () => import('@/pages/BridgePage.vue'),
    },
  ],
});

export default router;
