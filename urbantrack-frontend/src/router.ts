 
import { createRouter, createWebHistory } from "vue-router"
import Home from './pages/Home.vue';
import Trajets from './pages/Trajet.vue'
import AjouterTrajet from './pages/AjouterTrajet.vue'
import TrajetDetail from "./pages/TrajetDetail.vue";
import StationComposer from "./pages/StationComposer.vue";

const routes = [
    { path : '/', component: Home },
    { path: '/trajets', component: Trajets },
    { path: '/ajouter', component: AjouterTrajet },
    {
        path: '/trajet/:id',
        name: 'TrajetDetail',
        component: TrajetDetail
      },
      {
        path:'/station-composer', component: StationComposer
      },
      { path: '/trajet/:id', component: TrajetDetail },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;