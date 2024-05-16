<template>
  <div class="text-h5">
    {{ todaysTotalCorrectGuesses }} people have guessed the item today
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import useTodaysCorrectGuessesToday from "src/composables/useTotalCorrectGuessesToday";
import { ref as firebaseRef, onValue, runTransaction } from "firebase/database";
import { useStorage } from "@vueuse/core";
import { db } from "boot/firebase";
const todaysTotalCorrectGuesses = ref(0);
const props = defineProps({
  isGuessCorrect: {
    type: Boolean,
    required: true,
  },
});
watch(
  () => props.isGuessCorrect,
  (newValue) => {
    if (newValue) {
      const isGameGuessed = useStorage("Raindle_isGameGuessed", false);
      if (!isGameGuessed.value) {
        isGameGuessed.value = true;
        const currentDate = new Date().toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const todayTotalCorrectGuesses = firebaseRef(
          db,
          `total-correct-guesses/${currentDate}`
        );
        // Start a transaction on the node
        runTransaction(todayTotalCorrectGuesses, (currentData) => {
          if (currentData === null) {
            return 1; // if null, set the value to 1
          } else {
            return currentData + 1; // if not null, increment the value
          }
        });
      }
    }
  }
);
onMounted(async () => {
  const { useTotalCorrectGuessesToday } = useTodaysCorrectGuessesToday();
  try {
    todaysTotalCorrectGuesses.value = await useTotalCorrectGuessesToday();
  } catch (error) {
    console.error(error);
  }
});
</script>
