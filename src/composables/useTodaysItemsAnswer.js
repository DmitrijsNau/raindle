import { useStorage } from "@vueuse/core";
import { ref } from "vue";
import { db } from "boot/firebase";
import { set, ref as firebaseRef, get, onValue } from "firebase/database";
import seedrandom from 'seedrandom';

export default function useTodaysItemsAnswer() {
  const todaysItemsAnswer = ref(null);
  const userItemGuesses = useStorage("Raindle_itemGuesses", [], localStorage, {
    mergeDefaults: true,
  });
  const gameNumber = useStorage("Raindle_itemGameNumber", 0, localStorage, {
    mergeDefaults: true,
  });
  const getTodaysItemsAnswer = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // reset time to 00:00:00
    const epoch = Math.floor(currentDate.getTime() / 1000);
    const totalProblems = 179; // TOTAL NUMBER OF PROBLEMS - Dynamically fetch from db
    const index = Math.floor((epoch / (24 * 60 * 60)) % totalProblems); // divide by seconds in a day
        // Use the index as a seed for a PRNG
    const seed = index + new Date().getFullYear();
    const random = new seedrandom(seed);
    const randomIndex = Math.floor(random() * totalProblems);
    // if current index in storage isnt the same as the index, reset the userItemGuesses and update the index
    if (gameNumber.value !== randomIndex) {
      userItemGuesses.value = [];
      gameNumber.value = randomIndex;
    }
    return new Promise((resolve, reject) => {
      const todaysItemRef = firebaseRef(db, `items/${randomIndex}`);
      onValue(
        todaysItemRef,
        (snapshot) => {
          todaysItemsAnswer.value = snapshot.val();
          resolve(todaysItemsAnswer);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  return { getTodaysItemsAnswer };
}
