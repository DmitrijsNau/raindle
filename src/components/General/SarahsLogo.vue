<template>
  <q-img @click="$router.push('/')" src="/images/raindle_logo.png" class="logo" />
</template>
<style scoped>
.logo:hover {
  transform: scale(1.1);
}
.logo{
  transition: transform 0.5s;
}
</style>
