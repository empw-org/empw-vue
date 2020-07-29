import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import GetStarted from "@/views/GetStarted.vue";
import Donation from "@/views/Donation.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import ResetPassword from "@/views/user/ResetPassword.vue";
import UserSignIn from "@/views/user/SignIn.vue";
import UserSignUp from "@/views/user/SignUp.vue";
import CompanySignIn from "@/views/company/SignIn.vue";
import CompanySignUp from "@/views/company/SignUp.vue";
import CompanyProfile from "@/views/company/Profile.vue";
import CompanyWaterOrders from "@/views/company/profile-views/WaterOrders.vue";
import CompanyStatistics from "@/views/company/profile-views/Statistics.vue";
import CompanyMap from "@/views/company/profile-views/Map.vue";
import CompanyEditProfile from "@/views/company/profile-views/EditProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/donation",
    name: "donation",
    component: Donation,
  },
  {
    path: "/get-started",
    name: "get-started",
    component: GetStarted,
  },
  {
    path: "/user/signin",
    name: "user-signin",
    component: UserSignIn,
  },
  {
    path: "/user/signup",
    name: "user-signup",
    component: UserSignUp,
  },
  {
    path: "/user/reset-password",
    name: "user-reset-password",
    component: ResetPassword,
  },
  {
    path: "/company/signin",
    name: "company-signin",
    component: CompanySignIn,
  },
  {
    path: "/company/signup",
    name: "company-signup",
    component: CompanySignUp,
  },
  {
    path: "/company/profile",
    name: "company-profile",
    component: CompanyProfile,
    children: [
      {
        path: "water-orders",
        name: "company-water-orders",
        component: CompanyWaterOrders,
      },
      {
        path: "statistics",
        name: "company-statistics",
        component: CompanyStatistics,
      },
      {
        path: "map",
        name: "company-map",
        component: CompanyMap,
      },
      {
        path: "edit-profile",
        name: "company-edit-profile",
        component: CompanyEditProfile,
      },
    ],
  },
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
