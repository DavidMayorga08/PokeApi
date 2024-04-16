<template>
    <div class="app">
        <div class="cont_card">
            <div class="cont_info1">
                <p class="text_pokecard">Pokecard</p> 
                <router-link to="/card_pokemon">
                    <div class="pokebola">
                        <div class="pokebola-botao"></div>
                    </div>
                </router-link>
            </div>
            <div class="cont_info2">
                <p class="text_juego">Juego</p>
                <router-link to="/juego_pokemon">
                    <div class="pokebola">
                        <div class="pokebola-botao"></div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'


</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #c7c7c7;
}

.cont_card {
    background-color: #ffffff;
    width: 70%;
    height: 70%;
    display: flex;
    border-radius: 20px;
    animation: levitar 1.5s infinite alternate ease-in-out
}

@keyframes levitar {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-8px);
    }
}

.cont_info1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 53%;
    height: 100%;
    background-color: #ef4036;
    clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
    border-radius: 20px 0 0 20px;
    position: relative;
}

.cont_info2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 47%;
    height: 100%;
    position: relative;
}

.text_pokecard {
    position: absolute;
    z-index: 100;
    top: 3%;
    font-size: 90px;
    color: #ffffff;
    font-family: 'Chiller', fantasy;
}

.text_juego {
    position: absolute;
    z-index: 100;
    top: 3%;
    font-size: 90px;
    color: #ef4036;
    font-family: 'Chiller', fantasy;
}

.pokebola {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: #FFF;
    border: 5px solid #000;
    border-radius: 50%;
    box-shadow: inset -10px 10px 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.pokebola:before,
.pokebola:after {
    content: "";
    position: absolute;
}

.pokebola:before {
    background-color: #EF4036;
    width: 100%;
    height: 50%;
}

.pokebola:after {
    top: calc(50% - 10px);
    width: 100%;
    height: 20px;
    background-color: #000;
}

.pokebola-botao {
    width: 50px;
    height: 50px;
    background-color: #FFF;
    border: 10px solid #000;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    z-index: 10;
}

.pokebola-botao:before {
    content: "";
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    width: 20px;
    height: 20px;
    background-color: #FFF;
    border: 3px solid #000;
    border-radius: 50%;
    z-index: 10;
}

.pokebola:hover {
    scale: 1.1;
    cursor: pointer;
    transition: all 0.3s;
    transform: rotate(25deg);
}
</style>