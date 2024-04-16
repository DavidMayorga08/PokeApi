<template>
  <div class="juego_pokemon">
  <div class="cont_alert" v-if="Alerta">
    <div class="alert">
      <p class="text_alert">{{ alerta }}</p>
    </div>
  </div>
    <div class="container"></div>
    <div class="cont_info">
      <transition name="fade1">
        <div class="cont_btn_iniciar" v-if="btn_iniciar">
          <button class="iniciar" @click.prevent="iniciar()">
            I N I C I A R
            <div id="clip">
              <div id="leftTop" class="corner"></div>
              <div id="rightBottom" class="corner"></div>
              <div id="rightTop" class="corner"></div>
              <div id="leftBottom" class="corner"></div>
            </div>
            <span id="rightArrow" class="arrow"></span>
            <span id="leftArrow" class="arrow"></span>
          </button>
        </div>
      </transition>
      <div class="cont_juego" v-if="cont_juego">
        <div class="cont_tipo">
          <p class="text_tipo">{{ tipo }}</p>
        </div>
        <div class="cont_info_juego">
          <div class="cont_img">
            <img :src="img" alt="pokemon" :class="{ oscuro: !adivinado }">
          </div>
          <div class="cont_pistas">
            <div class="cont_hp">
              <p class="text_hp">HP</p>
              <div class="cont_progreso">
                <q-circular-progress reverse :value="hp" size="120px" color="teal"
                  class="q-ma-md"></q-circular-progress>
                <p class="text_num">{{ hp }}</p>
              </div>
            </div>
            <div class="cont_ataque">
              <p class="text_ataque">Ataque</p>
              <div class="cont_progreso">
                <q-circular-progress reverse :value="ataque" size="120px" color="teal"
                  class="q-ma-md"></q-circular-progress>
                <p class="text_num">{{ ataque }}</p>
              </div>
            </div>
            <div class="cont_defensa">
              <p class="text_defensa">Defensa</p>
              <div class="cont_progreso">
                <q-circular-progress reverse :value="defensa" size="120px" color="teal"
                  class="q-ma-md"></q-circular-progress>
                <p class="text_num">{{ defensa }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cont_btn_enviar">
          <div class="form-control">
            <input type="value" required="" v-model="nombre2">
            <label>
              <span style="transition-delay:0ms">N</span>
              <span style="transition-delay:50ms">o</span>
              <span style="transition-delay:100ms">m</span>
              <span style="transition-delay:150ms">b</span>
              <span style="transition-delay:200ms">r</span>
              <span style="transition-delay:250ms">e</span>
            </label>
          </div>
          <button class="iniciar btn" @click.prevent="enviar()">
            E N V I A R
            <div id="clip">
              <div id="leftTop" class="corner"></div>
              <div id="rightBottom" class="corner"></div>
              <div id="rightTop" class="corner"></div>
              <div id="leftBottom" class="corner"></div>
            </div>
            <span id="rightArrow" class="arrow"></span>
            <span id="leftArrow" class="arrow"></span>
          </button>
        </div>
        <div class="cont_btn_salir">
          <router-link to="/">
            <button class="Btn">
              <div class="sign"><svg viewBox="0 0 512 512">
                  <path
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                  </path>
                </svg></div>
              <div class="text_salir">Salir</div>
            </button>
          </router-link>
        </div>
        <div class="cont_btn_reintentar">
          <button class="button1">
            <svg class="svg-icon" fill="none" height="20" viewBox="0 0 20 20" width="20"
              xmlns="http://www.w3.org/2000/svg">
              <g stroke="#ff342b" stroke-linecap="round" stroke-width="1.5">
                <path
                  d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468">
                </path>
                <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986">
                </path>
              </g>
            </svg>
            <span class="lable" @click="nuevo()">Nuevo</span>
          </button>
        </div>
        <div class="cont_btn_rendirse">
          <button class="button" @click="rendirse()"> Rendirse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

let btn_iniciar = ref(true);
let cont_juego = ref(false);
let nombre2 = ref('')
let pokemones = ref({});
let nombre = ref('')
let tipo = ref('')
let img = ref('')
let hp = ref(0)
let ataque = ref(0)
let defensa = ref(0)
let adivinado = ref(false);
let alerta = ref('');
let Alerta = ref(false)

const ocultarAlerta = () => {
  setTimeout(() => {
    alerta.value = '';
    Alerta.value = false
  }, 2000);
};

async function iniciar() {
  try {
    let random = parseInt(Math.random() * 500 + 1);
    let pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + random);
    pokemones.value = pokemon.data;
    nombre.value = pokemones.value.name;
    img.value = pokemones.value.sprites.other.dream_world.front_default;
    hp.value = pokemones.value.stats[0].base_stat;
    ataque.value = pokemones.value.stats[1].base_stat;
    defensa.value = pokemones.value.stats[2].base_stat;
    tipo.value = pokemones.value.types[0].type.name;
  } catch (error) {
    console.log(error);
  }
  btn_iniciar.value = false;
  setTimeout(() => {
    cont_juego.value = true;
  }, 1000);
}

function enviar() {
  if (nombre2.value == nombre.value) {
    adivinado.value = true;
    alerta.value = 'Adivinado';
    Alerta.value = true;
    ocultarAlerta()
  } else {
    alerta.value = 'Incorrecto';
    Alerta.value = true;
    ocultarAlerta()
  }
}

function rendirse() {
  adivinado.value = true;
  alerta.value = `El nombre era ${nombre.value}`;
  Alerta.value = true
  ocultarAlerta()
}

