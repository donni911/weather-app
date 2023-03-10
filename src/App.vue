<template>
  <div class="container">
    <div class="c-weather">
      <c-header :menu-items="menuItems" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import CHeader from "./components/CHeader.vue";

import { mapState } from "pinia";
import { weatherStore } from "./store/weather.js";

export default {
  components: {
    CHeader,
  },

  computed: {
    ...mapState(weatherStore, ["menuItems"]),
  },
};
</script>
