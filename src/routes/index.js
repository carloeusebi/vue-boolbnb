import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import HomePage from '../pages/HomePage.vue';
import ApartmentDetailPage from '../pages/ApartmentDetailPage.vue';
import CreateApartmentPage from '../pages/CreateApartmentPage.vue';
import ApartmentEditPage from '../pages/ApartmentEditPage.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
			name: 'home',
		},
		{
			path: '/apartments/:slug',
			component: ApartmentDetailPage,
			name: 'apartment-detail',
		},
		{
			path: '/login',
			component: LoginPage,
			name: 'login',
			meta: {
				requiresGuest: true,
			},
		},
		{
			path: '/user',
			name: 'registered-user',
			meta: {
				requiresLogin: true,
			},
			children: [
				{
					path: '/add-apartment',
					component: CreateApartmentPage,
					name: 'apartments.create',
				},
				{
					path: '/edit-apartment/:slug',
					component: ApartmentEditPage,
					name: 'apartments.edit',
				},
			],
		},
	],
});

export { router };
