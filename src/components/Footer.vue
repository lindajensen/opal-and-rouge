<template>
  <div class="footer">
    <div class="footer-top">
      <div class="social-icons">
        <a href="https://www.facebook.com" target="_blank">
          <img
            src="/src/assets/img/facebook-icon.png"
            alt="Facebook Icon"
            width="30"
          />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <img
            src="/src/assets/img/instagram-icon.png"
            alt="Instagram Icon"
            width="30"
          />
        </a>
        <a href="https://www.tiktok.com" target="_blank">
          <img
            src="/src/assets/img/tiktok-icon.png"
            alt="Tiktok Icon"
            width="30"
          />
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <small>&copy; Opal & Rouge, 2025</small>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #340c0c;
  height: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.social-icons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

small {
  color: #fff;
}
</style>
