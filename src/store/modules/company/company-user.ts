import api from "@/services/api";
import { MutationTypes } from "./mutation-types";
import handleValidationErrors from "@/store/handle-validation-errors";
import Axios from "axios";

export const namespaced = true;

export const state = {
  company: null,
  token: null,
};

export const mutations = {
  [MutationTypes.SET_COMPANY_DATA](state: any, payload: any): void {
    localStorage.setItem("companyData", JSON.stringify(payload));
    localStorage.setItem("loggedIn", "COMPANY");
    state.company = payload.company;
    state.token = payload.token;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
  },
  [MutationTypes.CLEAR_COMPANY_DATA](): void {
    localStorage.removeItem("companyData");
    localStorage.removeItem("loggedIn");
    location.reload(); // cleares any data saved in the state
  },
};

export const actions = {
  signup(_: any, credentials: any): any {
    return api.companies.signup(credentials).catch((err) => {
      throw handleValidationErrors(err.response.data);
    });
  },
  login({ commit }: any, credentials: any): any {
    return api.companies.login(credentials).then((r) => {
      commit(MutationTypes.SET_COMPANY_DATA, r.data);
    });
  },
  logout({ commit }: any): void {
    commit(MutationTypes.CLEAR_COMPANY_DATA);
  },
};

export const getters = {};
