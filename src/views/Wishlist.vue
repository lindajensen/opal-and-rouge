<script>
export default {
  data() {
    return {
      productCart: JSON.parse(localStorage.getItem("cart")) || [],
      // addedMessage: false,
      productId: "",
      productAddedMessage: {},
      savedWishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    };
  },
  methods: {
    shopBestsellers() {
      this.$router.push({ name: "Home" });
    },
    getRatingStars(rating) {
      const fullStars = Math.floor(rating);
      const emptyStars = 5 - Math.floor(rating);
      return (
        Array(fullStars).fill("★").join("") +
        Array(emptyStars).fill("☆").join("")
      );
    },
    removeFromWishlist(id) {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
      const filteredWishlist = savedWishlist.filter((item) => item.id !== id);

      localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      this.savedWishlist = filteredWishlist;
    },
    addToCart(product) {
      const existingProduct = this.productCart.find(
        (item) => item.id === product.id
      );

      const productId = product.id;

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const productToAdd = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        };
        this.productCart.push(productToAdd);
      }

      this.productAddedMessage[productId] = true;

      setTimeout(() => {
        this.productAddedMessage[productId] = false;
      }, 2000);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(this.productCart));
      localStorage.setItem("total", JSON.stringify(this.total));
    },
  },
  computed: {
    total() {
      return this.productCart.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);
    },
  },
};
</script>

<template>
  <section class="wishlist-wrapper">
    <article class="wishlist-card" v-for="product in savedWishlist">
      <div class="product-content">
        <div class="product-header">
          <h2>{{ product.brand }}</h2>
          <i class="fa-solid fa-x" @click="removeFromWishlist(product.id)"></i>
        </div>
        <p class="product-title">{{ product.title }}</p>
        <p>{{ getRatingStars(product.rating) }}</p>
        <p>${{ product.price }}</p>
      </div>
      <button class="add-to-cart-btn" @click="addToCart(product)">
        Add to Bag
      </button>
      <p class="added-message" v-if="productAddedMessage[product.id]">
        <i class="fas fa-check-circle"></i>Product added to bag
      </p>
    </article>
  </section>

  <div class="empty-wishlist" v-if="savedWishlist.length < 1">
    <p>A wishlist without wishes?</p>
    <p>Add your must-haves by clicking the heart icon as you shop.</p>
    <button class="bestsellers-btn" @click="shopBestsellers">Shop</button>
  </div>
</template>

<style scoped>
.wishlist-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  max-width: 75rem;
  margin: auto;
  margin-bottom: 2rem;
}

.wishlist-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wishlist-card h2 {
  text-transform: uppercase;
}

.add-to-cart-btn {
  background-color: #000;
  border: none;
  color: #fff;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 6px;
  margin-top: 1rem;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

button:active {
  background-color: #222;
}

.product-content {
  display: flex;
  flex-direction: column;
}

.product-header h2 {
  font-size: 1.2rem;
  margin-right: 10px;
}

.product-title {
  font-size: 1.1rem;
}

.product-header i {
  cursor: pointer;
}

.product-content p {
  margin: 0.5rem 0;
}

.added-message {
  color: #6e2233;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 0.6rem;
}

.added-message p {
  font-size: 0.5rem;
}

.added-message i {
  color: #6e2233;
}

.empty-wishlist {
  padding-inline: 1rem;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 8rem;
}
.empty-wishlist p:first-of-type {
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

@media (max-width: 480px) {
  .wishlist-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wishlist-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .wishlist-card {
    padding: 1rem;
  }
}
</style>
