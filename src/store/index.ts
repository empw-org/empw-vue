import Vue from "vue";
import Vuex from "vuex";
import * as company from "@/store/modules/company/company-user";

import * as user from "@/store/modules/user/user";
import * as admin from "@/store/modules/admin/admin";
import { GlobalMutationTypes } from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    isLoading: false,
  },
  mutations: {
    [GlobalMutationTypes.SET_LOADING](state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {},
  getters: {},
  modules: {
    company,
    user,
    admin,
  },
});
