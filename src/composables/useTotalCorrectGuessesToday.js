import { ref } from "vue";
import { db } from "boot/firebase";
import { ref as firebaseRef, onValue, set } from "firebase/database";
import useTodaysDateUtility from "src/composables/useTodaysItemsAnswer";

export default function useTotalCorrectGuessesToday() {
  const totalCorrectGuessesToday = ref(0);
  const useTotalCorrectGuessesToday = async () => {
    const todaysDateUtility = useTodaysDateUtility();
    const currentDateUnix = await todaysDateUtility.getServerTimestamp();
    const currentDate = new Date(currentDateUnix);
    const utcDay = currentDate.getUTCDate();
    const utcMonth = currentDate.getUTCMonth() + 1; // getUTCMonth() returns a zero-based month, so add 1 to get the correct month
    const utcYear = currentDate.getUTCFullYear();
    const currentDateUTC = `${utcYear}-${utcMonth
      .toString()
      .padStart(2, "0")}-${utcDay.toString().padStart(2, "0")}`; // format as YYYY-MM-DD
    return new Promise((resolve, reject) => {
      // get the correct guesses for today
      const todayTotalCorrectGuesses = firebaseRef(
        db,
        `total-correct-guesses/${currentDateUTC}`
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
