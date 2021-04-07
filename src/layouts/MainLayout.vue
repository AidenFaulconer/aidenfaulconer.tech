<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          aria-label="Menu"
          class="q-py-md q-px-sm"
          v-html="logoSvg"
          @click=""
        />
        <q-toolbar-title />
        <div>Railgun v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.q-layout {
  background: #131313;
  background-color: #131313;
}

.q-header {
  background: none;
}

.q-page-container {
  min-height: 100vh;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import { logo } from '../assets/svgs';

export default defineComponent({
  name: 'MainLayout',
  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const logoSvg = ref(logo);

    onMounted(() => {
      document
        .getElementById('backdrop-parallax')
        ?.firstElementChild.classList.add('parralax-img');
    });

    return { leftDrawerOpen, logoSvg };
  },
});
</script>
