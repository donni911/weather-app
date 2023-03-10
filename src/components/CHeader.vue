<template>
  <header class="c-header">
    <div class="c-header__wrapper">
      <div class="c-logo">
        <div class="c-svg">
          <font-awesome-icon icon="fa-solid fa-cloud-sun-rain" />
        </div>
        <router-link class="c-header__link" :to="{ name: 'main' }">
          Weather App
        </router-link>
      </div>
    </div>
    <ul class="c-header__list">
      <menu-link v-for="item in menuItems" :key="item.id" :item="item" />
    </ul>
  </header>
</template>

<script>
import MenuLink from "./UI/MenuLink.vue";

export default {
  components: {
    MenuLink,
  },

  props: ["menuItems"],
};
</script>
