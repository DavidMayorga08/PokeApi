import inicio from "../components/main.vue";
import card_pokemon from "../components/card_pokemon.vue";
import juego_pokemon from "../components/juego_pokemon.vue";
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {path: '/', component: inicio},
    {path: '/card_pokemon', component: card_pokemon},
    {path: '/juego_pokemon', component: juego_pokemon}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})