<template>
  <div class="row justify-center">
    <div class="col-auto flex flex-center">
      <SarahsLogo />
    </div>
  </div>
  <div
    class="row q-my-sm justify-center"
    v-for="option in gameOptions"
    :key="option.title"
  >
    <div class="col-6">
      <q-card
        @click="$router.push(option.route)"
        square
        bordered
        class="text-center thick-border option-card"
      >
        <q-card-section>
          <div class="text-h4">{{ option.title }}</div>
          <div class="text-h6 text-grey">
            {{ option.description }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row justify-center q-my-6">
    <div class="col-6 flex flex-center">
      <MainInfo />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import SarahsLogo from "src/components/General/SarahsLogo.vue";
import MainInfo from 'src/components/General/MainInfo.vue'
defineOptions({
  name: "IndexPage",
});
const gameOptions = ref([
  {
    title: "Items",
    description: "Guess today's Risk of Rain 2 item!",
    route: "/items",
  },
  {
    title: "Characters",
    description:
      "Guess the character based on their ability icon (coming soon)",
    route: "/",
  },
  {
    title: "Stages",
    description: "Guess the stage (coming soon)",
    route: "/",
  },
  {
    title: "Endless Mode!",
    description: "The teleporter aligns with the planet...",
    route: "/",
  },
]);
</script>
<style scoped lang="scss">
.option-card {
  background-color: $blue-grey-14;
}
.option-card:hover {
  outline: 3px solid white;
  outline-offset: 2px;
  background-color: rgba(177, 177, 108, 0.95);
  cursor: pointer;
  color: white;
}
</style>
