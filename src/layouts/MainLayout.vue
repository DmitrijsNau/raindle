
<template>
  <div class="bg-image" :style="{ backgroundImage: `url(${backgroundImage})` }">
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</div>
</template>

<script setup>
import { ref } from 'vue'

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
  padding: 10px;
  border: black 2px solid;
  overflow-x: auto; /* Enable horizontal scrolling */
}
.scrollable-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start; /* Align items to the left */
  width: max-content; /* Ensure the row takes at least the full width of its parent */
  padding-right: 0;
  margin-right: 0;
}
</style>
