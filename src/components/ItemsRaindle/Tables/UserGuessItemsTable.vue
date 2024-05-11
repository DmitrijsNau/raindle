<template>
  <div v-if="isDataLoaded" class="scrollable-table scroll">
    <div class="row">
      <div class="col-auto">
        <UserGuessItemsTableHeader :headers="headers" />
      </div>
    </div>
    <div v-for="itemName in userItemGuessesReverse" class="row scrollable-row" :key="itemName">
      <div class="col-auto q-mt-sm q-mb-md">
        <UserGuessItemsTableRow
          :itemGuess="allItemsByName[itemName]"
          :headers="headers"
          :todaysItemAnswer="todaysItemAnswer"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { set, ref as firebaseRef, get, onValue } from "firebase/database";
import { onMounted, ref, computed } from "vue";

import UserGuessItemsTableHeader from "src/components/ItemsRaindle/TableComponents/UserGuessItemsTableHeader.vue";
import UserGuessItemsTableRow from "src/components/ItemsRaindle/TableComponents/UserGuessItemsTableRow.vue";
import { db } from "src/boot/firebase";

defineOptions({
  name: "UserGuessItemsTable",
});
const props = defineProps({
  todaysItemAnswer: {
    type: Object,
    required: true,
  },
  userItemGuesses: {
    type: Array,
    required: true,
  },
});

const allItemsByName = ref(null);
const isDataLoaded = ref(false);
const userItemGuessesReverse = computed(() => props.userItemGuesses.slice().reverse());

onMounted(async () => {
  try {
    const itemsSelectRef = firebaseRef(db, "items-by-name");
    const snapshot = await get(itemsSelectRef);
    allItemsByName.value = snapshot.val();
    isDataLoaded.value = true;
  } catch (error) {
    console.error(error);
  }
});

const headers = ref([{
  header: "Item",
  tooltip: "The item you guessed",
},
{
  header: "Rarity",
  tooltip: "Untiered, Common, Uncommon, Legendary, Boss, Equipment, Lunar, or Void",
},
{
  header: "Color",
  tooltip: "Color of the item. Primary-Secondary (optional)",
},
{
  header: "Stack Type",
  tooltip: "None, Linear, Linear Hyperbolic, Hyperbolic, Exponential, or 'Special' ;)",
},
{
  header: "Cooldown",
  tooltip: "None, .1-10, 11-44, 45, 60-99, 100+ seconds",
},
{
  header: "Release Period",
  tooltip: "Base game, 1.0 release, or Survivors of the Void",
},
{
  header: "Achievement",
  tooltip: "Yes or No - item is locked behind an achievement",
}]);
</script>
<style scoped>
.scroll{
  width: max-content !important; /* Make the width equal to the maximum width of the content */
}
</style>
