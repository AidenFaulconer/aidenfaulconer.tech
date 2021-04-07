<template>
  <div class="fullscreen text-white text-center flex flex-center">
<div class="full-width">

      <q-img
        :src="require('../assets/illustration-404.png')"
        class="centered"
        width="25%"
      />
      <div style="font-size: 10vh">404</div>
      <div class="text-h5" style="opacity: 0.4">Oops. Nothing here...</div>
    </div>
</div>
  </div>
</template>

<style lang="sass" scoped>
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Error404',
  setup() {
    return {};
  },
});
</script>
