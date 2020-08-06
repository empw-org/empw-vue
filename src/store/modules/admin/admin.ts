import api from "@/services/api";
import { AdminMutationTypes } from "./mutation-types";
import Axios from "axios";

export const namespaced = true;

export const state = {
  admin: null,
  token: null,
};

export const mutations = {
  [AdminMutationTypes.SET_ADMIN_TOKEN](state: any, token: string): void {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("userType", "ADMIN");
    state.token = token;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  [AdminMutationTypes.SET_ADMIN_DATA](state: any, payload: any): void {
    localStorage.setItem("adminData", JSON.stringify(payload));
    state.admin = payload;
  },
  [AdminMutationTypes.CLEAR_ADMIN_DATA](): void {
    localStorage.removeItem("adminData");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userType");
    location.reload(); // cleares any data saved in the state
  },
};

export const actions = {
  login({ commit }: any, credentials: any): any {
    return api.admins.login(credentials).then((r) => {
      commit(AdminMutationTypes.SET_ADMIN_DATA, r.data.admin);
      commit(AdminMutationTypes.SET_ADMIN_TOKEN, r.data.token);
    });
  },
  logout({ commit }: any): void {
    commit(AdminMutationTypes.CLEAR_ADMIN_DATA);
  },
};

export const getters = {};
