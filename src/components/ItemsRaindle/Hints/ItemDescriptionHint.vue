<template>
  <q-btn flat bordered square label="Item Description Hint" @click="showDescriptionHint = true" class="thick-border bg-blue-grey-14 q-mx-md" />
  <q-dialog v-model="showDescriptionHint">
    <q-card flat bordered square class="thick-border bg-blue-grey-14 text-h3">
      <q-card-section>
        {{ todaysItemAnswer.descriptionHint }}
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
</script>
