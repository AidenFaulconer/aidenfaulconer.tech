<template>
  <div
    class="cards q-px-xl q-ma-auto column items-start q-gutter-y-lg flex flex-center"
  >
    <q-img :src="require('../../assets/backdrop.png')" class="backdrop" />

    <q-img
      :src="require('../../assets/graphic-cube-white.png')"
      class="backdrop-cube"
      style="max-width: 5%; top: 5%; left: 25%; rotate: 50deg"
    />
    <q-img
      :src="require('../../assets/graphic-cube-white.png')"
      class="backdrop-cube"
      style="max-width: 5%; right: 60px; top: 50%"
    />
    <q-img
      :src="require('../../assets/graphic-cube-white.png')"
      class="backdrop-cube"
      style="max-width: 10%; bottom: 60px; left: 50px"
    />

    <q-card class="my-card" flat>
      <q-icon name="shield" class="q-ma-sm absolute" />
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-btn color="secondary" @click.stop="generatePassphrase"
            >GENERATE PASSPHRASE</q-btn
          >
          <!-- <q-input standout="bg-teal text-white" v-model="text" label="Custom standout" /> -->
        </q-card-section>

        <q-card-section>
          <div class="arrow flex" v-html="arrowSvg" />
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card" flat>
      <q-icon name="lock" class="q-ma-sm absolute" />
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-btn color="secondary" @click.stop="importPassphrase"
            >IMPORT PASSPHRASE</q-btn
          >
          <!-- <q-file outlined v-model="model">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          </q-file> -->
        </q-card-section>

        <q-card-section>
          <div class="arrow flex" v-html="arrowSvg" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>


<style lang="scss" scoped>
.arrow {
  min-width: 400px;
  max-width: 400px;
  min-height: 125px;
}

.cards {
  height: 90vh;
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

.q-card {
  min-width: 40%;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(
      262.43deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      99.57deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #000000;

  border: 1px solid rgba(255, 255, 255, 0.6);

  color: white;
}

.backdrop {
  position: absolute;
  top: 0px;
  display: initial;
  margin: auto;
  width: 100% !important;
  height: 100% !important;
}

.backdrop-cube {
  position: absolute;
  overflow: hidden;
  opacity: 0.6;
  animation: rotation 100s infinite linear;
  &:hover {
    opacity: 1;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>


<script lang="ts">
// import EssentialLink from 'components/EssentialLink.vue';

const data = [];

import { defineComponent, ref } from '@vue/composition-api';
import { route } from 'quasar/wrappers';
import { arrow } from 'src/assets/svgs';
import store from 'src/store';

export default defineComponent({
  name: 'Login',
  //   components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const arrowSvg = ref(arrow);

    const generatePassphrase = () => {
      store.dispatch('RailgunWallet/generatePassphrase', '');
      alert('generate passphrase');
    };

    const importPassphrase = (passphrase) => {
      alert('import passphrase');
      store.dispatch('RailgunWallet/importPassphrase', passphrase);
    };

    return { leftDrawerOpen, arrowSvg, importPassphrase, generatePassphrase };
  },
});
</script>