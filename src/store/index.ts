import Vue from "vue";
import Vuex from "vuex";
import waterRequest from "@/store/modules/company/water-requests";
import * as company from "@/store/modules/company/company-user";
import { MutationTypes } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    [MutationTypes.SET_LOADING](state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {},
  getters: {},
  modules: {
    waterRequest,
    company,
  },
});
