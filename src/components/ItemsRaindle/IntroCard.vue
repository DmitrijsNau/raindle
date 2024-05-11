<template>
  <q-card square bordered class="bg-blue-grey-14 thick-border">
    <q-card-section class="row items-center justify-center">
      <div class="col text-center">
        <div class="text-h4">Guess today's Risk of Rain 2 item!</div>
        <div v-if="!isMinimized">
          <div class="text-h6 text-grey">
            If you lose all your health, the game is over!
            Yellow indicates the item is close to the correct answer.
            Hover over the column names for more information.
          </div>
          <div class="text-h5">Type any item to start</div>
        </div>
      </div>
      <q-btn flat dense :icon="buttonIcon" @click="minimizeCard" class="absolute-top-left" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      isMinimized: false,
    };
  },
  computed: {
    buttonIcon() {
      return this.isMinimized ? 'add' : 'remove';
    },
  },
  methods: {
    minimizeCard() {
      this.isMinimized = !this.isMinimized;
    },
  },
};
</script>
