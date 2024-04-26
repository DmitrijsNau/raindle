<template>
  <q-card square bordered class="text-center bg-blue-grey-14 thick-border">
    <q-card-section class="text-h2 text-red">
      Game Over!
    </q-card-section>
    <q-card-section class="text-h5">
      The correct {{ topic }} is <span :class="useTextColor()">{{ correctObject.itemName }}</span>.
    </q-card-section>
    <q-card-section>
      <q-img :src="correctObject.itemImage" class="item-img"/>
    </q-card-section>
    <q-card-section class="text-subtitle1">
      Feel free to try another game mode, or see how far you can get in endless mode!
    </q-card-section>
  </q-card>
</template>
<script setup>
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
</style>
