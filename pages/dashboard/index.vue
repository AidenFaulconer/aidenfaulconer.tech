<template></template>

<style lang="scss" scoped>
.dashboard-icon {
  position: absolute;
  right: -40px;
  height: 70px;
  top: -560px;
  display: block;

  display: block;
  ::v-deep svg {
    width: 300px;
    opacity: 0.6;
  }
}
</style>

<script>
//passing in components as props means it must be "dynamic" and inside the data or computed section
import { mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  components: {},
  methods: {},
  computed: {},
  data: () => ({
    userImg: "../static/icon.png",
    selectedPatient: 1,
    avatars: {
      practitioner,
      client,
    },
    dashboardSvg: dashboard,
    clients: [
      {
        text: "Patient 3",
        icon: "mdi-account",
        img: "./static/icon.png",
        description: "Offline: last active 2d ago",
      },
      {
        text: "Patient 3",
        icon: "mdi-account",
        img: "./static/icon.png",
        description: "Offline: last active 2d ago",
      },
      {
        text: "Patient 3",
        icon: "mdi-account",
        img: "./static/icon.png",
        description: "Offline: last active 2d ago",
      },
      {
        text: "Patient 3",
        icon: "mdi-account",
        img: "./static/icon.png",
        description: "Offline: last active 2d ago",
      },
      {
        text: "Patient 3",
        icon: "mdi-account",
        img: "./static/icon.png",
        description: "Offline: last active 2d ago",
      },
      {
        text: "Patient 3",
        icon: "mdi-account",
        img: "./static/icon.png",
        description: "Offline: last active 2d ago",
      },
    ],
    isTherapist: true,
    selectedActivityLog: [],
    selectedPlaylists: [],
  }),
};
</script>
