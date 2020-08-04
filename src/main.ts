import "vue-class-component/hooks"; // import hooks type to enable auto-complete
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vue-swal.js";
import { MutationTypes } from "./store/modules/company/mutation-types";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const loggedIn = localStorage.getItem("loggedIn");
    let companyData = null;
    if (loggedIn) {
      switch (loggedIn) {
        case "COMPANY":
          companyData = localStorage.getItem("companyData");
          if (companyData)
            this.$store.commit(
              `company/${MutationTypes.SET_COMPANY_DATA}`,
              JSON.parse(companyData)
            );
          break;
      }
    }
  },
  render: (h) => h(App),
}).$mount("#app");
