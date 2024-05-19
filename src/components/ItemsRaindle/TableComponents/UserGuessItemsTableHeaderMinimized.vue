<template>
  <div class="row scrollable-row header-font">
    <div class="col q-mx-xs col-width flex flex-center" v-for="header in headers" :key="header.header">
      <q-card square bordered class="text-center bg-blue-grey-14 header-card">
        <q-tooltip class="text-h6">
          {{ header.tooltip }}
        </q-tooltip>
        <span class="text-body-2">
          {{ header.header }}
      </span>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserGuessItemsTableHeader',
  props: {
    headers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.header-card {
    outline: 1px solid rgba(255, 255, 0,.7);
    outline-offset: -.5px;
    position: relative;
    width: 10vw;
    height: 3vh;
    background: none;
    border: none;
    cursor: pointer;
    box-sizing: content-box;
    border: 2px solid transparent;
}

.col-width{
  width: 10vw !important;
  max-width: 10vw !important;
  min-width: 10vw !important;
}

.header-card::before, .header-card::after, span::before, span::after {
    display: block;
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
}

.header-card::before {
    top: -4px;
    left: -4px;
    border-top: 1px solid rgb(255, 255, 0);
    border-left: 1px solid rgb(255, 255, 0);
    transition: 0.5s all;
}
.header-card::after {
    top: -4px;
    right: -4px;
    border-top: 1px solid rgb(255, 255, 0);
    border-right: 1px solid rgb(255, 255, 0);
    transition: 0.5s all;
}
span::before {
    bottom: -4px;
    left: -4px;
    border-bottom: 1px solid rgb(255, 255, 0);
    border-left: 1px solid rgb(255, 255, 0);
    transition: 0.5s all;
}
span::after {
    bottom: -4px;
    right: -4px;
    border-bottom: 1px solid rgb(255, 255, 0);
    border-right: 1px solid rgb(255, 255, 0);
    transition: 0.5s all;
}

.header-card:hover {
  background-color: rgba(74, 74, 40, 0.7) !important;
}
.header-font {
  font-size: .8rem;
}
</style>
