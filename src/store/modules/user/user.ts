import api from "@/services/api";
import { UserMutationTypes } from "./mutation-types";
import handleValidationErrors from "@/store/handle-validation-errors";
import Axios from "axios";

export const namespaced = true;

export const state = {
  user: null,
  token: null,
};

export const mutations = {
  [UserMutationTypes.SET_USER_TOKEN](state: any, token: string): void {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userType", "USER");
    state.token = token;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  [UserMutationTypes.SET_USER_DATA](state: any, payload: any): void {
    localStorage.setItem("userData", JSON.stringify(payload));
    state.user = payload;
  },
  [UserMutationTypes.CLEAR_USER_DATA](): void {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    location.reload(); // cleares any data saved in the state
  },
};

export const actions = {
  signup(_: any, credentials: any): any {
    return api.users.signup(credentials).catch((err) => {
      throw handleValidationErrors(err.response.data);
    });
  },
  login({ commit }: any, credentials: any): any {
    return api.users.login(credentials).then((r) => {
      commit(UserMutationTypes.SET_USER_DATA, r.data.user);
      commit(UserMutationTypes.SET_USER_TOKEN, r.data.token);
    });
  },
  logout({ commit }: any): void {
    commit(UserMutationTypes.CLEAR_USER_DATA);
  },
};

export const getters = {};
