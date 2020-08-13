import api from "@/services/api";
import { GlobalMutationTypes } from "../mutation-types";
import { LoginTypes } from "@/policies/login-types";

export const namespaced = true;

export const actions = {
  login({ commit }: any, credentials: any): any {
    return api.admins.login(credentials).then((r) => {
      commit(GlobalMutationTypes.SET_LOGIN_DATA, r.data.admin, { root: true });
      commit(GlobalMutationTypes.SET_LOGIN_TOKEN, r.data.token, { root: true });
      commit(GlobalMutationTypes.SET_USER_TYPE, LoginTypes.ADMIN, {
        root: true,
      });
    });
  },
};
