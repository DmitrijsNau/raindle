<template>
  <q-btn class="thick-border bg-blue-grey-14 q-mx-sm" color="primary" @click="showColumnDescription = true" icon="list_alt" size="xs" />
  <q-dialog v-model="showColumnDescription">
    <q-card square class="thick-border bg-blue-grey-14">
      <q-card-section>
        <div class="text-h3 text-center">Column Descriptions</div>
        <div class="text-subtitle-1 text-center">This is a list of all the columns in the table and the possible values. They are laid out in a linear format.
          If a square is yellow, this means the guess is one away from the correct answer, based on this linear format.
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-body-2 q-mx-xs">
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Item</strong></div>
            <div>The image of the item you guessed</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Rarity</strong></div>
            <div>Untiered, Common, Uncommon, Legendary, Boss, Equipment, Lunar, Void</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Color</strong></div>
            <div>The color of the item, (Primary-Secondary). The square will be yellow if the colors are in the wrong order or if only one of the colors is correct.</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Item Type</strong></div>
            <div>Damage, Utility, and/or Healing. Could be all 3. If none of those, then equipment or other (scrap)</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Stack Type</strong></div>
            <div>None, Linear, Linear Hyperbolic, Hyperbolic, Exponential, Special</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Cooldown</strong></div>
            <div>None, .1-10 seconds, 11-44 seconds, 45 seconds, 60-99 seconds, 100+ seconds</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Release Period</strong></div>
            <div>Base Game, Scorched Acres, Skills 2.0, Hidden Realms, Artifacts, 1.0 Release, Anniversary, or Survivors of the Void</div>
          </div>
          <div class="row-card thick-border bg-primary text-center justify-center q-my-xs">
            <div><strong>Achievement</strong></div>
            <div>Whether or not the item is locked behind an achievement</div>
          </div>
        </div>
      </q-card-section>
      </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      showColumnDescription: ref(false),
    }
  },
}
</script>
