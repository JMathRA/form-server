import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../components/HomeView'
import ShowView from '../components/ShowView'
const routes = [
    {
        path: "/",
        component: HomeView,
    },
    {
        path: "/show",
        component: ShowView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;