<template>
  <div class="row scrollable-row">
    <div class="col q-mx-sm col-width justify-center" v-for="header in headers" :key="header.header">
      <q-card v-if="header.header === 'Item'" square bordered :class="['text-center',  'row-card', 'thick-border', useItemBackgroundColor()]">
        <q-card-section >
          <q-tooltip class="text-h6">
            {{ itemGuess.itemName }}
          </q-tooltip>
          <q-img :src="itemGuess[headerToProperty[header.header]]" />
        </q-card-section>
      </q-card>
      <q-card square bordered v-else-if="header.header === 'Achievement'" :class="['row-card', 'thick-border', useColumnColor(header.header), 'flex','items-center', 'text-center', 'justify-center','text-body-1']">
        {{ itemGuess[headerToProperty[header.header]] ? 'Yes' : 'No'}}
    </q-card>
      <q-card square bordered v-else :class="['row-card', 'thick-border', useColumnColor(header.header), 'flex','items-center', 'text-center', 'justify-center','text-body-1']">
          {{ itemGuess[headerToProperty[header.header]] }}
      </q-card>
    </div>
  </div>
</template>
<script>
import { useItemsRaindleStore } from 'src/stores/itemsRaindle';
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
    return { itemsRaindleStore };
  },
  data() {
    return {
      headerToProperty: {
        'Item': 'itemImage',
        'Rarity': 'rarity',
        'Stack Type': 'stackType',
        'Cooldown': 'cooldown',
        'Color': 'color',
        'Release Period': 'releasePeriod',
        'Achievement': 'achievementUnlocked',
      },
      headerValuesMap: {
        'Rarity': ['Untiered','Common', 'Uncommon', 'Legendary', 'Boss', 'Equipment', 'Lunar', 'Void'],
        'Stack Type': ['None','Linear', 'Linear Hyperbolic', 'Hyperbolic', 'Exponential', 'Special'],
        'Cooldown': ['None', '.1-10 seconds', '11-44 seconds', '45 seconds', '60-99 seconds', '100+ seconds'],
        'Release Period': ['Base Game', '1.0 Release', 'Survivors of the Void'],
      }
    };
  },
  methods: {
    useColumnColor(header) {
    if (this.isCloseGuess(header)) {
      return 'bg-yellow-14';
    }
    if (this.itemGuess[this.headerToProperty[header]] === this.todaysItemAnswer[this.headerToProperty[header]]) {
      return 'bg-green-14';
    }
    return 'bg-red-14';
  },
  appendEmoji(header, color) {
    let emoji;
    switch (color) {
      case 'bg-yellow-14':
        emoji = '🟨';
        break;
      case 'bg-green-14':
        emoji = '🟩';
        break;
      case 'bg-red-14':
        emoji = '🟥';
        break;
    }
    this.itemsRaindleStore.appendEmoji(emoji);
    if (header === 'Achievement') {
      this.itemsRaindleStore.appendEmoji('\n');
    }
  },
    isCloseGuess(header) {
      if (header === 'Color') {
        const guessColor = this.itemGuess[this.headerToProperty[header]];
        const correctColor = this.todaysItemAnswer[this.headerToProperty[header]];

        const guessColors = guessColor.includes('-') ? guessColor.split('-') : [guessColor];
        const correctColors = correctColor.includes('-') ? correctColor.split('-') : [correctColor];
      if (JSON.stringify(guessColors) === JSON.stringify(correctColors)) {
        return false;
      }
      return guessColors.some(color => correctColors.includes(color));
      }
      const values = this.headerValuesMap[header];
      if (!values) return false;
      const guessIndex = values.indexOf(this.itemGuess[this.headerToProperty[header]]);
      const correctIndex = values.indexOf(this.todaysItemAnswer[this.headerToProperty[header]]);
      return Math.abs(guessIndex - correctIndex) === 1;
    },
    useItemBackgroundColor() {
      return this.itemGuess.itemName === this.todaysItemAnswer.itemName ? 'bg-green-14' : 'bg-blue-grey-14';
    }
  },
  mounted() {
    this.headers.forEach(header => {
      if (header.header === 'Item') return;
      const color = this.useColumnColor(header.header);
      this.appendEmoji(header.header, color);
    });
  },
  unmounted() {
    this.itemsRaindleStore.shareableEmoji = '';
  }
};
</script>
<style scoped>
.row-card {
  width: 85px;
  height: 85px;
  transition: transform 0.3s ease-in-out;
}
.col-width{
  width: 85px !important;
  max-width: 85px !important;
  min-width: 85px !important;
}
.row-card:hover {
  transform: scale(1.05);
}
</style>
