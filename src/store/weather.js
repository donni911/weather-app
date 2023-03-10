import { defineStore } from "pinia";
import axiosWeatherClient from "@/modules/axiosWeatherClient.js";

export const weatherStore = defineStore("weatherStore", {
  state: () => ({
    cities: [],
    errorMessage: null,
    searchCityWeather: null,
    rowLayout: null,
    menuItems: [
      {
        linkName: "main",
        name: "Main",
        icon: "fa-solid fa-table-list",
      },
      { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
    ],
  }),

  getters: {},

  actions: {
    updateErrorMessage(message) {
      this.errorMessage = message;
    },

    async getWeatherAction(location) {
      try {
        await axiosWeatherClient
          .get(
            `data/2.5/weather?q=${location.name}` +
              `&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          )
          .then((response) => {
            this.searchCityWeather = response.data;
          });
      } catch (error) {
        this.updateErrorMessage(error.response.data.message);
      }
    },

    async getCitiesAction(input) {
      await axiosWeatherClient
        .get(
          `geo/1.0/direct?q=${input}&limit=5&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        )
        .then((response) => {
          this.cities = response.data;
        });
    },
  },
});
