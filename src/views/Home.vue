<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      wishlist: [],
      isLiked: {},
      inWishlist: false,
    };
  },
  methods: {
    getRatingStars(rating) {
      const fullStars = Math.floor(rating);
      const emptyStars = 5 - Math.floor(rating);
      return (
        Array(fullStars).fill("★").join("") +
        Array(emptyStars).fill("☆").join("")
      );
    },
    addToWishlist(id) {
      if (!this.isLiked[id]) {
        this.isLiked[id] = true;
      }

      const matchingProduct = this.wishlist.find((item) => item.id === id);

      if (!matchingProduct) {
        const productToAdd = this.products.find((product) => product.id === id);

        const wishlistItem = {
          id: productToAdd.id,
          brand: productToAdd.brand,
          title: productToAdd.title,
          rating: productToAdd.rating,
          price: productToAdd.price,
          isLiked: this.isLiked,
        };

        this.wishlist.push(wishlistItem);

        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      }

      setTimeout(() => {
        this.isLiked[id] = false;
      }, 300);
    },
  },
  created() {
    axios
      .get("https://dummyjson.com/products")
      .then(
        (response) => (this.products = response.data.products.slice(0, 10))
      );

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    this.wishlist = savedWishlist;
  },
};
</script>

<template>
  <h1>Opal & Rouge</h1>
  <section class="product-wrapper">
    <article class="product-card" v-for="product in products" :key="product.id">
      <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }"
        ><img :src="product.thumbnail" :alt="product.title" />
      </router-link>
      <div class="product-header">
        <router-link
          :to="{ name: 'ProductDetails', params: { id: product.id } }"
          ><p v-if="inWishlist">
            This product has already been added to your wishlist.
          </p>
          <h2>{{ product.title }}</h2>
        </router-link>
        <i
          :class="['fa-solid fa-heart fa-lg', { liked: isLiked[product.id] }]"
          @click="addToWishlist(product.id)"
        ></i>
      </div>
      <p>{{ getRatingStars(product.rating) }}</p>
      <!-- <p>Rating: {{ product.rating.toFixed(1) }}</p> -->
      <p>${{ product.price }}</p>
    </article>
  </section>
</template>

<style scoped>
h1 {
  font-size: clamp(2rem, 6vw, 4rem);
  margin-block: 2rem;
  text-align: center;
}

.product-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 1rem;
  max-width: 75rem;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  padding-inline: 1.2rem;
}

.product-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

img {
  background-color: #f6f6f6;
  margin-bottom: 0.6rem;
  width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.product-card h2 {
  font-family: "Nunito", serif;
  font-size: 1.1rem;
  font-weight: 500;
}

.product-card h2,
.product-card p {
  margin-bottom: 0.4rem;
}

i {
  color: #333;
  margin-top: 0.7rem;
}

.liked {
  color: #fde8e0;
}
</style>
