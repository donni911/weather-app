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

    loadingStatus: false,

    menuItems: [
      {
        linkName: "main",
        name: "Main",
        icon: "fa-solid fa-table-list",
      },
      { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
    ],
  }),

  getters: {
    starWeather(state) {
      return state.searchCitiesWeather.filter((city) => city.starred);
    },

    loading(state) {
      return state.loadingStatus;
    },

    citiesWeatherCount(state) {
      return state.searchCitiesWeather.length;
    },
  },

  actions: {
    updateErrorMessage(message) {
      this.errorMessage = message;
    },

    async getWeatherAction(location) {
      try {
        let weatherInfo = {};
        this.loadingStatus = true;

        await axiosWeatherClient
          .get(
            `weather?q=${location}` +
              `&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          )
          .then((response) => {
            weatherInfo.temperatureToday = response.data;
          });

        await axiosWeatherClient
          .get(
            `forecast?q=${location}&units=metric&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`
          )
          .then((response) => {
            weatherInfo.temperatureByHours = response.data;
          });

        this.searchCitiesWeather.push(weatherInfo);
        localStorage.weatherInCities = JSON.stringify(this.searchCitiesWeather);
      } catch (error) {
        this.updateErrorMessage(error.response.data.message);
        this.loadingStatus = false;
      } finally {
        this.loadingStatus = false;
      }
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

    deleteWeatherAction(value) {
      const valueToDelete = this.searchCitiesWeather
        .map((el) => el)
        .indexOf(value);
      this.searchCitiesWeather.splice(valueToDelete, 1);
      localStorage.weatherInCities = JSON.stringify(this.searchCitiesWeather);
    },

    saveWeatherAction(value,isStar) {
      let starValueFinder = this.searchCitiesWeather.find((el) => el === value);
      starValueFinder.starred = isStar;
      console.log(starValueFinder);
      localStorage.weatherInCities = JSON.stringify(this.searchCitiesWeather);

    },
  },
});
