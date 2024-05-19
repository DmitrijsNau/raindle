<template>
  <div>
    <q-btn icon="checklist" @click="dialog = true" class="thick-border q-mx-sm" color="primary" size="md" />
    <q-dialog v-model="dialog">
      <q-card square class="thick-border bg-primary changelog-card">
        <q-card-section class="row justify-between items-center">
          <div class="text-h1 text-center">Changelog</div>
        </q-card-section>
        <q-card-section>
          <div v-html="changelog" class="bg-primary text-h5"></div>
        </q-card-section>
        <q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getDownloadURL, ref as firebaseRef, getStorage } from 'firebase/storage';
import DOMPurify from "dompurify";
import { marked } from 'marked';

export default {
  setup() {
    const dialog = ref(false);
    const changelog = ref('');

    onMounted(async () => {
      const storage = getStorage();
      const pathReference = firebaseRef(storage, 'change.md');

      const url = await getDownloadURL(pathReference);
      const response = await fetch(url);
      const markdown = await response.text();

      const sanitzed = DOMPurify.sanitize(markdown);
      changelog.value = marked(sanitzed);
    });

    return {
      dialog,
      changelog,
    };
  },
};
</script>
<style scoped>
.changelog-card {
  min-width: 50vw;
}
</style>
