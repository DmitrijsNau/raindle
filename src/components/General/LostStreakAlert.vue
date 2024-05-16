<template>
  <q-card square class="lost-streak-card text-center">
    <q-card-section>
      <q-item>
        <q-item-section class="text-h5">
            You lost your streak of {{ props.streak }} days :(
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<script setup>
const props = defineProps({
  streak: {
    type: Number,
    required: true
  }
})
</script>
<style scoped>
.lost-streak-card {
  background: rgba(210, 117, 10, 0.9);
  min-width: 25vw;
}
</style>
