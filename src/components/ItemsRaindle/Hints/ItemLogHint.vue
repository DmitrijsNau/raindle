<template>
  <q-btn flat bordered square label="Item Log Hint" @click="showLogHint = true" class="thick-border bg-blue-grey-14 q-mx-md" />
  <q-dialog v-model="showLogHint">
    <q-card flat bordered square class="thick-border bg-blue-grey-14 text-h3">
      <q-card-section>
        {{ todaysItemAnswer.logHint }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
const showLogHint = ref(false);
defineProps({
  todaysItemAnswer: {
    type: Object,
    required: true,
  },
});
</script>
