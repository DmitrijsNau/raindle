<template>
  <div class="row justify-center">
    <div class="col-auto flex flex-center">
      <SarahsLogo />
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-auto">
      <IntroCard />
    </div>
  </div>
  <div v-if="isDataLoaded" class="row q-mt-sm justify-center">
    <div class="col-auto">
      <FormItemSelect v-if="!isItemGuessed && !isGameOver" />
      <div v-else-if="isGameOver && !isItemGuessed">
        <GameOverCard topic="item" :correctObject="todaysItemAnswer" />
      </div>
      <CongratsCard v-else topic="item" :correctObject="todaysItemAnswer" :streak="currentStreak" />
    </div>
  </div>
  <div class="row q-mt-sm justify-center"
  v-if="isDataLoaded && isStreakResetRef">
  <div class="col-auto flex flex-center">
    <LostStreakAlert :streak="currentStreak" />
  </div>
</div>
  <div v-if="isDataLoaded" class="row q-mt-md justify-center">
    <div class="col-5 flex flex-center">
      <HealthBar
        @game-over="isGameOver = true"
        :user-item-guesses="userItemGuesses"
        :is-item-guessed="isItemGuessed"
      />
    </div>
  </div>
  <div class="row q-mt-md justify-center">
    <div class="col-auto flex justify-space-between">
      <ItemDescriptionHint v-if="useDescriptionHint" :todays-item-answer="todaysItemAnswer" />
      <ItemSilhouetteHint
        v-if="useSilhouetteHint"
        :todays-item-answer="todaysItemAnswer"
      />
    </div>
  </div>
  <div class="row q-mt-sm justify-center"
  v-if="isDataLoaded">
  <div class="col-auto flex flex-center">
    <TotalCorrectGuesses :is-guess-correct="isGameGuessed" />
  </div>
</div>
  <div v-if="isDataLoaded && userItemGuesses.length >= 1 " class="row q-mt-md justify-center mobile-only">
    <div class="col-auto flex flex-center">
      <FormChangeTableView @minimize="minimizeCard" />
    </div>
  </div>
  <div class="row q-mt-md justify-center">
    <div
      class="col-10 flex justify-center"
      v-if="isDataLoaded && userItemGuesses.length >= 1 && !isTableMinimized"
    >
      <UserGuessItemsTable
        :todays-item-answer="todaysItemAnswer"
        :user-item-guesses="userItemGuesses"
        class="table q-mb-sm"
        style="overflow-x: auto;"
      />
    </div>
    <div
      class="col-auto flex justify-center mobile-only"
      v-else-if="isDataLoaded && userItemGuesses.length >= 1"
    >
      <UserGuessItemsTableMinimized
        :todays-item-answer="todaysItemAnswer"
        :user-item-guesses="userItemGuesses"
        class="table q-mb-sm"
        v-show="isTableMinimized"
      />
    </div>
  </div>
</template>
<script setup>
import { useStorage } from "@vueuse/core";
import { onMounted, ref, computed, watch } from "vue";

import FormItemSelect from "src/components/ItemsRaindle/Form/FormItemSelect.vue";
import UserGuessItemsTable from "src/components/ItemsRaindle/Tables/UserGuessItemsTable.vue";
import CongratsCard from "src/components/General/CongratsCard.vue";
import SarahsLogo from "src/components/General/SarahsLogo.vue";
import ItemDescriptionHint from "src/components/ItemsRaindle/Hints/ItemDescriptionHint.vue";
import ItemSilhouetteHint from "src/components/ItemsRaindle/Hints/ItemSilhouetteHint.vue";
import HealthBar from "src/components/General/HealthBar.vue";
import GameOverCard from "src/components/General/GameOverCard.vue";
import IntroCard from "src/components/ItemsRaindle/IntroCard.vue";
import FormChangeTableView from "src/components/ItemsRaindle/Form/FormChangeTableView.vue";
import UserGuessItemsTableMinimized from "src/components/ItemsRaindle/Tables/UserGuessItemsTableMinimized.vue";
import TotalCorrectGuesses from "src/components/ItemsRaindle/TotalCorrectGuesses.vue";
import LostStreakAlert from "src/components/General/LostStreakAlert.vue";

import useTodaysItemsAnswer from "src/composables/useTodaysItemsAnswer";
import useTodaysStreak from "src/composables/useTodaysSreak";
defineOptions({
  name: "ItemsRaindle",
});
const todaysItemAnswer = ref(null);
const isGameOver = ref(false);
const isGameGuessed = ref(false);
const isTableMinimized = ref(false);
const isStreakResetRef = ref(false);
const currentStreak = useStorage("Raindle_itemsCurrentStreak", 0, localStorage, {
  mergeDefaults: true,
})
const userItemGuesses = useStorage("Raindle_itemGuesses", [], localStorage, {
  mergeDefaults: true,
});
const isItemGuessed = computed(() => {
  return (
    todaysItemAnswer.value != null &&
    userItemGuesses.value.includes(todaysItemAnswer.value.itemName)
  );
});

onMounted(async () => {
  const { getTodaysItemsAnswer } = useTodaysItemsAnswer();
  const answerRef = await getTodaysItemsAnswer();
  todaysItemAnswer.value = answerRef.value;
  watch(() => isItemGuessed.value, (newValue) => {
    if (newValue) {
      isGameGuessed.value = true;
      isGameOver.value = true;
    }
  });
  watch(() => isGameOver.value, (newValue) => {
    if (newValue) {
      const { updateItemsStreak } = useTodaysStreak();
      const {itemsStreak, isStreakReset} = updateItemsStreak(isGameGuessed.value);
      currentStreak.value = itemsStreak.value;
      isStreakResetRef.value = isStreakReset.value;
    }
  });
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
const minimizeCard = (isMinimized) => {
  isTableMinimized.value = isMinimized;
};
</script>
<style scoped lang="scss">
.title-card {
  max-width: 80vw; /* Set the maximum width to 80% of the viewport width */
  max-height: 80vh; /* Set the maximum height to 80% of the viewport height */
}
</style>
