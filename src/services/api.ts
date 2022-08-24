import store from "@/store";
import { GlobalMutationTypes } from "@/store/mutation-types";
import axios from "axios";
import { AccountActionTypes } from "@/store/account-action-types";
import { LocalStorageKeys } from "@/store/localstorage-keys";

const BASE_URL = "https://api.empw.tk";
// const BASE_URL = "http://localhost:3000";

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
    const loginType = localStorage.getItem(LocalStorageKeys.loginType);
    if (loginType && error.response?.status === 401) {
      store.dispatch(AccountActionTypes.logout);
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
    getConsumptionReports() {
      return axios.get("/consumption_reports");
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
    getProfile() {
      return axios.get("/company");
    },
    editProfile(body: any) {
      return axios.patch("/company", body);
    },
  },
  admins: {
    login(body: any) {
      return axios.post("/admins/login", body);
    },
    getCompanies() {
      return axios.get("/companies/");
    },
    approveCompany(company_id: string) {
      return axios.patch(`/companies/${company_id}/approve`);
    },
    deleteCompany(company_id: string) {
      return axios.delete(`/companies/${company_id}`);
    },
    getTransporters() {
      return axios.get("/transporters/");
    },
    approveTransporter(transporter_id: string) {
      return axios.patch(`/transporters/${transporter_id}/approve`);
    },
    deleteTransporter(company_id: string) {
      return axios.delete(`/transporters/${company_id}`);
    },
    getSensors() {
      return axios.get("/sensors");
    },
    createNewSensor(body: any) {
      return axios.post("/sensors", body);
    },
    deleteSensor(sensor_id: string) {
      return axios.delete(`/sensors/${sensor_id}`);
    },
    getContactUsMessages() {
      return axios.get("/contact_us");
    },
  },
  contactUs(body: any) {
    return axios.post("/contact_us", body);
  },
};
