<template>
  <div class="row scrollable-row row-font">
    <div class="col q-mx-xs col-width justify-center" v-for="header in headers" :key="header.header">
      <q-card v-if="header.header === 'Item'" square bordered :class="['text-center',  'row-card', 'thin-border', useItemBackgroundColor(), 'item-card']">
        <q-card-section >
          <q-tooltip class="text-h6">
            {{ itemGuess.itemName }}
          </q-tooltip>
          <q-img :src="itemGuess[headerToProperty[header.header]]" size="10vw" />
        </q-card-section>
      </q-card>
      <q-card square bordered v-else-if="header.header === 'Achievement'" :class="['row-card', 'thin-border', useColumnColor(header.header), 'flex','items-center', 'text-center', 'justify-center','text-body-1']">
        {{ itemGuess[headerToProperty[header.header]] ? 'Yes' : 'No'}}
    </q-card>
      <q-card square bordered v-else :class="['row-card', 'thin-border', useColumnColor(header.header), 'flex','items-center', 'text-center', 'justify-center','text-body-1']">
          {{ itemGuess[headerToProperty[header.header]] }}
      </q-card>
    </div>
  </div>
</template>
<script>
import { useItemsRaindleStore } from 'src/stores/itemsRaindle';
import { useGameSettingsStore } from 'src/stores/gameSettings';
export default{
  name: 'UserGuessItemsTableRow',
  props: {
    itemGuess: {
      type: Object,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    todaysItemAnswer: {
      type: Object,
      required: true
    }
  },
  setup() {
    const itemsRaindleStore = useItemsRaindleStore();
    const gameSettingsStore = useGameSettingsStore();
    return { itemsRaindleStore, gameSettingsStore };
  },
  data() {
    return {
      headerToProperty: {
        Item: "itemImage",
        Rarity: "rarity",
        "Item Type": "itemType",
        "Stack Type": "stackType",
        Cooldown: "cooldown",
        Color: "color",
        "Release Period": "releasePeriod",
        Achievement: "achievementUnlocked",
      },
      headerValuesMap: {
        Rarity: [
          "Untiered",
          "Common",
          "Uncommon",
          "Legendary",
          "Boss",
          "Equipment",
          "Lunar",
          "Void",
        ],
        "Stack Type": [
          "None",
          "Linear",
          "Linear Hyperbolic",
          "Hyperbolic",
          "Exponential",
          "Special",
        ],
        Cooldown: [
          "None",
          ".1-10 seconds",
          "11-44 seconds",
          "45 seconds",
          "60-99 seconds",
          "100+ seconds",
        ],
        "Release Period": ["Base Game", "Scorched Acres", "Skills 2.0", "Hidden Realms", "Artifacts", "1.0 Release", "Anniversary", "Survivors of the Void"],
      },
    };
  },
  methods: {
    useColumnColor(header) {
      if (this.isCloseGuess(header)) {
        return this.gameSettingsStore.colorBlindMode
          ? "bg-yellow-14"
          : "bg-yellow-14";
      }
      if (
        this.itemGuess[this.headerToProperty[header]] ===
        this.todaysItemAnswer[this.headerToProperty[header]]
      ) {
        return this.gameSettingsStore.colorBlindMode
          ? "bg-blue-8"
          : "bg-green-14";
      }
      return this.gameSettingsStore.colorBlindMode
        ? "bg-purple-6"
        : "bg-red-14";
    },
    appendEmoji(header, color) {
      let emoji;
      switch (color) {
        case "bg-yellow-14":
          emoji = "🟨";
          break;
        case "bg-blue-8":
        case "bg-green-14":
          emoji = "🟩";
          break;
        case "bg-purple-6":
        case "bg-red-14":
          emoji = "🟥";
          break;
      }
      this.itemsRaindleStore.appendEmoji(emoji);
      if (header === "Achievement") {
        this.itemsRaindleStore.appendEmoji("\n");
      }
    },
    isCloseGuess(header) {
      if (header === "Item") return false;
      if (header === "Color") {
        const guessColor = this.itemGuess[this.headerToProperty[header]];
        const correctColor =
          this.todaysItemAnswer[this.headerToProperty[header]];

        const guessColors = guessColor.includes("-")
          ? guessColor.split("-")
          : [guessColor];
        const correctColors = correctColor.includes("-")
          ? correctColor.split("-")
          : [correctColor];
        if (JSON.stringify(guessColors) === JSON.stringify(correctColors)) {
          return false;
        }
        return guessColors.some((color) => correctColors.includes(color));
      }
      if (header === "Item Type") {
        const guessTypes = this.itemGuess[this.headerToProperty[header]]
          .split(",")
          .map((type) => type.trim());
          const correctTypes = this.todaysItemAnswer[
          this.headerToProperty[header]
        ]
          .split(",")
          .map((type) => type.trim());
        const correctGuessTypes = guessTypes.filter((type) =>
          correctTypes.includes(type)
        );
        return (
          correctGuessTypes.length > 0 &&
          correctGuessTypes.length < guessTypes.length &&
          guessTypes.length !== correctTypes.length
        );
      }
      const values = this.headerValuesMap[header];
      if (!values) return false;
      const guessIndex = values.indexOf(
        this.itemGuess[this.headerToProperty[header]]
      );
      const correctIndex = values.indexOf(
        this.todaysItemAnswer[this.headerToProperty[header]]
      );
      return Math.abs(guessIndex - correctIndex) === 1;
    },
    useItemBackgroundColor() {
      if (this.gameSettingsStore.colorBlindMode) {
        return this.itemGuess.itemName === this.todaysItemAnswer.itemName
          ? "bg-blue-8"
          : "bg-blue-grey-14";
      }
      return this.itemGuess.itemName === this.todaysItemAnswer.itemName
        ? "bg-green-14"
        : "bg-blue-grey-14";
    },
  },
  mounted() {
    this.headers.forEach((header) => {
      const color = this.useColumnColor(header.header);
      this.appendEmoji(header.header, color);
    });
  },
  unmounted() {
    this.itemsRaindleStore.shareableEmoji = "";
  },
};
</script>
<style scoped>
.row-card {
  width: 10vw;
  height: 10vw;
  transition: transform 0.3s ease-in-out;
}
.col-width{
  width: 10vw !important;
  max-width: 10vw !important;
  min-width: 10vw !important;
}
.row-card:hover {
  transform: scale(1.05);
}
.row-font{
  font-size: .85rem;
}
.thin-border {
  border-width: 1px !important;
  border-color: #818181 !important;
  border: 1px solid #818181 !important;
}
.q-card__section {
  padding: 4px !important;
}
</style>
