import "vue-class-component/hooks"; // import hooks type to enable auto-complete
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vue-swal.js"; // make vue swal available to all components
import { CompanyMutationTypes } from "@/store/modules/company/mutation-types";
import { UserMutationTypes } from "@/store/modules/user/mutation-types";
import { AdminMutationTypes } from "@/store/modules/admin/mutation-types";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    // TODO: refactor!!!
    const userType = localStorage.getItem("userType");
    if (userType === "COMPANY") {
      const companyData = localStorage.getItem("companyData");
      const companyToken = localStorage.getItem("companyToken");
      if (companyData && companyToken) {
        this.$store.commit(
          `company/${CompanyMutationTypes.SET_COMPANY_DATA}`,
          JSON.parse(companyData)
        );
        this.$store.commit(
          `company/${CompanyMutationTypes.SET_COMPANY_TOKEN}`,
          companyToken
        );
      }
    } else if (userType === "USER") {
      const userData = localStorage.getItem("userData");
      const userToken = localStorage.getItem("userToken");
      if (userData && userToken) {
        this.$store.commit(
          `user/${UserMutationTypes.SET_USER_DATA}`,
          JSON.parse(userData)
        );
        this.$store.commit(
          `user/${UserMutationTypes.SET_USER_TOKEN}`,
          userToken
        );
      }
    } else if (userType === "ADMIN") {
      const adminData = localStorage.getItem("adminData");
      const adminToken = localStorage.getItem("adminToken");
      if (adminData && adminToken) {
        this.$store.commit(
          `admin/${AdminMutationTypes.SET_ADMIN_DATA}`,
          JSON.parse(adminData)
        );
        this.$store.commit(
          `admin/${AdminMutationTypes.SET_ADMIN_TOKEN}`,
          adminToken
        );
      }
    }
  },
  render: (h) => h(App),
}).$mount("#app");
