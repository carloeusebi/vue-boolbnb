import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../pages/LoginPage.vue';
import HomePage from '../pages/HomePage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes:[        
        {
            path: '/',
            component: HomePage,
            name: 'home',
        },
        {
            path: '/login',
            component: LoginPage,
            name: 'login',
        }
    ]
})

export {router}