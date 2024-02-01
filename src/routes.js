import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "./pages/Homepage.vue";
import Searchpage from "./pages/Searchpage.vue";
import Showpage from "./pages/Showpage.vue";

const routes = [
    // homepage
    {
        path: '/tech-training-deliveboo-fontoffice/',
        name: 'home',
        component: Homepage,
    },
    // searchPage
    {
        path: '/tech-training-deliveboo-fontoffice/search',
        name: 'search',
        component: Searchpage,
    },
    //showPage
    {
        path: '/show/:id',
        name: 'show',
        component: Showpage,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;