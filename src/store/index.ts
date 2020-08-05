import Vue from "vue";
import Vuex from "vuex";
import * as company from "@/store/modules/company/company-user";

import { GlobalMutationTypes } from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
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
  },
});
