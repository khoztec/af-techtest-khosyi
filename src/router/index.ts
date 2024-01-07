import { createRouter, createWebHistory } from 'vue-router'
import assetsMain from '../views/assets/assetsIndex.vue'
import assetsAdd from '../views/assets/assetsAdd.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/asset' },
    {
      path: '/asset',
      name: 'assetIndex',
      component: assetsMain,
    },
    {
      path: '/asset/add',
      name: 'assetAdd',
      component: assetsAdd,
    },
  ]
})

export default router
