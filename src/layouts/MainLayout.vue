
<template>
  <div class="bg-image" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="row justify-center">
      <div class="col-auto flex flex-center">
        <SarahsLogo />
      </div>
    </div>
    <div class="row justify-center q-my-md">
      <div class="col-auto flex flex-center">
        <GameSettings />
        <MainInfo />
        <RaindleChangelog />
      </div>
    </div>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</div>
</template>

<script setup>
import { ref } from 'vue'
import MainInfo from 'src/components/General/MainInfo.vue'
import RaindleChangelog from "src/components/General/RaindleChangelog.vue";
import SarahsLogo from "src/components/General/SarahsLogo.vue";
import GameSettings from "src/components/General/GameSettings.vue";
defineOptions({
  name: 'MainLayout'
})
const useBackground = () => {
  const ratio = window.innerWidth / window.innerHeight
  if (ratio > 1.5) {
    return '/images/background.jpg'
  } else {
    return '/images/background-vertical.jpg'
  }
}
const backgroundImage = useBackground();
</script>
<style>
.bg-image {
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  overflow: scroll;
}
.thick-border {
  border-width: 2px !important;
  border-color: #818181 !important;
  border: 3px solid #818181 !important;
}
.bg-shadow {
  outline: 6px solid rgba(0, 0, 0, 0.7);
  outline-offset: 1px;
}
.table{
  background: rgba(0, 0, 0,.4);
  padding: 5px;
  border: black 2px solid;
  max-width: 100vw;
}
.scrollable-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start; /* Align items to the left */
  width: max-content; /* Ensure the row takes at least the full width of its parent */
  padding-right: 0;
  margin-right: 0;
}
.info-button {
  max-width: 20vw;
  font-size: 1rem;
}
/* Default font size for large screens */
html {
  font-size: 16px;
}

/* Smaller font size for screens less than 1200px wide */
@media screen and (max-width: 1200px) {
  html {
    font-size: 14px;
  }
}

/* Even smaller font size for screens less than 900px wide */
@media screen and (max-width: 900px) {
  html {
    font-size: 12px;
  }
}

/* Smallest font size for screens less than 600px wide */
@media screen and (max-width: 600px) {
  html {
    font-size: 10px;
  }
}
</style>
