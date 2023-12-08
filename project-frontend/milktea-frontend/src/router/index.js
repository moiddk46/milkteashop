import { createWebHistory, createRouter } from "vue-router";
import home from "@/views/home.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/chitietsanpham/:idsp",
    name: "detailsanpham",
    component: () => import("@/views/detail.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/dangky",
    name: "dangky",
    component: () => import("@/views/dangky.vue"),
  },
  {
    path: "/giohang",
    name: "giohang",
    component: () => import("@/views/cart.vue"),
  },
  {
    path: "/dathang",
    name: "dathang",
    component: () => import("@/views/order.vue"),
  },
  {
    path: "/chinhsuathongtin",
    name: "chinhsuathongtin",
    component: () => import("@/views/editthongtin.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
