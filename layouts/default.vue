<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      overlay-opacity="50"
      floating
      mobile-breakpoint="md"
      class="pa-0"
    >
      <v-parallax
        style="
          position: relative;
          left: 0px;
          max-height: 100vh;
          max-width: 100%;
          height: 100%;
          width: 100%;b 
        "
      >
        <nuxt-link class="branding mt-2 mb-10" router to="/dashboard">
          <!-- <v-img
            :src="require('~/static/logo.png')"
            max-width="150px"
            class="mx-auto"
          /> -->
          <!-- <v-img
            v-else
            class="mx-auto"
            min-width="50px"
            :src="require('~/static/logo-icon.png')"
          /> -->
        </nuxt-link>

        <simplebar
          style="
            display: flex;
            min-height: 90vh;
            max-height: 100vh;
            flex-direction: column;
            justify-content: space-between;
          "
          class="pa-6"
          data-simplebar-auto-hide="true"
        >
        </simplebar>
      </v-parallax>
    </v-navigation-drawer>

    <v-main>
      <simplebar
        style="
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
        data-simplebar-auto-hide="true"
      >
        <!-- prettier-ignore -->
        <v-container style="min-height: 100vh" fluid>
          <nuxt />
        </v-container>
      </simplebar>
    </v-main>
  </v-app>
</template>



<style lang="scss" scoped>
@import "~/static/variables.scss";

::v-deep .v-parallax__image-container {
  & img {
    top: -1150px;
  }
}

::v-deep .v-toolbar {
}

::v-deep .v-app {
  // background: radial-gradient(
  //     100% 197.75% at 0% 0%,
  //     rgba(255, 255, 255, 0.05) 0%,
  //     rgba(255, 255, 255, 0) 100%
  //   ),
  //   #131313;
  background: #131313;
}

::v-deep .v-sheet--outlined {
}
::v-deep .v-divider {
}
::v-deep .branding {
}
::v-deep .v-card {
  // background: rgba(255, 255, 255, 0.3);
  // filter: drop-shadow(0px 21px 35px rgba(0, 0, 0, 0.1));
  box-shadow: 0px 0px 2px -1px rgba(255, 255, 255, 0.3),
    2px 2px 52px -8px rgba(0, 0, 0, 0.4);
}

::v-deep .v-navigation-drawer {
  box-shadow: none;
  background: transparent;
  box-shadow: 0px 0px 2px -1px rgba(255, 255, 255, 0.3),
    2px 2px 52px -8px rgba(0, 0, 0, 0.4);

  & .v-card {
  }
}

::v-deep .v-navigation-drawer__content {
  display: flex;
  background: transparent;
  flex-direction: column;
  justify-content: space-between;

  & .v-list-item--active {
    font-weight: bolder;
  }
}

::v-deep .v-app-bar {
  width: 100%;
  border-left: 0px solid white;
  border-right: 0px solid white;
}

// ::v-deep .v-main {
// }
//change color of scrollbar
::v-deep .simplebar-scrollbar::before {
}
</style>

<script>
//enable scrollbar css for entire applciation (individual components will import the scrollbar )
import "simplebar/dist/simplebar.min.css";

import { logo } from "~/static/svgs";

import { mapMutations, mapGetters } from "vuex";
import { mapState } from "vuex";

//ui components
import simplebar from "simplebar-vue";

import { isEmpty } from "lodash";

export default {
  components: {
    simplebar,
  },
  computed: {},
  methods: {},
  created() {},
  data: () => ({
    navRef: "",
    loading: false,
    logoSvg: logo,
    clipped: false,
    drawer: true,
    fixed: true,
    items: [],
    miniVariant: false,
    right: true,
    rightDrawer: true,
    title: "Railgun wallet",
  }),
};
</script>