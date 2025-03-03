<script>
import Benefits from "../components/Benefits.vue";
import Newsletter from "../components/Newsletter.vue";

export default {
  components: {
    Benefits,
    Newsletter,
  },
  data() {
    return {
      title: "",
      cart: [],
    };
  },
  created() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = JSON.parse(localStorage.getItem("total")) || "";

    this.cart = cart;
  },
  methods: {
    removeFromCart(productId) {
      const product = this.cart.find((item) => item.id === productId);

      if (product && product.quantity > 1) {
        product.quantity--;
      } else {
        this.cart = this.cart.filter((item) => item.id !== productId);
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(productId) {
      const product = this.cart.find((item) => item.id === productId);

      if (product && product.quantity > 0) {
        product.quantity++;
      } else {
        this.cart = this.cart.filter((item) => item.id !== productId);
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeProduct(productId) {
      alert("Are you sure you want to remove this item?");
      this.cart = this.cart.filter((item) => item.id !== productId);

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    shopBestsellers() {
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    total() {
      return this.cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
    },
  },
  watch: {
    total(newTotal) {
      localStorage.setItem("total", JSON.stringify(newTotal));
    },
  },
};
</script>

<template>
  <section class="cart-view">
    <div class="product-card" v-for="product in cart">
      <div class="cart-item">
        <p>{{ product.title }}</p>
        <p>
          <i
            @click="removeProduct(product.id)"
            class="fa-solid fa-trash-can"
          ></i>
        </p>
      </div>
      <div>
        <div class="quantity">
          <input
            @click="removeFromCart(product.id)"
            class="quantity-btn"
            type="button"
            value="-"
          />
          <p>{{ product.quantity }}</p>
          <input
            @click="addToCart(product.id)"
            class="quantity-btn"
            type="button"
            value="+"
          />
          <p>${{ (product.price * product.quantity).toFixed(2) }}</p>
        </div>
        <hr />
      </div>
    </div>
    <div class="total" v-if="cart.length > 0">
      <p>Your bag:</p>
      <p>${{ total.toFixed(2) }}</p>
    </div>
    <div class="empty-cart" v-else>
      <p>Looks like your bag is empty</p>
      <p>Once you have added some items to your bag they will appear here.</p>
      <button class="bestsellers-btn" @click="shopBestsellers">Shop</button>
    </div>
  </section>

  <Benefits />
  <Newsletter />
</template>

<style scoped>
.cart-view {
  padding: 1.2rem;
  max-width: 43.75rem;
  margin: auto;
  margin-top: 1rem;
}

.product-card {
  margin-block: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
}

.quantity p:last-of-type {
  margin-left: auto;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: 0.625rem;
  margin-bottom: 1rem;
}

hr {
  border: 1px solid #d1d1d1;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: none;
  background-color: #000;
  color: white;
  font-size: 1rem;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
}

.total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 1rem;
}

.empty-cart {
  text-align: center;
  margin-top: 2.8rem;
}
.empty-cart p:first-of-type {
  text-transform: uppercase;
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}

.bestsellers-btn {
  margin-top: 1rem;
  text-transform: uppercase;
  border: 1px solid #333;
  padding: 0.6rem 2rem;
  background-color: #f4f3f3;
  margin-block: 2rem;
}

.bestsellers-btn:hover {
  background-color: #d8c9c9;
}
</style>
