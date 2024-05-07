<template>
  <q-btn flat bordered square label="Item Silhouette Hint" @click="showSil = true" class="thick-border bg-blue-grey-14 q-mx-md"/>
  <q-dialog class="q-mx-md" v-model="showSil">
    <q-card class="thick-border bg-bluegrey-14 no-border-radius">
        <q-img :src="todaysItemAnswer.itemSil" class="bg-blue-grey-14" style="width: 80px; height: auto;"/>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
const showSil = ref(false);
defineProps({
  todaysItemAnswer: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.no-border-radius {
  border-radius: 0 !important;
}
</style>
