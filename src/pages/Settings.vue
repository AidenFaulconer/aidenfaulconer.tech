<template>
  <div></div>
</template>

<script lang="ts">
// import EssentialLink from 'components/EssentialLink.vue';

const data = [];

import { defineComponent, ref } from '@vue/composition-api';
import { route } from 'quasar/wrappers';

export default defineComponent({
  name: 'Settings',
  //   components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);

    return { leftDrawerOpen };
  },
});
</script>