<template>
  <q-select ref="selectRef" dark square standout v-model="itemInput" use-input input-debounce="0" :options="rorItems"
  input-class="text-white" @filter="filterFn" @update:model-value="makeGuess()" label="Enter Item" bordered
  label-color="yellow" bg-color="blue-grey-14" class="thick-border scrollable item-select" transition-show="scale"
  transition-hide="scale"
  @popup-show="focusInput">
  <template v-slot:option="scope">
    <q-item v-bind="scope.itemProps" color="secondary">
      <q-item-section avatar>
        <q-img :src="scope.opt.itemImage" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ scope.opt.itemName }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  <template v-slot:no-option>
    <q-item>
      <q-item-section class="text-grey">
        No results
      </q-item-section>
    </q-item>
  </template>
</q-select>
</template>
<script setup>
import { ref, onMounted,nextTick } from 'vue';
import { set, ref as firebaseRef, get, onValue } from 'firebase/database'
import { useStorage } from '@vueuse/core'

import { db } from 'boot/firebase';
const rorItems = ref(null)
const rorItemsBase = ref(null)
const glorphyndle = ref("JTJ")
const itemInput = ref(null)
const selectRef = ref(null)
const itemsGuessesLocalStorage = useStorage('Raindle_itemGuesses',
  [],
  localStorage,
  { mergeDefaults: true }
)
const focusInput = async () => {
  await nextTick();
  selectRef.value.focus();
};
onMounted(async () => {
  const itemsSelectRef = firebaseRef(db, 'items-select')
  const snapshot = await get(itemsSelectRef)
  rorItemsBase.value = Object.values(snapshot.val())
})

const filterFn = (val, update, abort) => {
  if (val.length < 2) {
    rorItems.value = []
    abort()
    return
  }
  update(() => {
    const needle = val.toLocaleLowerCase();
    rorItems.value = rorItemsBase.value
      .filter(v => v.itemName.toLowerCase().indexOf(needle) > -1)
      .filter(v => !itemsGuessesLocalStorage.value.includes(v.itemName))
      .slice(0, 20);
  });
}

const makeGuess = () => {
  itemsGuessesLocalStorage.value.push(itemInput.value.itemName)
  itemInput.value = null
}

</script>
<style scoped>
.item-select {
  min-width: 42vw;
}
.q-menu.scrollable .q-virtual-scroll__content {
  max-height: 100px !important;
  overflow-y: auto;
}

.q-field__native>span {
  color: white !important;
}
</style>
