<template>
  <div class="row justify-center">
    <div class="col-6">
      <SarahsLogo />
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-8">
      <q-card square bordered class="text-center bg-blue-grey-14 thick-border">
        <q-card-section>
          <div class="text-h4">Guess today's Risk of Rain 2 item!</div>
          <div class="text-h6 text-grey">
            If you lose all your health, the game is over!
            Yellow indicates the item is close to the correct answer.
            Hover over the column names for more information.
          </div>
          <div class="text-h5">Type any item to start</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-if="isDataLoaded" class="row q-mt-sm justify-center">
    <div class="col-auto">
      <FormItemSelect v-if="!isItemGuessed && !isGameOver" />
      <div v-else-if="isGameOver && !isItemGuessed">
        <GameOverCard topic="item" :correctObject="todaysItemAnswer" />
      </div>
      <CongratsCard v-else topic="item" :correctObject="todaysItemAnswer" />
    </div>
  </div>
  <div class="row q-mt-md justify-center">
    <div class="col-4 flex flex-center">
      <HealthBar
        @game-over="isGameOver = true"
        :user-item-guesses="userItemGuesses"
        :is-item-guessed="isItemGuessed"
      />
    </div>
  </div>
  <div
    v-if="useDescriptionHint && isDataLoaded && !isGameOver"
    class="row q-mt-md justify-center"
  >
    <div class="col-auto flex justify-space-between">
      <ItemDescriptionHint :todays-item-answer="todaysItemAnswer" />
      <ItemSilhouetteHint
        v-if="useSilhouetteHint"
        :todays-item-answer="todaysItemAnswer"
      />
    </div>
  </div>
  <div class="row q-mt-md justify-center">
    <div class="col-7 flex justify-center" v-if="isDataLoaded && userItemGuesses.length >= 1">
      <UserGuessItemsTable
        :todays-item-answer="todaysItemAnswer"
        :user-item-guesses="userItemGuesses"
        class="table q-mb-sm"
      />
    </div>
  </div>
</template>
<script setup>
import { useStorage } from "@vueuse/core";
import { onMounted, ref, computed } from "vue";

import FormItemSelect from "src/components/ItemsRaindle/Form/FormItemSelect.vue";
import UserGuessItemsTable from "src/components/ItemsRaindle/UserGuessItemsTable.vue";
import useTodaysItemsAnswer from "src/composables/useTodaysItemsAnswer";
import CongratsCard from "src/components/General/CongratsCard.vue";
import SarahsLogo from "src/components/General/SarahsLogo.vue";
import ItemDescriptionHint from "src/components/ItemsRaindle/Hints/ItemDescriptionHint.vue";
import ItemSilhouetteHint from "src/components/ItemsRaindle/Hints/ItemSilhouetteHint.vue";
import HealthBar from "src/components/General/HealthBar.vue";
import GameOverCard from "src/components/General/GameOverCard.vue";
defineOptions({
  name: "ItemsRaindle",
});
const todaysItemAnswer = ref(null);
const isGameOver = ref(false);
const userItemGuesses = useStorage("Raindle_itemGuesses", [], localStorage, {
  mergeDefaults: true,
});

onMounted(async () => {
  const { getTodaysItemsAnswer } = useTodaysItemsAnswer();
  const answerRef = await getTodaysItemsAnswer();
  todaysItemAnswer.value = answerRef.value;
});
const isItemGuessed = computed(() => {
  return (
    todaysItemAnswer.value != null &&
    userItemGuesses.value.includes(todaysItemAnswer.value.itemName)
  );
});
const isDataLoaded = computed(
  () => todaysItemAnswer.value != null && userItemGuesses.value != null
);
const useDescriptionHint = computed(
  () => userItemGuesses.value.length >= 4 && !isItemGuessed.value
);
const useSilhouetteHint = computed(
  () => userItemGuesses.value.length >= 6 && !isItemGuessed.value
);
</script>
<style scoped lang="scss">
.title-card {
  max-width: 80vw; /* Set the maximum width to 80% of the viewport width */
  max-height: 80vh; /* Set the maximum height to 80% of the viewport height */
}
</style>
