import "vue-class-component/hooks"; // import hooks type to enable auto-complete
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vue-swal.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
