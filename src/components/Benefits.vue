<template>
  <section>
    <article>
      <p class="benefits-heading">Why You'll Love Shopping Here</p>
      <div class="benefits">
        <!-- Free Delivery Card -->
        <div class="benefits-card">
          <img src="/src/assets/img/free-delivery.png" alt="" height="76" />
          <p class="benefits-card-heading">Free Delivery</p>
          <p>Free standard shipping on orders over $100.</p>
        </div>
        <!-- Free Returns Card-->
        <div class="benefits-card">
          <img
            src="/src/assets/img/free-returns.png"
            alt="Free returns icon"
            height="70"
          />
          <p class="benefits-card-heading">Free Returns</p>
          <p>Return items within 30 days for a full refund</p>
        </div>
        <!-- Loyalty Program Card -->
        <div class="benefits-card">
          <img src="/src/assets/img/loyalty-program.png" alt="" height="76" />
          <p class="benefits-card-heading">Loyalty Program</p>
          <p>Earn points with every purchase and enjoy exclusive discounts!</p>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
article {
  background-color: #f5f3f3;
  padding-top: 2rem;
}

.benefits {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 43.75rem;
  margin: auto;
  padding-block: 2rem;
}

.benefits-heading {
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.benefits-card {
  text-align: center;
  margin-bottom: 1rem;
}

.benefits-card img {
  display: inline;
  margin-bottom: 0.5rem;
}

.benefits-card-heading {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.benefits-card p:last-of-type {
  max-width: 40ch;
}

@media (min-width: 43.44rem) {
  .benefits {
    flex-direction: row;
    gap: 1.5rem;
  }
}
</style>
