<template>
  <q-btn flat bordered square label="RoadMap" @click="showRoadMap = true" class="thick-border bg-blue-grey-14 q-mx-md" />
  <q-dialog v-model="showRoadMap">
    <q-card flat bordered square class="thick-border bg-blue-grey-14 text-h3">
      <q-card-section class="text-center text-h2">
        RoadMap!
      </q-card-section>
      <q-card-section>
        1. Bug Fixes
      </q-card-section>
      <q-card-section>
        2. Stages Game Mode
      </q-card-section>
      <q-card-section>
        3. Endless Mode
      </q-card-section>
      <q-card-section>
        4. Health Bar Rework
      </q-card-section>
      <q-card-section>
        5. Characters Game Mode
      </q-card-section>
      <q-card-section>
        6. Item Collection
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
const showRoadMap = ref(false);
</script>
