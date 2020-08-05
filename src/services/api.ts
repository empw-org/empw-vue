import store from "@/store";
import { MutationTypes as GlobalMutationTypes } from "@/store/mutation-types";
import axios from "axios";
import { ActionTypes } from "@/store/modules/company/action-types";

const BASE_URL = "https://api-empw.herokuapp.com";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(function (config) {
  store.commit(GlobalMutationTypes.SET_LOADING, true);
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    store.commit(GlobalMutationTypes.SET_LOADING, false);
    return response;
  },
  function (error) {
    store.commit(GlobalMutationTypes.SET_LOADING, false);
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn && error.response?.status === 401) {
      store.dispatch(`${loggedIn.toLowerCase()}/${ActionTypes.logout}`);
    }
    return Promise.reject(error);
  }
);

export default {
  users: {
    login(body: any) {
      return axios.post("/users/login", body);
    },
    signup(body: any) {
      return axios.post("/users/signup", body);
    },
    verify(body: any) {
      return axios.patch("/users/verify", body);
    },
    changePassword(body: any) {
      return axios.patch("/users/password", body);
    },
    resetPassword(body: any) {
      return axios.post("/users/reset-password", body);
    },
    getProfile() {
      return axios.get("/user");
    },
    editProfile(body: any) {
      return axios.patch("/user", body);
    },
    getMyWaterOrders() {
      return axios.get("/water_orders");
    },
    createNewWaterOrder(body: any) {
      return axios.post("/water_orders", body);
    },
  },
  companies: {
    login(body: any) {
      return axios.post("/companies/login", body);
    },
    signup(body: any) {
      return axios.post("/companies/signup", body);
    },
    waterOrdersStatistics() {
      return axios.get("/company/statistics");
    },
    getAssignedOrders() {
      return axios.get("/water_orders");
    },
    markOrderAsReadyForShipping(order_id: string) {
      return axios.patch(`/water_orders/${order_id}/ready_for_shipping`);
    },
  },
  contactUs(body: any) {
    return axios.post("/contact_us", body);
  },
};
