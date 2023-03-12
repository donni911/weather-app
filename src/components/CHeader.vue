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
    <ul class="c-header__list" :class="{ active: openedSideBar }">
      <menu-link
        v-for="item in menuItems"
        :key="item.id"
        :item="item"
        @clickEvent="closeSidebar"
      />
    </ul>
    <burger-button @clickEvent="openSideBar" :isOpen="openedSideBar" />
  </header>
  <div
    @click="closeSidebar"
    class="c-backdrop"
    :class="{ active: openedSideBar }"
  ></div>
</template>

<script>
import MenuLink from "./UI/MenuLink.vue";
import BurgerButton from "./UI/BurgerButton.vue";

export default {
  components: {
    MenuLink,
    BurgerButton,
  },

  data() {
    return {
      openedSideBar: false,
    };
  },

  methods: {
    closeSidebar() {
      this.$data.openedSideBar = false;
      document.body.style.overflow = "";
    },

    openSideBar() {
      this.$data.openedSideBar = true;
      document.body.style.overflow = "hidden";
    },
  },

  props: ["menuItems"],
};
</script>
