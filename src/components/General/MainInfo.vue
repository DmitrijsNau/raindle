<template>
  <q-btn
    class="thick-border bg-blue-grey-14 q-mx-sm"
    color="primary"
    @click="showMainInfo = true"
    icon="info"
    size="md"
  />
  <q-dialog v-model="showMainInfo">
    <q-card class="thick-border bg-blue-grey-14">
      <q-card-section>
        <div class="text-h6 text-center">Info</div>
        <div class="text-body1">
          This project was inspired by awesome games like
          <a href="https://loldle.net/">Lolde</a> ,
          <a href="https://isaacle.net/">Isaacle</a> and others alike.
        </div>
      </q-card-section>
      <q-card-section align="left" class="text-body1">
        If you'd like to support my game, you can do so by
        <a href="https://ko-fi.com/dimanaudzuns">buying me a coffee</a> or
        <a href="#" @click.prevent="copyLink">sharing this project</a> with your
        friends.
      </q-card-section>
      <q-card-section align="left" class="text-body1">
        Massive shoutout to my friend Charlie for making the item images and
        silhouettes. Check out his stuff
        <a href="https://rozeski.net/">over here</a>.
      </q-card-section>
      <q-card-actions class="additional-info-section">
        <RoadMap />
        <MySite />
        <GitHubRepo />
      </q-card-actions>
      <q-card-section align="right">
        Thanks for playing! - Dmitri
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import RoadMap from "src/components/General/RoadMap.vue";
import MySite from "src/components/General/MySite.vue";
import GitHubRepo from "src/components/General/GitHubRepo.vue";
export default {
  components: {
    RoadMap,
    MySite,
    GitHubRepo,
  },
  setup() {
    return {
      showMainInfo: ref(false),
    };
  },
  methods: {
    async copyLink() {
      try {
        await navigator.clipboard.writeText("https://raindle.net");
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
  },
};
</script>
<style scoped>
additional-info-section {
  padding: 2px !important;
}
</style>
