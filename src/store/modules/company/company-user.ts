import api from "@/services/api";
import { CompanyMutationTypes } from "./mutation-types";
import handleValidationErrors from "@/store/handle-validation-errors";
import Axios from "axios";

export const namespaced = true;

export const state = {
  company: null,
  token: null,
};

export const mutations = {
  [CompanyMutationTypes.SET_COMPANY_TOKEN](state: any, token: string): void {
    localStorage.setItem("companyToken", token);
    localStorage.setItem("loggedIn", "COMPANY");
    state.token = token;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  [CompanyMutationTypes.SET_COMPANY_DATA](state: any, payload: any): void {
    localStorage.setItem("companyData", JSON.stringify(payload));
    state.company = payload;
  },
  [CompanyMutationTypes.CLEAR_COMPANY_DATA](): void {
    localStorage.removeItem("companyData");
    localStorage.removeItem("companyToken");
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
      commit(CompanyMutationTypes.SET_COMPANY_DATA, r.data.company);
      commit(CompanyMutationTypes.SET_COMPANY_TOKEN, r.data.token);
    });
  },
  logout({ commit }: any): void {
    commit(CompanyMutationTypes.CLEAR_COMPANY_DATA);
  },
};

export const getters = {};
