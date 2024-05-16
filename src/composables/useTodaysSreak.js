import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export default function useTodaysStreak() {
  // update streak function which will take win/lose as an argument and update streak based on current date
  const updateItemsStreak = (win) => {
    // get the current date based on users time so its better for them
    const currentDateUTC = new Date();
    const currentDay = currentDateUTC.getDate();
    const currentMonth = currentDateUTC.getMonth() + 1; // Months are 0-based in JavaScript
    const currentYear = currentDateUTC.getFullYear();
    const updatedLastDayPlayed = `${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;
    const currentDate = new Date(updatedLastDayPlayed);
    // subtract one day from the current date
    currentDate.setDate(currentDate.getDate() - 1);
    // get the date part of the current date in UTC
    const yesterdayDate = currentDate.toISOString().split("T")[0];
    const itemsStreak = useStorage(
      "Raindle_itemsCurrentStreak",
      0,
      localStorage,
      {
        mergeDefaults: true,
      }
    );
    // get the last day played from local storage if exists
    const itemsLastDayPlayed = useStorage(
      "Raindle_itemsLastDayPlayed",
      yesterdayDate,
      localStorage,
      {
        mergeDefaults: true,
      }
    );
    // get the highestKnownStreak from local storage if exists
    const highestKnownStreak = useStorage(
      "Raindle_itemsHighestKnownStreak",
      0,
      localStorage,
      {
        mergeDefaults: true,
      }
    );
    const isStreakReset = ref(false);
    if (!win) {
      // if the current streak is higher than the highest known streak, update the highest known streak
      if (itemsStreak.value > highestKnownStreak.value) {
        highestKnownStreak.value = itemsStreak.value;
      }
      itemsStreak.value = 0;
      isStreakReset.value = true;
      itemsLastDayPlayed.value = updatedLastDayPlayed;
      return { itemsStreak, isStreakReset };
    }
    // if the last day played is not yesterday, reset the streak
    if (itemsLastDayPlayed.value !== yesterdayDate) {
      itemsStreak.value = 1;
      // if the current streak is higher than the highest known streak, update the highest known streak
      if (itemsStreak.value > highestKnownStreak.value) {
        highestKnownStreak.value = itemsStreak.value;
      }
      isStreakReset.value = true;
      itemsLastDayPlayed.value = updatedLastDayPlayed;
      console.log("streak reset");
      return { itemsStreak, isStreakReset };
    }
    // increment the streak
    itemsStreak.value += 1;
    itemsLastDayPlayed.value = updatedLastDayPlayed;
    // if the current streak is higher than the highest known streak, update the highest known streak
    if (itemsStreak.value > highestKnownStreak.value) {
      highestKnownStreak.value = itemsStreak.value;
    }
    isStreakReset.value = false;
    return { itemsStreak, isStreakReset };
  };
  return { updateItemsStreak };
}
