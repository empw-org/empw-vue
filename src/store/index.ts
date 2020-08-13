import Vue from "vue";
import Vuex from "vuex";
import * as company from "@/store/modules/company";
import * as user from "@/store/modules/user";
import * as admin from "@/store/modules/admin";
import { GlobalMutationTypes } from "@/store/mutation-types";
import Axios from "axios";
import { LocalStorageKeys } from "./localstorage-keys";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    loginData: null,
    loginToken: "",
    isLoading: false,
  },
  mutations: {
    [GlobalMutationTypes.SET_LOADING](state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    [GlobalMutationTypes.SET_LOGIN_DATA](state, payload) {
      state.loginData = payload;
      localStorage.setItem(LocalStorageKeys.loginData, JSON.stringify(payload));
    },
    [GlobalMutationTypes.SET_LOGIN_TOKEN](state, token: string) {
      state.loginToken = token;
      localStorage.setItem(LocalStorageKeys.loginToken, token);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    [GlobalMutationTypes.SET_USER_TYPE](_, loginType: string) {
      localStorage.setItem(LocalStorageKeys.loginType, loginType);
    },
    [GlobalMutationTypes.LOGOUT]() {
      localStorage.clear();
      location.assign("/");
      // go to home, also has the side effect of clearing everything in the state
    },
  },
  actions: {
    logout({ commit }) {
      commit(GlobalMutationTypes.LOGOUT);
    },
  },
  modules: {
    company,
    user,
    admin,
  },
});
