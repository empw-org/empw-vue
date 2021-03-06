import api from "@/services/api";
import handleValidationErrors from "@/store/handle-validation-errors";
import { GlobalMutationTypes } from "../mutation-types";
import { LoginTypes } from "@/policies/login-types";

export const namespaced = true;

export const actions = {
  signup(_: any, credentials: any): any {
    return api.users.signup(credentials).catch((err) => {
      throw handleValidationErrors(err.response.data);
    });
  },
  login({ commit }: any, credentials: any): any {
    return api.users.login(credentials).then((r) => {
      commit(GlobalMutationTypes.SET_LOGIN_DATA, r.data.user, { root: true });
      commit(GlobalMutationTypes.SET_LOGIN_TOKEN, r.data.token, { root: true });
      commit(GlobalMutationTypes.SET_USER_TYPE, LoginTypes.USER, {
        root: true,
      });
    });
  },
};
