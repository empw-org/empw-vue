<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Josefin sans", sans-serif;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
