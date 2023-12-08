import { createWebHistory, createRouter } from "vue-router";
import home from "@/views/homadmin.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/chitietkhachhang/:idkh",
    name: "detailconsummer",
    component: () => import("@/views/detailkhachhang.vue"),
    props: true,
  },
  {
    path: "/addkhachhang",
    name: "addconsummer",
    component: () => import("../views/addkhachhang.vue"),
  },
  {
    path: "/sanpham",
    name: "sanpham",
    component: () => import("../views/sanpham.vue"),
  },
  {
    path: "/chitietsanpham/:idsp",
    name: "detailsanpham",
    component: () => import("@/views/detailsanpham.vue"),
    props: true,
  },
  {
    path: "/addsanpham",
    name: "addsanpham",
    component: () => import("../views/addsanpham.vue"),
  },
  {
    path: "/donhang",
    name: "donhang",
    component: () => import("../views/donhang.vue"),
  },
  {
    path: "/chitietdonhang/:id",
    name: "chitietdonhang",
    component: () => import("../views/detaildonhang.vue"),
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
export default router;
