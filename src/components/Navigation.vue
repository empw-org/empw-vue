<template>
  <header class="landing-page-header">
    <nav class="landing-page-nav">
      <div class="logo">
        <img id="logo-image" src="@/assets/logo/logo.png" alt="Logo" />
      </div>

      <div class="menus">
        <ul class="menu-items">
          <li><router-link to="/">Home</router-link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Donate</a></li>
          <li>
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li class="language">
            <a href="#">
              <img src="@/assets/icons/globe.svg" alt="Language" />
              <div id="ar-language">ع</div>
            </a>
          </li>
        </ul>

        <div class="hamburger-icon">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
/*Header*/
.landing-page-header {
  position: relative;
  width: 100%;
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
  overflow: hidden;
}

.landing-page-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.logo {
  padding: 3px 0 0 15px;
  display: flex;
  align-items: center;
}

.logo img {
  width: 12%;
  min-width: 60px;
  cursor: pointer;
}

/*Header-Nav*/
.menus {
  display: flex;
  align-items: center;
}

.menu-items {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  justify-items: center;
}

.menu-items li {
  text-decoration: none;
  color: white;
  opacity: 0.8;
}

.menu-items li:hover {
  color: white;
  opacity: 1;
}

.menu-items li a {
  text-decoration: none;
  color: inherit;
}

.language a {
  display: flex;
}

.language img {
  margin-right: 5px;
  width: 20px;
}

.hamburger-icon {
  display: none;
  opacity: 0.8;
}

.hamburger-icon:hover {
  opacity: 1;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  /*Header */
  .menus {
    justify-self: end;
  }

  .menu-items {
    display: none;
  }

  .hamburger-icon {
    display: block;
    color: white;
    font-size: 30px;
    margin-right: 20px;
  }
}
</style>
