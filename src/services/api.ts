import store from "@/store";
import { MutationTypes as GlobalMutationTypes } from "@/store/mutation-types";
import axios from "axios";

const BASE_URL = "https://api-empw.herokuapp.com";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(function (config) {
  store.commit(GlobalMutationTypes.SET_LOADING, true);
  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    store.commit(GlobalMutationTypes.SET_LOADING, false);
    return response;
  },
  function (error) {
    store.commit(GlobalMutationTypes.SET_LOADING, false);
    return Promise.reject(error);
  }
);

export default {
  users: {
    async login(body: any) {
      return await api.post("/users/login", body);
    },
    async signup(body: any) {
      return await api.post("/users/signup", body);
    },
    async verify(body: any) {
      return await api.patch("/users/verify", body);
    },
    async changePassword(body: any) {
      return await api.patch("/users/password", body);
    },
    async resetPassword(body: any) {
      return await api.post("/users/reset-password", body);
    },
  },
  companies: {
    async login(body: any) {
      return await api.post("/companies/login", body);
    },
    async signup(body: any) {
      return await api.post("/companies/signup", body);
    },
    async getAssignedOrders() {
      return await api.get("/water_orders");
    },
  },
  async contactUs(body: any) {
    return await api.post("/contact_us", body);
  },
};
