<template>
  <li class="c-header__item">
    <router-link
      class="c-header__link"
      @click="$emit('clickEvent')"
      :to="{ name: item.linkName }"
    >
      <div class="c-svg">
        <font-awesome-icon :icon="item.icon" />
      </div>
      {{ item.name }}</router-link
    >
    <counter :count="computedCount" v-if="computedCount" class="ml-auto z-10" />
  </li>
</template>

<script>
import Counter from "./Counter.vue";
import { mapState } from "pinia";
import { weatherStore } from "../../store/weather";

export default {
  props: ["item"],
  components: {
    Counter,
  },

  computed: {
    ...mapState(weatherStore, ["citiesWeatherCount", "citiesStarWeatherCount"]),

    computedCount() {
      switch (this.item.linkName) {
        case "main":
          return this.citiesWeatherCount;
        case "starred":
          return this.citiesStarWeatherCount;
      }
    },
  },
};
</script>

<style scoped></style>
