import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "./pages/Homepage.vue";
import Searchpage from "./pages/Searchpage.vue";
import Showpage from "./pages/Showpage.vue";
import Payment from "./pages/Payment.vue";

const routes = [
    // homepage
    {
        path: '/',
        name: 'home',
        component: Homepage,
    },
    // searchPage ?? prob in home andrà
    {
        path: '/search',
        name: 'search',
        component: Searchpage,
    },
    //showPage
    {
        path: '/restaurant/:id',
        name: 'show',
        component: Showpage,
    },

    {
        path:'/payment',
        name:'payment',
        component:Payment
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;