import "vue-class-component/hooks"; // import hooks type to enable auto-complete
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vue-swal.js"; // make vue swal available to all components
import { localize } from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import { setInteractionMode } from "vee-validate";
import { GlobalMutationTypes } from "./store/mutation-types";
import { LocalStorageKeys } from "./store/localstorage-keys";

localize({ en });
setInteractionMode("custom", () => ({
  on: ["input"],
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const loginType = localStorage.getItem(LocalStorageKeys.loginType);
    if (loginType) {
      const loginData = localStorage.getItem(LocalStorageKeys.loginData);
      const loginToken = localStorage.getItem(LocalStorageKeys.loginToken);
      if (loginData && loginToken) {
        this.$store.commit(
          GlobalMutationTypes.SET_LOGIN_DATA,
          JSON.parse(loginData)
        );
        this.$store.commit(GlobalMutationTypes.SET_LOGIN_TOKEN, loginToken);
      }
    }
  },
  render: (h) => h(App),
}).$mount("#app");
