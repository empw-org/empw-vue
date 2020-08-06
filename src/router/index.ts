import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import GetStarted from "@/views/GetStarted.vue";
import Donation from "@/views/Donation.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import ResetPassword from "@/views/user/ResetPassword.vue";
import UserSignIn from "@/views/user/SignIn.vue";
import UserSignUp from "@/views/user/SignUp.vue";
import UserProfile from "@/views/user/Profile.vue";
import UserWaterOrders from "@/views/user/profile-views/WaterOrders.vue";
import UserNewWaterOrder from "@/views/user/profile-views/NewWaterOrder.vue";
import UserEditProfile from "@/views/user/profile-views/EditProfile.vue";
import UserConsumptionReports from "@/views/user/profile-views/ConsumptionReports.vue";
import CompanySignIn from "@/views/company/SignIn.vue";
import CompanySignUp from "@/views/company/SignUp.vue";
import CompanyProfile from "@/views/company/Profile.vue";
import CompanyWaterOrders from "@/views/company/profile-views/WaterOrders.vue";
import CompanyStatistics from "@/views/company/profile-views/Statistics.vue";
import CompanyMap from "@/views/company/profile-views/Map.vue";
import CompanyEditProfile from "@/views/company/profile-views/EditProfile.vue";
import AdminDashboard from "@/views/admin/Dashboard.vue";
import AdminLogin from "@/views/admin/Login.vue";
import AdminCompanies from "@/views/admin/Companies.vue";
import AdminTransporters from "@/views/admin/Transporters.vue";
import AdminSensors from "@/views/admin/Sensors.vue";
import AdminContactUs from "@/views/admin/ContactUs.vue";

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
    meta: { notForAuthed: true },
  },
  {
    path: "/user/signin",
    name: "user-signin",
    component: UserSignIn,
    meta: { notForAuthed: true },
  },
  {
    path: "/user/signup",
    name: "user-signup",
    component: UserSignUp,
    meta: { notForAuthed: true },
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
    meta: { notForAuthed: true },
  },
  {
    path: "/company/signup",
    name: "company-signup",
    component: CompanySignUp,
    meta: { notForAuthed: true },
  },
  {
    path: "/company/profile",
    name: "company-profile",
    component: CompanyProfile,
    meta: { onlyFor: "COMPANY" },
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
  {
    path: "/user/profile",
    name: "user-profile",
    component: UserProfile,
    meta: { onlyFor: "USER" },
    children: [
      {
        path: "new-water-order",
        name: "user-new-water-order",
        component: UserNewWaterOrder,
      },
      {
        path: "water-orders",
        name: "user-water-orders",
        component: UserWaterOrders,
      },
      {
        path: "consumption-reports",
        name: "user-consumption-reports",
        component: UserConsumptionReports,
      },
      {
        path: "edit-profile",
        name: "user-edit-profile",
        component: UserEditProfile,
      },
    ],
  },
  {
    path: "/admin/signin",
    name: "admin-signin",
    component: AdminLogin,
    meta: { notForAuthed: true },
  },
  {
    path: "/admin/profile",
    name: "admin-profile",
    component: AdminDashboard,
    meta: { onlyFor: "ADMIN" },
    children: [
      {
        path: "companies",
        name: "admin-companies",
        component: AdminCompanies,
      },
      {
        path: "transporters",
        name: "admin-transporters",
        component: AdminTransporters,
      },
      {
        path: "sensors",
        name: "admin-sensors",
        component: AdminSensors,
      },
      {
        path: "contact-us",
        name: "admin-contact-us",
        component: AdminContactUs,
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

router.beforeEach((to, _, next) => {
  const userType = localStorage.getItem("userType");
  if (!userType && to.matched.some((record) => record.meta.onlyFor))
    next({ name: "get-started" });
  if (userType) {
    if (
      to.matched.some((record) => record.meta.notForAuthed) ||
      to.matched.some(
        (record) => record.meta.onlyFor && record.meta.onlyFor !== userType
      )
    )
      next(`${userType.toLowerCase()}/profile`);
  }
  next();
});

export default router;
