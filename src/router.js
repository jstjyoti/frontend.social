import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/city/:cityName/:countryCode",
      name: "CityDetails",
      component: () => import("./pages/CityDetails.vue")
    },
    {
      path: "/city",
      name: "city",
      component: () => import("./pages/Cities.vue")
    },
    {
      path: "/jobs",
      name: "jobs",
      component: () => import("./pages/Jobs.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./pages/Events.vue")
    },
    {
      path: "/learn",
      name: "learn",
      component: () => import("./pages/Learn.vue")
    },
    {
      path: "/skills/:skill",
      name: "skills",
      component: () => import("./pages/Skills.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./pages/Signin.vue")
    },
    {
      path: "/signin/callback",
      name: "signincallback",
      component: () => import("./pages/HandleFBResponse.vue")
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./pages/PrivacyPolicy.vue")
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("./pages/TermsOfUse.vue")
    },
    {
      path: "/me",
      name: "me",
      component: () => import("./pages/Profile.vue")
    },
    {
      path: "/user/:username",
      name: "profile",
      component: () => import("./pages/Profile.vue")
    }
  ]
});
