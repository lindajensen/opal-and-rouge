<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
      reviews: [],
      productCart: [],
      addedMessage: false,
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.fetchProduct(productId);

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.productCart = JSON.parse(savedCart);
    } else {
      this.productCart = [];
    }
  },
  computed: {
    total() {
      return this.productCart.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);
    },
  },
  methods: {
    fetchProduct(id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => (this.product = response.data));
    },
    getRatingStars(rating) {
      const fullStars = Math.floor(rating);
      const emptyStars = 5 - Math.floor(rating);
      return (
        Array(fullStars).fill("★").join("") +
        Array(emptyStars).fill("☆").join("")
      );
    },
    addToCart(productId) {
      const existingProduct = this.productCart.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const productToAdd = {
          id: this.product.id,
          title: this.product.title,
          price: this.product.price,
          quantity: 1,
        };
        this.productCart.push(productToAdd);
      }

      localStorage.setItem("cart", JSON.stringify(this.productCart));
      localStorage.setItem("total", JSON.stringify(this.total));

      // Added to cart message
      this.addedMessage = true;

      setTimeout(() => {
        this.addedMessage = false;
      }, 2000);
    },
  },
};
</script>

<template>
  <section class="product-info" v-if="product">
    <img :src="product.images[0]" :alt="product.title" />
    <div class="product-wrapper">
      <div class="product-details">
        <h2>{{ product.brand }}</h2>
        <p>{{ product.title }}</p>
        <!-- <p>Rating: {{ product.rating.toFixed(1) }}</p> -->
        <p>{{ getRatingStars(product.rating) }}</p>
        <p>${{ product.price }}</p>
        <button @click="addToCart(product.id)">Add to Bag</button>
        <p class="added-message" v-if="addedMessage">
          <i class="fas fa-check-circle"></i>Product added to bag
        </p>
      </div>
      <div class="product-description">
        <h3>About the Product</h3>
        <p>
          {{ product.description }}
        </p>
      </div>
      <div>
        <h3>Reviews</h3>
        <div class="review-wrapper">
          <article class="reviews" v-for="review in product.reviews">
            <p>
              {{
                review.date ? review.date.split("T")[0] : "No date available"
              }}
            </p>
            <p>{{ review.comment }}</p>
            <p>{{ review.reviewerName }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
  <p v-else>Loading...</p>
</template>

<style scoped>
.product-info {
  padding: 1.2rem;
  margin: auto;
  margin-top: 1.2rem;
  max-width: 56.25rem;
}

img {
  margin-bottom: 0.6rem;
}

h2 {
  text-transform: uppercase;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
}

h3 {
  font-size: clamp(1.25rem, 4vw, 1.6rem);
}

.product-details p:first-of-type {
  font-size: 1.1rem;
}
.product-details p {
  margin-bottom: 0.5rem;
}

.product-description {
  margin-block: 0.8rem;
}

button {
  background-color: #000;
  border: none;
  border-radius: 6px;
  color: #fff;
  margin-block: 0.8rem;
  padding: 0.8rem 1.2rem;
  text-transform: uppercase;
  width: 100%;
}

button:hover {
  background-color: #333;
}

button:active {
  background-color: #222;
}

.added-message {
  color: #6e2233;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.added-message i {
  color: #6e2233;
}

.product-description {
  margin-bottom: 1rem;
}

.reviews {
  background-color: #f5f3f3;
  margin-block: 1rem;
  padding: 1.25rem;
  border-radius: 6px;
}

.reviews p {
  margin-bottom: 0.4rem;
}
.reviews p:first-of-type {
  text-align: right;
}
.reviews p:nth-child(2) {
  font-weight: 600;
}

.reviews p:last-of-type {
  font-style: italic;
}

@media (min-width: 37.5rem) {
  .product-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
}
</style>
