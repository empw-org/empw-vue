<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

@Component({
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationBar from "@/components/NavigationBar.vue";

@Component({
  components: {
    NavigationBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
@import "@/assets/variables";

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
.gradient-container {
  .gradient();
  min-height: calc(100% - @header-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-card {
  background: white;
  padding: 35px;
  border-radius: 0.5rem;
}

.full-width {
  width: 100%;
}
</style>
