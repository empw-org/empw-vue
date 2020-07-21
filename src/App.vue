<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  components: { NavigationBar },
};
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
