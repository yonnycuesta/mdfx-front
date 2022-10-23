import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import LoginComponent from "../components/LoginComponent.vue";
import UserComponent from "../components/UserComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
import RoleComponent from "../components/RoleComponent.vue";
import DoctorComponent from "../components/DoctorComponent.vue";
import ScheduleComponent from "../components/ScheduleComponent.vue";
import SpecialityComponent from "../components/SpecialityComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterComponent,
    },
    {
      path: "/users",
      name: "users",
      component: UserComponent,
    },
    {
      path: "/roles",
      name: "roles",
      component: RoleComponent,
    },
    {
      path: "/doctors",
      name: "doctors",
      component: DoctorComponent,
    },
    {
      path: "/schedules",
      name: "schedules",
      component: ScheduleComponent,
    },
    {
      path: "/specialties",
      name: "specialties",
      component: SpecialityComponent,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
