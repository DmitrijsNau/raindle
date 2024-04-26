<template>
  <div class="health-bar text-center">
    <div class="health-bar__inner shadow-10 bg-light-green-14" :style="{ width: `${(useHealth / maxHealth) * 100}%` }"> </div>
    <div class="health-bar__text">{{ useHealth }} / {{ maxHealth }}</div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect } from "vue";
const props = defineProps({
  userItemGuesses: {
    type: Array,
    required: true,
  },
  isItemGuessed: {
    type: Boolean,
    required: true,
  },
});
const maxHealth = ref(91)
const useHealth = computed(() => {
  let healthLost = 13 * props.userItemGuesses.length;
  if (props.isItemGuessed) {
    healthLost -= 13; // add back the health lost for the correct guess
  }
  return maxHealth.value - healthLost;
})
const emit = defineEmits(["game-over"]);

watchEffect(() => {
  if (useHealth.value <= 0) {
    emit('game-over');
  }
});

</script>
<style scoped>
.health-bar {
  position: relative;
  background-color: transparent;
  height: 50px; /* Adjust this value as needed */
  width: 100%; /* Ensure the bar takes full width */
  border: 1px solid rgba(255, 255, 255,.5);
  max-width: 700px; /* Adjust this value as needed */
  min-width: 100px;
}
.health-bar__inner {
  height: 100%;
}
.health-bar__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
