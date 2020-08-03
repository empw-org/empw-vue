import api from "@/services/api";
import { MutationTypes } from "./mutation-types";
import handleValidationErrors from "@/store/handle-validation-errors";

export const namespaced = true;

export const state = {
  company: null,
  token: null,
};

export const mutations = {
  [MutationTypes.SET_COMPANY_DATA](state: any, payload: any): void {
    state.company = payload.company;
    state.token = payload.token;
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
};

export const getters = {};
