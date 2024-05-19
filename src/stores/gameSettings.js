import { defineStore } from "pinia";

export const useGameSettingsStore = defineStore("game-settings", {
  state: () => ({
    hardMode: true,
    colorBlindMode: false,
  }),
});
