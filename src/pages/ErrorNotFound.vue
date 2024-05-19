<template>
  <div
    class="bg-image text-center q-pa-md flex flex-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div>
      <div class="text-h4">
        It seems like you've stumbled into the Bazaar Between Time...
      </div>
      <q-btn
        flat
        bordered
        to="/"
        label="Go Home"
        no-caps
        class="thick-border bg-blue-grey-14 q-mx-md q-my-md"
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "ErrorNotFound",
});
const useBackground = () => {
  const ratio = window.innerWidth / window.innerHeight;
  if (ratio > 1.5) {
    return "/images/bazar.jpg";
  } else {
    return "/images/bazar-vertical.jpeg";
  }
};
const backgroundImage = useBackground();
</script>
<style scoped>
.bg-image {
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  overflow: scroll;
}
.thick-border {
  border-width: 2px !important;
  border-color: #818181 !important;
  border: 3px solid #818181 !important;
}
</style>
