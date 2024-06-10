import { timestamp, useStorage } from "@vueuse/core";
import { ref } from "vue";
import { db, firestore } from "boot/firebase";
import { set, ref as firebaseRef, onValue } from "firebase/database";
import { serverTimestamp } from "firebase/firestore";
import seedrandom from "seedrandom";

export default function useTodaysDateUtility() {
  const todaysItemsAnswer = ref(null);
  const userItemGuesses = useStorage("Raindle_itemGuesses", [], localStorage, {
    mergeDefaults: true,
  });
  const gameNumber = useStorage("Raindle_itemGameNumber", 0, localStorage, {
    mergeDefaults: true,
  });
  const getTodaysItemsAnswer = async () => {
    const utcDate = await getServerTimestamp();
    const epoch = Math.floor(utcDate / 1000);
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
  const getServerTimestamp = async () => {
    // Write the server timestamp to the database
    const serverTimestampRef = firebaseRef(db, "time");
    set(serverTimestampRef, {
      ".sv": "timestamp",
    });
    // Create a promise that resolves with the server timestamp
    return new Promise((resolve, reject) => {
      // Read the server timestamp from the database
      const timestampRef = firebaseRef(db, "time");
      onValue(
        timestampRef,
        (snapshot) => {
          const serverTime = snapshot.val();
          resolve(serverTime);
        },
        {
          onlyOnce: true,
        }
      );
    });
  };

  return { getTodaysItemsAnswer, getServerTimestamp };
}