async function nuevo() {
  cont_juego.value = false;
  adivinado.value = false
  try {
    let random = parseInt(Math.random() * 500 + 1);
    let pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + random);
    pokemones.value = pokemon.data;
    nombre.value = pokemones.value.name;
    img.value = pokemones.value.sprites.other.dream_world.front_default;
    hp.value = pokemones.value.stats[0].base_stat;
    ataque.value = pokemones.value.stats[1].base_stat;
    defensa.value = pokemones.value.stats[2].base_stat;
    tipo.value = pokemones.value.types[0].type.name;
    cont_juego.value = true;
  } catch (error) {
    console.log(error);
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

.juego_pokemon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.cont_alert{
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert{
  background-color: #ffffff;
  width: 25%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  border-radius: 10px;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #313131;
  background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px
}

.cont_info {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.iniciar {
  position: relative;
  width: 11em;
  height: 4em;
  outline: none;
  transition: 0.1s;
  background-color: transparent;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: #ddebf0;
  cursor: pointer;
}

#clip {
  --color: #bd0000;
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 5px double var(--color);
  box-shadow: inset 0px 0px 15px #bb0000;
  -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

.arrow {
  position: absolute;
  transition: 0.2s;
  background-color: #c00000;
  top: 35%;
  width: 11%;
  height: 30%;
}

#leftArrow {
  left: -13.5%;
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
}

#rightArrow {
  -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
  left: 102%;
}

.iniciar:hover #rightArrow {
  background-color: #27c39f;
  left: -15%;
  animation: 0.6s ease-in-out both infinite alternate rightArrow8;
}

.iniciar:hover #leftArrow {
  background-color: #27c39f;
  left: 103%;
  animation: 0.6s ease-in-out both infinite alternate leftArrow8;
}

.corner {
  position: absolute;
  width: 4em;
  height: 4em;
  background-color: #be0000;
  box-shadow: inset 1px 1px 8px #c60000;
  transform: scale(1) rotate(45deg);
  transition: 0.2s;
}

#rightTop {
  top: -1.98em;
  left: 91%;
}

#leftTop {
  top: -1.96em;
  left: -3.0em;
}

#leftBottom {
  top: 2.10em;
  left: -2.15em;
}

#rightBottom {
  top: 45%;
  left: 88%;
}

.iniciar:hover #leftTop {
  animation: 0.1s ease-in-out 0.05s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
}

.iniciar:hover #rightTop {
  animation: 0.1s ease-in-out 0.15s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
}

.iniciar:hover #rightBottom {
  animation: 0.1s ease-in-out 0.25s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
}

.iniciar:hover #leftBottom {
  animation: 0.1s ease-in-out 0.35s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
}

.iniciar:hover .corner {
  transform: scale(1.25) rotate(45deg);
}

.iniciar:hover #clip {
  animation: 0.2s ease-in-out 0.55s both greenLight8;
  --color: #27c39f;
}

@keyframes changeColor8 {
  from {
    background-color: #e70000;
  }

  to {
    background-color: #27c39f;
  }
}

@keyframes lightEffect8 {
  from {
    box-shadow: 1px 1px 5px #27c39f;
  }

  to {
    box-shadow: 0 0 2px #27c39f;
  }
}

@keyframes greenLight8 {
  from {}

  to {
    box-shadow: inset 0px 0px 32px #27c39f;
  }
}

@keyframes leftArrow8 {
  from {
    transform: translate(0px);
  }

  to {
    transform: translateX(10px);
  }
}

@keyframes rightArrow8 {
  from {
    transform: translate(0px);
  }

  to {
    transform: translateX(-10px);
  }
}

.fade1-enter-active,
.fade1-leave-active {
  transition: opacity .8s;
}

.fade1-enter,
.fade1-leave-to {
  opacity: 0;
}

.cont_juego {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.cont_tipo {
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text_tipo {
  font-size: 50px;
  color: white;
}

.cont_info_juego {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.cont_img {
  width: 50%;
  height: 80%;
  display: flex;
  justify-content: center;
}

img {
  transition: filter 1s ease-in-out;
}

.oscuro {
  filter: brightness(0%);
}

.cont_pistas {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 200px;
}

.cont_hp,
.cont_ataque,
.cont_defensa {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 20px;
}

.cont_progreso {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text_hp,
.text_ataque,
.text_defensa {
  font-size: 20px;
  color: white;
}

.text_num {
  position: absolute;
  font-size: 30px;
  color: white;
}

.cont_btn_enviar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 190px;
  margin-left: 10%;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: #009688;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #fff;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus+label span,
.form-control input:valid+label span {
  color: #009688;
  transform: translateY(-30px);
}

.cont_btn_salir {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.btn {
  margin-left: 5%;
}

.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}

/* text */
.text_salir {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}

/* hover effect on button width */
.Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}

/* hover effect button's text */
.Btn:hover .text_salir {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}

/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}

.cont_btn_reintentar {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.button1 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  height: 34px;
  width: 112px;
  border: none;
  background: #ff362b34;
  border-radius: 20px;
  cursor: pointer;
}

.lable {
  line-height: 20px;
  font-size: 17px;
  color: #FF342B;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.button1:hover {
  background: #ff362b74;
}

.button1:hover .svg-icon {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.cont_btn_rendirse {
  position: absolute;
  top: 10px;
  right: 10px;
}

.button {
 --color: #00A97F;
 padding: 0.8em 1.7em;
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 400;
 font-size: 17px;
 border: 1px solid;
 font-family: inherit;
 text-transform: uppercase;
 color: var(--color);
 z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {
 color: rgb(10, 25, 30);
}

.button:active {
 filter: brightness(.8);
}

</style>