<template>
  <nav class="navbar">
    <div class="logo">
      <router-link :to="{ name: 'home' }">
        <img id="logo-image" src="@/assets/logo/logo.png" alt="Logo" />
      </router-link>
    </div>

    <div class="menus">
      <ul class="menu-items">
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link :to="{ name: 'donation' }">Donate</router-link></li>
        <li>
          <router-link :to="{ name: 'get-started' }">Get Started</router-link>
        </li>
        <li class="language">
          <a href="#">
            <i class="icon globe"></i>
            <div id="ar-language">ع</div>
          </a>
        </li>
      </ul>

      <div class="hamburger-icon">
        <i class="bars icon"></i>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Navigation extends Vue {}
</script>

<style scoped lang="less">
@light-blue: #00bdce;
@dark-blue: #0071d2;
@header-height: 80px;

/*Header*/

.navbar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  width: 100%;
  background: linear-gradient(to right, @light-blue 6%, @dark-blue);
  overflow: hidden;
  height: @header-height;
}

.logo {
  padding: 3px 0 3px 15px;
  display: flex;
  align-items: center;
}

.logo img {
  width: 20px;
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
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  justify-items: center;
}

.menu-items li {
  text-decoration: none;
  color: white;
  font-size: 15pt;
}

.menu-items li:hover {
  color: darken(white, 10%);
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
