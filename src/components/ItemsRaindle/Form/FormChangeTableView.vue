<template>
  <q-btn
  size="xs"
  :icon="buttonIcon" @click="minimizeCard"
  class="thick-border bg-blue-grey-14 text-center q-mx-sm"
/>
</template>
<script>
export default {
  name: 'ChangeTableView',
  data() {
    return {
      isMinimized: false,
    };
  },
  emits: ['minimize'],
  computed: {
    buttonIcon() {
      return this.isMinimized ? 'open_in_full' : 'close_fullscreen';
    },
  },
  methods: {
    minimizeCard() {
      this.isMinimized = !this.isMinimized;
      this.$emit('minimize', this.isMinimized);
    },
  },
};
</script>
