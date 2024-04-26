<template>
  <q-card square bordered class="text-center bg-blue-grey-14 thick-border">
    <q-card-section class="text-h2 text-lime-14">
      Congratulations!
    </q-card-section>
    <q-card-section class="text-h5">
      You have guessed the {{ topic }} correctly!
    </q-card-section>
    <q-card-section class="text-h5">
      The correct {{ topic }} is <span :class="useTextColor()">{{ correctObject.itemName }}</span>.
    </q-card-section>
    <q-card-section>
      <q-img :src="correctObject.itemImage" class="item-img"/>
    </q-card-section>
    <q-card-section class="text-h6">
        Think you did better than your friends? Share your result:
    </q-card-section>
    <q-card-section >
      <div class="share-card thick-border" v-html="formattedShareableEmojiDisplay"></div>
    </q-card-section>
    <q-card-section>
      <q-btn class="thick-border bg-blue-grey-14" color="primary" @click="copyItemResult()" icon="content_copy" />
    </q-card-section>
  </q-card>
</template>
<script setup>
import { computed } from 'vue';
import { useItemsRaindleStore } from 'src/stores/itemsRaindle';
const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
  correctObject: {
    type: Object,
    required: true,
  },
});
const itemsRaindleStore = useItemsRaindleStore();
const formattedShareableEmojiDisplay = computed(() => {
  return itemsRaindleStore.shareableEmoji.replace(/\n/g, '<br>');
});
const copyItemResult = () => {
  try {
    const todaysDateFormatted = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const itemsRaindleShareText = `Raindle Daily Item for ${todaysDateFormatted} \n` + itemsRaindleStore.shareableEmoji + `Play Raindle: https://raindle.net/items`;
    navigator.clipboard.writeText(itemsRaindleShareText);
    alert('Copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy text: ', error);
  }
};
const useTextColor = () => {
  switch (props.topic) {
    case "item":
      switch (props.correctObject.rarity) {
        case "Common":
          return "text-white";
        case "Uncommon":
          return "text-lime-14";
        case "Legendary":
          return "text-red-10";
        case "Boss":
          return "text-yellow-14";
        case "Equipment":
          return "text-orange-13";
        case "Lunar":
          return "text-blue-7";
        case "Void":
          return "text-purple-14";
        default:
          return "text-white";
      }
    case "character":
      return "text-amber-14";
    case "stage":
      return "text-purple-14";
    default:
      return "text-white";
  }
};
</script>
<style scoped>
.item-img {
  width: 100%;
  max-width: 100px;
  margin: 0 auto;
}
.share-card {
  background-color: rgb(147, 146, 146);
  border-radius: 5px;
  display: inline-block;
}
</style>
