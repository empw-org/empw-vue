import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ResetPassword from "../views/ResetPassword.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    component: ResetPassword,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
