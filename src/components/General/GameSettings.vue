<template>
  <q-btn class="thick-border bg-blue-grey-14 q-mx-sm" color="primary" @click="showGameSettings = true" icon="settings" size="md" />
  <q-dialog v-model="showGameSettings">
    <q-card square class="thick-border bg-blue-grey-14">
      <q-card-section>
        <div class="text-h3 text-center">Game Settings</div>
      </q-card-section>
      <q-card-section>
        <q-toggle
        v-model="gameSettingsStore.hardMode"
        label="Hard Mode"
        color="accent"
      />
      <div class="text-caption">Hard mode will disable hints and require at least 3 characters to be typed before showing item suggestions</div>
      <q-toggle
      v-model="gameSettingsStore.colorBlindMode"
      label="Color Blind Mode"
      color="accent"
    />
      </q-card-section>
      </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import { useGameSettingsStore } from 'src/stores/gameSettings';
export default {
  setup () {
    const gameSettingsStore = useGameSettingsStore();
    return {
      showGameSettings: ref(false),
      gameSettingsStore,
    }
  },
  methods: {
    async copyLink() {
      try {
        await navigator.clipboard.writeText('https://raindle.net');
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    },
  },
}
</script>
