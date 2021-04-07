<template>
  <q-layout view="lHh Lpr lFf">
    <q-btn
      flat
      dense
      class="logo-persist"
      v-html="logoSvg"
      @click="leftDrawerOpen = !leftDrawerOpen"
    />
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title />

        <div>Railgun v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <div v-html="waveSvg" class="graphic" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.q-layout {
  background: #131313;
  background-color: #131313;
  z-index: 1000;
}

.logo-persist {
  position: initial;
  margin: 25px 40px;
}

::v-deep .q-header {
  z-index: -1;
}

::v-deep .q-drawer {
  padding: 50px;
  padding-top: 75px;
  background: none;
  box-shadow: none;
  z-index: -1;

  & .q-drawer__content {
    color: white;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(
        262.43deg,
        rgba(108, 108, 108, 0.3) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      #000000;
    border: 1px solid rgba(255, 255, 255, 0.3);

    .graphic {
      position: relative;
      top: 65%;
      bottom: 0px;
      z-index: 100;
    }
  }
}

.q-header {
  background: none;
}

.q-page-container {
  min-height: 100vh;
}

.backdrop {
  position: absolute;
  top: 0px;
  display: block;
  margin: auto;
  width: 100% !important;
  height: 100% !important;
  background: 131313;
}
</style>


<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import { logo, wavesGraphic } from '../assets/svgs';

const linksData = [
  {
    title: 'Dashboard',
    // caption: '',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Send & Receive',
    // caption: '',
    icon: 'send',
    link: '/send-receive',
  },
  {
    title: 'Settings',
    // caption: '',
    icon: 'settings',
    link: '/settings',
  },
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'AppLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);
    const waveSvg = ref(wavesGraphic);
    const logoSvg = ref(logo);

    return { leftDrawerOpen, essentialLinks, waveSvg, logoSvg };
  },
});
</script>
