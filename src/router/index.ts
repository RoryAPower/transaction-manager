import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import BaseLayout from '@/views/layouts/BaseLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: BaseLayout,
        children: [
            {
                path: '/',
                name: 'account',
                component: () => import('@/views/Account.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
