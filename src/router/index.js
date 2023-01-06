import { createRouter, createWebHistory } from 'vue-router'
import Authentication from '../views/Authentication.vue'

const routes = [
	{
		path: '/',
		name: 'Authentication',
		component: Authentication,
	},
	{
		path: '/me',
		name: 'Stats',
		component: function () {
			return import('../views/Stats.vue')
		},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
