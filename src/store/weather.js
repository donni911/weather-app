import { defineStore } from "pinia";
import axios from "axios";

import {
  axiosWeatherClient,
  axiosCitiesClient,
} from "@/modules/axiosClient.js";

export const weatherStore = defineStore("weatherStore", {
  state: () => ({
    cities: [],
    searchCitiesWeather: [],

    currentLocation: null,

    errorMessage: null,

    menuItems: [
      {
        linkName: "main",
        name: "Main",
        icon: "fa-solid fa-table-list",
      },
      { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
    ],
  }),

  actions: {
    updateErrorMessage(message) {
      this.errorMessage = message;
    },

    async getWeatherAction(location) {
      let weatherInfo = {};

      try {
        await axiosWeatherClient
          .get(
            `weather?q=${location}` +
              `&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          )
          .then((response) => {
            weatherInfo.temperatureToday = response.data;
          });
      } catch (error) {
        this.updateErrorMessage(error.response.data.message);
      }

      try {
        await axiosWeatherClient
          .get(
            `forecast?q=${location}&units=metric&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`
          )
          .then((response) => {
            weatherInfo.temperatureByHours = response.data;
          });
      } catch (error) {
        this.updateErrorMessage(error.response.data.message);
      }

      this.searchCitiesWeather.push(weatherInfo);

      localStorage.weatherInCities = JSON.stringify(this.searchCitiesWeather);
    },

    async getCitiesAction(input) {
      await axiosCitiesClient
        .get(
          `direct?q=${input}&limit=5&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        )
        .then((response) => {
          this.cities = response.data;
        });
    },

    async getCurrentLocationAction() {
      await axios.get("https://ipapi.co/json/").then((response) => {
        this.currentLocation = response.data;
      });
    },
  },
});
