<template>
  <q-page class="column items-center justify-evenly q-px-xl q-pb-sm">
    <q-card class="my-card" flat>
      <q-icon name="shield" class="q-ma-sm absolute" />
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center"> </q-card-section>

        <q-card-section>
          <div class="arrow flex" v-html="arrowSvg" />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat>
      <q-icon name="shield" class="q-ma-sm absolute" />
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center"> </q-card-section>

        <q-card-section>
          <div class="arrow flex" v-html="arrowSvg" />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat>
      <q-icon name="shield" class="q-ma-sm absolute" />
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center"> </q-card-section>

        <q-card-section>
          <div class="arrow flex" v-html="arrowSvg" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
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
  min-width: 100%;
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
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta };
  },
});
</script>
