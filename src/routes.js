import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import ProductDetails from "./views/ProductDetails.vue";
import Cart from "./views/Cart.vue";
import Wishlist from "./views/Wishlist.vue";

const routes = [
  {
    component: Home,
    name: "Home",
    path: "/",
  },
  {
    component: ProductDetails,
    name: "ProductDetails",
    path: "/:id",
  },
  {
    component: Cart,
    name: "Cart",
    path: "/cart",
  },
  {
    component: Wishlist,
    name: "Wishlist",
    path: "/wishlist",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
