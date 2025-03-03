<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    loginStatus(newStatus) {
      this.isLoggedIn = newStatus;
    },
  },
};
</script>

<template>
  <header>
    <Navbar :isLoggedIn="isLoggedIn" @updateLogin="loginStatus" />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style></style>
