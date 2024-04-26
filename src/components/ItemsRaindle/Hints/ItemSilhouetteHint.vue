<template>
  <q-btn flat bordered square label="Item Silhouette Hint" @click="showDescriptionHint = true" class="thick-border bg-blue-grey-14 q-mx-md"/>
  <q-dialog class="q-mx-md" v-model="showDescriptionHint">
    <q-card>
      <q-card-section>
        {{ removePartialDescription(todaysItemAnswer.descriptionHint) }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
const showDescriptionHint = ref(false);
defineProps({
  todaysItemAnswer: {
    type: Object,
    required: true,
  },
});
const removePartialDescription = (description) => {

};
</script>
