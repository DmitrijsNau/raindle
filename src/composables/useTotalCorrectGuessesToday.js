import { ref } from "vue";
import { db } from "boot/firebase";
import { ref as firebaseRef, onValue, set } from "firebase/database";

export default function useTotalCorrectGuessesToday() {
  const totalCorrectGuessesToday = ref(0);
  const useTotalCorrectGuessesToday = async () => {
    const currentDate = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return new Promise((resolve, reject) => {
      // get the correct guesses for today
      const todayTotalCorrectGuesses = firebaseRef(
        db,
        `total-correct-guesses/${currentDate}`
      );
      onValue(
        todayTotalCorrectGuesses,
        (snapshot) => {
          if (snapshot.val() === null) {
            console.log("No total correct guesses for today, setting to 1");
            set(todayTotalCorrectGuesses, 0);
            totalCorrectGuessesToday.value = 0;
          } else {
            totalCorrectGuessesToday.value = snapshot.val();
          }
          resolve(totalCorrectGuessesToday);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  return { useTotalCorrectGuessesToday };
}
