<template>
  <q-img @click="$router.push('/')" src="/images/raindle_logo.png" class="logo cursor-pointer" />
</template>
<style scoped>
.logo:hover {
  transform: scale(1.1);
}
.logo{
  transition: transform 0.5s;
  width: 70vw;
  height: auto;
  max-width: 700px; /* replace with the image's original width */
}
</style>
