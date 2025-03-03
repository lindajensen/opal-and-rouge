<script>
export default {
  data() {
    return {
      cart: [],
      username: "Linda",
    };
  },
  created() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    this.cart = cartData;
  },
  methods: {
    //Custom Event
    toggleLogin() {
      this.$emit("updateLogin", !this.isLoggedIn);
    },
  },
  props: {
    isLoggedIn: Boolean,
  },
};
</script>

<template>
  <nav>
    <ul class="navbar">
      <div class="nav-left">
        <li class="nav-logo">
          <router-link :to="{ name: 'Home' }">Opal & Rouge</router-link>
        </li>
      </div>
      <div class="nav-center">
        <li>
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Wishlist' }">Wishlist </router-link>
        </li>
        <li class="notification">
          <router-link :to="{ name: 'Cart' }">
            <i class="fa-solid fa-bag-shopping fa-xl"></i>
          </router-link>
        </li>
      </div>
      <div class="nav-right">
        <li class="login-state">
          <p class="welcome-message" v-if="isLoggedIn">
            Welcome {{ username }}!
          </p>
          <button @click="toggleLogin" class="sign-in-btn" v-else>
            Sign In
          </button>
        </li>
      </div>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  max-width: 75rem;
  margin: auto;
  margin-top: 2rem;
  padding-inline: 1.2rem;
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;
  align-items: center;
}

.navbar li {
  padding: 0 1rem;
  margin-bottom: 1.5rem;
}

.navbar .nav-left {
  display: none;
}

.navbar .nav-center {
  display: flex;
}

.navbar a {
  text-decoration: none;
}

.nav-logo a {
  font-family: var(--font-headings);
  font-size: 1.5rem;
}

.nav-center .router-link-exact-active {
  padding: 0.625rem;
  color: #fff;
  background-color: #340c0c;
  border-radius: 4px;
}

.welcome-message {
  background-color: #fde8e0;
  border-radius: 4px;
  padding: 0.625rem;
  vertical-align: middle;
}

.sign-in-btn {
  border: none;
  padding: 0.6rem 2rem;
  background-color: #fde8e0;
  border-radius: 6px;
  text-transform: uppercase;
  cursor: pointer;
}

.sign-in-btn:hover {
  background-color: #fff5f3;
}

@media (min-width: 40rem) {
  nav {
    padding: 0;
  }
  .navbar {
    justify-content: space-between;
  }
  .navbar .nav-left {
    display: inline;
  }
}
</style>
