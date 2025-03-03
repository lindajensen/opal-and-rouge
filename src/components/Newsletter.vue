<script>
export default {
  data() {
    return {
      email: "",
      isDisabled: true,
      isSubscribed: false,
      subscribers: [],
    };
  },
  methods: {
    subscribeNewsletter() {
      this.subscribers.push(this.email);
      this.isSubscribed = true;

      setTimeout(() => {
        this.isSubscribed = false;
      }, 3000);

      this.email = "";

      localStorage.setItem("subscribers", JSON.stringify(this.subscribers));
    },
  },
  watch: {
    email() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = this.email.trim();

      if (emailRegex.test(email)) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
  },
};
</script>

<template>
  <article class="newsletter">
    <div class="newsletter-content">
      <p>Sign up to receive emails</p>
      <p>
        Sign up for our newsletter and be the first to know about new products
        and exclusive deals!
      </p>
      <input
        class="input-field"
        type="email"
        placeholder="Enter your email"
        v-model="email"
      />
      <input
        @click="subscribeNewsletter"
        class="btn signup-btn"
        :disabled="isDisabled"
        type="button"
        value="Sign up"
      />
      <p class="subscription-message" v-if="isSubscribed">
        You're officially a beauty insider! Keep an eye on your inbox for
        exciting updates.
      </p>
    </div>
  </article>
</template>

<style scoped>
article {
  background-color: #f5f3f3;
  padding-top: 2rem;
}

.newsletter {
  background-color: #fff5f3;
  padding: 1.2rem;
}

.newsletter-content {
  max-width: 43.75rem;
  margin: auto;
  padding-block: 1.2rem;
}

.newsletter p:first-of-type {
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.newsletter p:last-of-type {
  margin-bottom: 0.5rem;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #333;
  margin-right: 0.5rem;
  width: 70%;
}

.btn {
  background-color: #f5f3f3;
  padding: 0.5rem;
  border: 1px solid #333;
  width: 25%;
  margin-block: 0.8rem;
}

.subscription-message,
.invalid-email {
  color: #6e2233;
  font-size: 0.9rem;
}
</style>
