<template>
  <q-btn class="thick-border bg-blue-grey-14 q-mx-sm" color="primary" @click="showColorLookup = true" icon="palette" size="xs" />
  <q-dialog v-model="showColorLookup">
    <q-card square class="thick-border bg-blue-grey-14 color-lookup">
      <q-card-section>
        <div class="text-h3 text-center">Color Lookup</div>
        <div class="text-subtitle-1 text-center">This is a list of all items and their defined colors. You have to type 4 characters of the item to search. (I have lost 2 hours trying to fix this I have no clue why)
        </div>
      </q-card-section>
      <div>
        <q-table
        grid
        flat bordered
        :card-container-class="cardContainerClass"
        title="Item Colors"
        :rows="itemColors"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        v-model:pagination="pagination"
        :rows-per-page-options="[9]"
      >
        <template v-slot:top-right>
          <q-input borderless dense v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-4 col-sm-6 col-md-4">
            <q-card flat square bordered class="thick-border bg-primary item-color-card">
              <q-card-section class="text-center text-h6 item-name">
                {{ props.row.itemName }}
              </q-card-section>
              <q-card-section class="flex flex-center">
                <q-img :src="props.row.itemImage" class="item-image"/>
              </q-card-section>
              <q-card-section class="flex flex-center text-body1">
                <div>{{ props.row.color }} </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
      </div>
      </q-card>
  </q-dialog>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'
export default {
  props: {
    itemColors: {
      type: Object,
      required: true,
    },
  },
  setup () {
    const q = useQuasar()
    function getItemsPerPage () {
      return 9
    }
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })
    const columns = [
      {
        name: 'name',
        label: 'Item Name',
        field: 'itemName'
      },
      {
        name: 'item image',
        label: 'Item Image',
        field: 'itemImage'
      },
      {
        name: 'item color',
        label: 'Item Color',
        field: 'itemColor'
      }
    ]
    watch(() => q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })
    return {
      showColorLookup: ref(false),
      columns,
      pagination,
      q
    }
  },
  data () {
    return {
      filter: '',
    }
  },
  computed: {
    rowsPerPageOptions () {
      return this.q.screen.gt.xs
          ? this.q.screen.gt.sm ? [ 3, 6, 9 ] : [ 3, 6 ]
          : [3]
    },
    cardContainerClass () {
      return this.q.screen.gt.xs
          ? 'grid-masonry grid-masonry--' + (this.q.screen.gt.sm ? '3' : '2')
          : null
      },
    },
  }
</script>
<style scoped>
color-lookup {
  width: 60vw;
}
.item-image {
  height: 8vh;
  width: 8vh;
}
.item-name {
  height: 50px; /* adjust as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
