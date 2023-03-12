<template>
  <li class="c-main__item" :class="{ active: isActive }">
    <transition name="fade">
      <div class="c-main__action" v-show="cityWeather">
        <button
          class="c-main__action__save"
          :class="{ active: isActive }"
          @click="toggleSave"
        >
          <div class="c-svg">
            <font-awesome-icon icon="fa-solid fa-star" />
          </div>
        </button>
      </div>
    </transition>
    <Weather-Card
      v-if="cityWeather.temperatureToday"
      :weather="cityWeather.temperatureToday"
    />
    <Weather-Graph
      v-if="cityWeather.temperatureByHours"
      :weather="cityWeather.temperatureByHours"
    />
  </li>
</template>

<script>
import WeatherCard from "./WeatherCard.vue";
import WeatherGraph from "./WeatherGraph.vue";

export default {
  components: {
    WeatherCard,
    WeatherGraph,
  },

  data() {
    return {
      isActive: false,
    };
  },

  props: ["cityWeather"],

  methods: {
    toggleSave() {
      this.$data.isActive = !this.$data.isActive;
    },
  },
};
</script>
